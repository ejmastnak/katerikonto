<script setup>
import { ref, watch, inject, onBeforeUnmount, onMounted } from 'vue'
import fuzzysort from 'fuzzysort'
import throttle from "lodash/throttle";
import TextInput from '@/Components/TextInput.vue'
import InputLabel from '@/Components/InputLabel.vue'
import Group from './Group.vue'

const groupsArray = inject('groupsArray')

// fuzzysort options
const throttlems = 200
const threshold = -100
const limit = 20

const groupsQuery = ref("")
const filteredGroups = ref([])
function searchGroups(query) {
  filteredGroups.value = fuzzysort.go(query.trim(), groupsArray, {
    key: 'code',
    limit: limit,
    threshold: threshold,
  })
}

watch(groupsQuery, throttle(function (value) {
  searchGroups(value)
}, throttlems))

watch(groupsQuery, throttle(function (value) {
  searchGroups(value)
}, throttlems))

function compareCodes(a, b) {
  return a.target - b.target;
}

</script>

<template>
  <div>
    <!-- Search input for groups -->
    <div class="w-fit mx-auto">
      <InputLabel for="groups" :value="$t('groups.inputLabel')" />
      <TextInput
      id="groups"
      type="text"
      :placeholder="$t('groups.inputPlaceholder')"
      v-model="groupsQuery"
    />
      <!-- No results found message -->
      <p 
        v-if="groupsQuery && filteredGroups.length === 0" 
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
        <Group class="border border-gray-200 shadow px-10 py-6 rounded-xl" :group="group.obj" />
      </li>
    </ul>
  </div>
</template>
