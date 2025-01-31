<script setup>
import { ref, watch, inject, onBeforeUnmount, onMounted } from 'vue'
import fuzzysort from 'fuzzysort'
import throttle from "lodash/throttle";
import TextInput from '@/Components/TextInput.vue'
import InputLabel from '@/Components/InputLabel.vue'
import Listing from './Listing.vue'
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
      <InputLabel for="accounts" value="Account code" />
      <TextInput
      id="accounts"
      type="text"
      placeholder="e.g. 110, 220, 760"
      v-model="accountsQuery"
    />
      <!-- No results found message -->
      <p 
        v-show="accountsQuery && filteredAccounts.length === 0" 
        class="mt-2 text-gray-500"
      >
        No results!
      </p>
    </div>

    <!-- Accounts listing -->
    <Listing v-show="filteredAccounts.length>
      0" class="border border-gray-200 shadow px-12 py-4 rounded-xl mt-16 space-y-5">
      <li
        v-for="account in filteredAccounts.sort(compareCodes)"
        :key="account.obj.code" 
      >
        <Account 
        :account="account.obj"
      />
      </li>
    </Listing >
  </div>
</template>
