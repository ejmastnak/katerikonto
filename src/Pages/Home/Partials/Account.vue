<script setup>
import { inject } from 'vue'

const props = defineProps({
  account: Object,
})

const groups = inject('groups')
const classes = inject('classes')
const uses = inject('uses')
const locale = inject('locale')
const locales = inject('locales')

</script>

<template>
  <div>

    <p class="text-lg"><span class="font-bold">{{account.code}}</span> – {{locale === locales.en ? account.name_en : account.name_sl}}</p>
    <p class="mt-0.5 text-gray-600">{{$t('accounts.accountPartial.otherLanguage')}} {{locale === locales.en ? account.name_sl : account.name_en}}</p>

    <!-- Group and class -->
    <div class="mt-3 text-gray-600">
      <p>
        <span class="font-bold text-gray-500">{{$t('accounts.accountPartial.group')}} {{account.code.substring(0, 2)}}</span>
        <span> – {{locale === locales.en ? groups[account.code.substring(0, 2)].name_en : groups[account.code.substring(0, 2)].name_sl}}</span>
      </p>

      <p>
        <span class="font-bold text-gray-500">{{$t('accounts.accountPartial.class')}} {{account.code.substring(0, 1)}} </span>
        <span> – {{locale === locales.en ? classes[account.code.substring(0, 1)].name_en : classes[account.code.substring(0, 1)].name_sl}}</span>
      </p>
    </div>

    <!-- Used by -->
    <div class="mt-3">
      <p class="font-bold text-gray-700">{{$t('accounts.accountPartial.usedBy')}}</p>
      <ul class="mt-0.5 ml-5 list-disc">
        <li v-if="locale === locales.en" v-for="use in account.uses_en">
          {{use}} – {{uses['en'][use]}}
        </li>
        <li v-else v-for="use in account.uses_sl">
          {{use}} – {{uses['sl'][use]}}
        </li>
      </ul>
    </div>
  </div>
</template>
