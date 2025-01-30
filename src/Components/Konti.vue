<script setup>
import { ref, watch, inject } from 'vue'
import fuzzysort from 'fuzzysort'
import throttle from "lodash/throttle";

import TextInput from '@/Components/TextInput.vue'
import InputLabel from '@/Components/InputLabel.vue'
import Account from '@/Components/Account.vue'

const accounts = inject('accounts')
const groups = inject('groups')
const classes = inject('classes')
const uses = inject('uses')

const accountsQuery = ref("")
const filteredAccounts = ref([])
function searchAccounts(query) {
  filteredAccounts.value = fuzzysort.go(query.trim(), accounts, {
    key: 'code',
    limit: 15,
    threshold: -100,
  })
}

const throttlems = 300
watch(accountsQuery, throttle(function (value) {
  searchAccounts(value)
}, throttlems))

function compareCodes(a, b) {
  return a.target - b.target;
}

</script>

<template>
  <div>
    <div class="mt-2 w-full max-w-xl">
      <InputLabel for="accounts" value="Account" />
      <TextInput
      id="accounts"
      type="text"
      class=""
      placeholder="110"
      v-model="accountsQuery"
    />
    </div>

    <div class="space-y-5">
      <Account 
      v-for="account in filteredAccounts.sort(compareCodes)"
      :key="account.obj.code" 
      :account="account.obj"
    />
    </div>

  </div>
</template>
