<script setup>
import { inject } from 'vue'
const props = defineProps({
  srsClass: Object,
})

const groups = inject('groups')
const locale = inject('locale')
const locales = inject('locales')

// Test groups `class.code + i` for `i = 0, 1, ..., 9`
const groupsInClass = [...Array(10).keys()]
.filter(i => (props.srsClass.code + i) in groups)
.map(i => ({
  name_en: groups[props.srsClass.code + i].name_en,
  name_sl: groups[props.srsClass.code + i].name_sl,
  code: props.srsClass.code + i,
}));

</script>

<template>
  <div>
    <div>
      <p class="text-lg"><span class="font-bold">{{srsClass.code}}</span> – {{locale === locales.en ? srsClass.name_en : srsClass.name_sl}}</p>
      <p class="mt-px text-gray-600">{{$t('classes.classPartial.otherLanguage')}} {{locale === locales.en ? srsClass.name_sl : srsClass.name_en}}</p>
    </div>

    <!-- Groups in class -->
    <div class="mt-3">
      <span class="font-bold text-gray-500">{{$t('classes.classPartial.groups')}}</span>
      <ul class="mt-0.5">
        <li v-for="group in groupsInClass" :key="group.code">
          <p>
            <span class="font-bold text-gray-700">{{group.code}}</span>
            <span> – {{locale === locales.en ? group.name_en : group.name_sl}}</span>
          </p>
        </li>
      </ul>
    </div>

  </div>


</template>
