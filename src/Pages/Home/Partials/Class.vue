<script setup>
import { inject } from 'vue'
const props = defineProps({
  srsClass: Object,
})

const groups = inject('groups')
const locale = inject('locale')
const locales = inject('locales')

</script>

<template>
  <div>
    <p class="text-lg"><span class="font-bold">{{srsClass.code}}</span> – {{locale === locales.en ? srsClass.name_en : srsClass.name_sl}}</p>
    <p class="mt-0.5 text-gray-600">{{$t('classes.classPartial.otherLanguage')}} {{locale === locales.en ? srsClass.name_sl : srsClass.name_en}}</p>
  </div>
</template>
