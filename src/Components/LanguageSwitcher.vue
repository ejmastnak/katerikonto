<script setup>
import { ref, onMounted } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption, } from '@headlessui/vue'
import { ChevronDownIcon, GlobeAltIcon } from '@heroicons/vue/24/outline'
import { useI18n } from 'vue-i18n'
import Translate from "@/i18n/translation"

const { t, locale } = useI18n()
const supportedLocales = Translate.supportedLocales
const supportedLocaleNames = Translate.supportedLocaleNames

const switchLanguageTo = async (newLocale) => {
  if (newLocale === locale.value) return;
  Translate.switchLanguage(newLocale)
}

</script>

<template>
  <div class="relative w-fit">
    <Listbox 
      :modelValue="locale"
      @update:modelValue="switchLanguageTo"
    >
      <ListboxButton class="flex items-center text-left border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-2 py-2">
        <GlobeAltIcon class="w-5 h-5 translate-y-px text-gray-500 shrink-0" />
        <span class="ml-1 uppercase font-bold">{{ locale }}</span>
        <ChevronDownIcon class="translate-y-px ml-0.5 w-5 h-5 text-gray-500 shrink-0" />
      </ListboxButton>
      <ListboxOptions class="absolute left-0 sm:left-auto sm:right-0 mt-0.5 text-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 overflow-hidden focus:border-blue-500">
        <ListboxOption
          v-for="(option, idx) in supportedLocales"
          :key="`locale-${option}`"
          :value="option"
          class="text-left cursor-pointer"
          v-slot="{ active, selected }"
        >
          <li class="flex items-center px-4 py-1.5" :class="{
            'bg-blue-500 text-white': active,
            'text-gray-500': !selected && !active,
            'font-bold': selected,
          }"
          >
            {{ supportedLocaleNames[idx] }}
          </li>
        </ListboxOption>
      </ListboxOptions>
    </Listbox>
  </div>
</template>
