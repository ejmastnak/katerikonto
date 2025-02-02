<script setup>
import { inject } from 'vue'
const props = defineProps({
  group: Object,
})

const classes = inject('classes')
const accounts = inject('accounts')
const locale = inject('locale')
const locales = inject('locales')

</script>

<template>
  <div>
    <p class="text-lg"><span class="font-bold">{{group.code}}</span> – {{locale === locales.en ? group.name_en : group.name_sl}}</p>
    <p class="mt-0.5 text-gray-600">{{$t('groups.groupPartial.otherLanguage')}} {{locale === locales.en ? group.name_sl : group.name_en}}</p>

    <p class="mt-3 text-gray-600">
      <span class="font-bold text-gray-500">{{$t('groups.groupPartial.class')}} {{group.code.substring(0, 1)}}</span>
      <span> – {{locale === locales.en ? classes[group.code.substring(0, 1)].name_en : classes[group.code.substring(0, 1)].name_sl}}</span>
    </p>
  </div>
</template>
