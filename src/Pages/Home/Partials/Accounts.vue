<script setup>
import { ref, watch, inject, onBeforeUnmount, onMounted } from 'vue'
import fuzzysort from 'fuzzysort'
import throttle from "lodash/throttle";
import TextInput from '@/Components/TextInput.vue'
import InputLabel from '@/Components/InputLabel.vue'
import Account from './Account.vue'

const accounts = inject('accounts')

// fuzzysort options
const throttlems = 200
const threshold = -100
const limit = 15

const accountsQuery = ref("")
const filteredAccounts = ref([])
function searchAccounts(query) {
  filteredAccounts.value = fuzzysort.go(query.trim(), accounts, {
    key: 'code',
    limit: limit,
    threshold: threshold,
  })
}

watch(accountsQuery, throttle(function (value) {
  searchAccounts(value)
}, throttlems))

function compareCodes(a, b) {
  return a.target - b.target;
}

</script>

<template>
  <div>

    <!-- Search input for accounts -->
    <div class="w-fit mx-auto">
      <InputLabel for="accounts" :value="$t('accounts.inputLabel')" />
      <TextInput
      id="accounts"
      type="text"
      :placeholder="$t('accounts.inputPlaceholder')"
      v-model="accountsQuery"
    />
      <!-- No results found message -->
      <p 
        v-show="accountsQuery && filteredAccounts.length === 0" 
        class="mt-2 text-gray-500"
      >
        {{$t('accounts.noResults')}}
      </p>
    </div>

    <!-- Accounts listing -->
    <ul v-show="filteredAccounts.length> 0" class="mt-10 space-y-6">
      <li
        v-for="account in filteredAccounts.sort(compareCodes)"
        :key="account.obj.code" 
      >
        <Account class="border border-gray-200 shadow px-10 py-6 rounded-xl" :account="account.obj" />
      </li>
    </ul >
  </div>
</template>
