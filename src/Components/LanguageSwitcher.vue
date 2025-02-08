<script setup>
import { ref, onMounted } from 'vue'
import { Listbox, ListboxLabel, ListboxButton, ListboxOptions, ListboxOption, } from '@headlessui/vue'
import { ChevronDownIcon, GlobeAltIcon, CheckIcon } from '@heroicons/vue/24/outline'
import { useI18n } from 'vue-i18n'
import Translate from "@/i18n/translation"

const { t, locale } = useI18n()
const supportedLocales = Translate.supportedLocales
const supportedLocaleNames = Translate.supportedLocaleNames

const switchLanguageTo = (newLocale) => {
  if (newLocale === locale) return;
  Translate.switchLanguage(newLocale)
}

</script>

<template>
  <div class="relative w-fit">
      <Listbox as="div" :modelValue="locale" @update:modelValue="switchLanguageTo">
      <ListboxLabel class="sr-only">Change language</ListboxLabel>
      <div class="relative">
        <ListboxButton class="inline-flex divide-x divide-sky-200 rounded-md border border-sky-200 bg-sky-50 hover:bg-sky-100 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600">
          <div class="inline-flex items-center gap-x-1.5 rounded-l-md px-3 py-2 text-sky-800">
            <GlobeAltIcon class="-ml-0.5 size-5" aria-hidden="true" />
            <p class="text-sm font-semibold">{{locale}}</p>
          </div>
          <div class="inline-flex items-center rounded-l-none rounded-r-md p-2">
            <span class="sr-only">Change language</span>
            <ChevronDownIcon class="size-5 text-sky-800 forced-colors:text-[Highlight]" aria-hidden="true" />
          </div>
        </ListboxButton>

        <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
          <ListboxOptions class="absolute right-0 z-10 mt-2 w-36 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <ListboxOption as="template" v-for="(option, idx) in supportedLocales" :key="`locale-${option}`" :value="option" v-slot="{ active, selected }">
              <li :class="[active ? 'bg-sky-500 text-white' : 'text-gray-900', 'cursor-default select-none p-4 text-sm']">
                <div class="flex flex-col">
                  <div class="flex justify-between">
                    <p :class="selected ? 'font-semibold' : 'font-normal'">{{ supportedLocaleNames[idx] }}</p>
                    <span v-if="selected" :class="active ? 'text-white' : 'text-sky-600'">
                      <CheckIcon class="size-5" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>
