/**
  Compiles human-readable translation source files and converts them to the
  JSON format expected by vue-i18n.
*/

const fs = require('fs');
const path = require('path');

const SUPPORTED_LOCALES = ['en', 'sl'];

const sourceDir = path.resolve(__dirname, './translations');
const outputDir = path.resolve(__dirname, './locales');

// Create output directory if needed
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Used to identify "leaf" objects like e.g. `h1: {en: "Home", sl: "Domov"}`.
// Checks that the object contains exactly the locale keys and no other keys.
function isLeaf(obj) {
  return Object.keys(obj).length === SUPPORTED_LOCALES.length &&
    SUPPORTED_LOCALES.every(locale => locale in obj);
}

// Pass e.g. `'foo.bar.baz'` as nested key; sets value of key `baz` to `value`,
// creating empty objects for intermmediate keys if needed.
function setNestedValue(obj, fullKey, value) {
  const keys = fullKey.split('.');
  keys.reduce((acc, key, index) => {
    if (index === keys.length - 1) acc[key] = value;
    else acc[key] ??= {};
    return acc[key];
  }, obj);
}

function aggregateTranslations() {
  const translations = {};

  SUPPORTED_LOCALES.forEach(locale => {
    if (!translations[locale]) {
      translations[locale] = {};
    }
  });

  const files = fs.readdirSync(sourceDir);

  files.forEach(file => {
    if (path.extname(file) === '.cjs') {
      const filePath = path.join(sourceDir, file);
      const fileContents = require(filePath);

      // E.g. "home.js" produces root key "home"
      const rootKey = path.basename(file, '.cjs');

      // Recursively copy the translations for each key in the source object
      function addTranslations(srcObj, parentKey) {
        for (const [key, value] of Object.entries(srcObj)) {
          if (typeof value !== 'object') continue;

          // If a "leaf" object, i.e. an object with "en" and "sl" keys
          if (typeof value === 'object' && isLeaf(value)) {
            SUPPORTED_LOCALES.forEach(locale => {
              const fullKey = `${locale}.${parentKey}.${key}`
              setNestedValue(translations, fullKey, value[locale])
            });
          } else {
            addTranslations(value, parentKey + '.' + key);
          }
        }
      }

      addTranslations(fileContents, rootKey);
    }
  });

  // Create a JSON file for each locale
  SUPPORTED_LOCALES.forEach(locale => {
    const jsonFilePath = path.join(outputDir, `${locale}.json`);
    const jsonData = JSON.stringify(translations[locale], null, 2);
    fs.writeFileSync(jsonFilePath, jsonData, 'utf-8');
    console.log(`Generated ${locale}.json`);
  });

}

aggregateTranslations();
