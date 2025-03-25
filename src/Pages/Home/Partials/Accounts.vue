<script setup>
import { ref, watch, inject, onBeforeUnmount, onMounted } from 'vue'
import { useI18n } from 'vue-i18n';
import fuzzysort from 'fuzzysort'
import throttle from "lodash/throttle";
import TextInput from '@/Components/TextInput.vue'
import InputLabel from '@/Components/InputLabel.vue'
import Account from './Account.vue'
import ItemWrapper from './ItemWrapper.vue'

const { t, locale } = useI18n();
const accountsArray = inject('accountsArray')

// fuzzysort options
const throttlems = 200
const threshold = -100
const limit = 15

const query = ref("")
const filteredAccounts = ref([])
function searchAccounts(query) {
  filteredAccounts.value = fuzzysort.go(query.trim(), accountsArray, {
    keys: (locale.value === 'en') ? ['code', 'name_en'] : ['code', 'name_sl'],
    limit: limit,
    threshold: threshold,
  });
}

watch(query, throttle(function (value) {
  searchAccounts(value.toString())
}, throttlems))

/**
  Prioritizes account codes beginning with search query, falling back to
  alphabetical sort.
*/
function compareCodes(a, b) {
  if (a.obj.code.startsWith(query.value) && !b.obj.code.startsWith(query.value)) return -1;
  if (b.obj.code.startsWith(query.value) && !a.obj.code.startsWith(query.value)) return 1;
  return a.obj.code - b.obj.code;
}

onBeforeUnmount(() => {
  sessionStorage.setItem('accountsQuery', query.value);
})

window.onbeforeunload = function() {
  sessionStorage.setItem('accountsQuery', query.value);
}

onMounted(() => {
  const savedQuery = sessionStorage.getItem('accountsQuery');
  if (savedQuery) query.value = savedQuery;
})

</script>

<template>
  <div>

    <!-- Search input for accounts -->
    <div class="w-fit mx-auto text-lg">
      <InputLabel class="ml-px" for="accounts" :value="$t('accounts.inputLabel')" />
      <TextInput
      class="mt-px"
      inputWidth="w-64"
      id="accounts"
      :placeholder="$t('accounts.inputPlaceholder')"
      v-model="query"
    />
      <!-- No results found message -->
      <p 
        v-show="query && filteredAccounts.length === 0" 
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
        <ItemWrapper>
          <Account :account="account.obj" />
        </ItemWrapper>
      </li>
    </ul >
  </div>
</template>
