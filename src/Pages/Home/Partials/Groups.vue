<script setup>
import { ref, watch, inject, onBeforeUnmount, onMounted } from 'vue'
import { useI18n } from 'vue-i18n';
import fuzzysort from 'fuzzysort'
import throttle from "lodash/throttle";
import TextInput from '@/Components/TextInput.vue'
import InputLabel from '@/Components/InputLabel.vue'
import Group from './Group.vue'
import ItemWrapper from './ItemWrapper.vue'

const { t, locale } = useI18n();
const groupsArray = inject('groupsArray')

// fuzzysort options
const throttlems = 200
const threshold = -100
const limit = 20

const query = ref("")
const filteredGroups = ref([])
function searchGroups(query) {
  filteredGroups.value = fuzzysort.go(query.trim(), groupsArray, {
    keys: (locale.value === 'en') ? ['code', 'name_en'] : ['code', 'name_sl'],
    limit: limit,
    threshold: threshold,
  })
}

watch(query, throttle(function (value) {
  searchGroups(value.toString())
}, throttlems))

/**
  Prioritizes group codes beginning with search query, falling back to
  alphabetical sort.
*/
function compareCodes(a, b) {
  if (a.obj.code.startsWith(query.value) && !b.obj.code.startsWith(query.value)) return -1;
  if (b.obj.code.startsWith(query.value) && !a.obj.code.startsWith(query.value)) return 1;
  return a.obj.code - b.obj.code;
}

onBeforeUnmount(() => {
  sessionStorage.setItem('groupsQuery', query.value);
})

window.onbeforeunload = function() {
  sessionStorage.setItem('groupsQuery', query.value);
}

onMounted(() => {
  const savedQuery = sessionStorage.getItem('groupsQuery');
  if (savedQuery) query.value = savedQuery;
})

</script>

<template>
  <div>
    <!-- Search input for groups -->
    <div class="w-fit mx-auto text-lg">
      <InputLabel for="groups" :value="$t('groups.inputLabel')" />
      <TextInput
      id="groups"
      class="mt-px"
      inputWidth="w-64"
      :placeholder="$t('groups.inputPlaceholder')"
      v-model="query"
    />
      <!-- No results found message -->
      <p 
        v-if="query && filteredGroups.length === 0" 
        class="mt-2 text-gray-500"
      >
        {{$t('groups.noResults')}}
      </p>
    </div>

    <!-- Groups listing -->
    <ul v-show="filteredGroups.length > 0" class="mt-10 space-y-6">
      <li
        v-for="group in filteredGroups.sort(compareCodes)"
        :key="group.obj.code" 
      >
        <ItemWrapper>
          <Group :group="group.obj" />
        </ItemWrapper>
      </li>
    </ul>
  </div>
</template>
