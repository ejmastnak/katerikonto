<script setup>
import { inject } from 'vue'
const props = defineProps({
  group: Object,
})

const classes = inject('classes')
const accounts = inject('accounts')
const locale = inject('locale')
const locales = inject('locales')

// Test accounts `group.code + i` for `i = 0, 1, ..., 9`
const accountsInGroup = [...Array(10).keys()]
.filter(i => (props.group.code + i) in accounts)
.map(i => ({
  code: props.group.code + i,
  name_en: accounts[props.group.code + i].name_en,
  name_sl: accounts[props.group.code + i].name_sl,
}));

</script>

<template>
  <div>
    <p class="text-lg"><span class="font-bold">{{group.code}}</span> – {{locale === locales.en ? group.name_en : group.name_sl}}</p>
    <p class="mt-px text-gray-600">{{$t('groups.groupPartial.otherLanguage')}} {{locale === locales.en ? group.name_sl : group.name_en}}</p>

    <p class="mt-3 text-gray-600">
      <span class="font-bold text-gray-500">{{$t('groups.groupPartial.class')}} {{group.code.substring(0, 1)}}</span>
      <span> – {{locale === locales.en ? classes[group.code.substring(0, 1)].name_en : classes[group.code.substring(0, 1)].name_sl}}</span>
    </p>

    <!-- Accounts in group -->
    <div class="mt-3">
      <span class="font-bold text-gray-500">{{$t('groups.groupPartial.accounts')}}</span>
      <ul class="mt-0.5">
        <li v-for="account in accountsInGroup" :key="account.code">
          <p>
            <span class="font-bold text-gray-700">{{account.code}}</span>
            <span> – {{locale === locales.en ? account.name_en : account.name_sl}}</span>
          </p>
        </li>
      </ul>
    </div>



  </div>
</template>
