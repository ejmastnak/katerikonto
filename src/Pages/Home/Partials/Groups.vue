<script setup>
import { ref, watch, inject, onBeforeUnmount, onMounted } from 'vue'
import fuzzysort from 'fuzzysort'
import throttle from "lodash/throttle";
import TextInput from '@/Components/TextInput.vue'
import InputLabel from '@/Components/InputLabel.vue'
import Listing from './Listing.vue'
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
      <InputLabel for="groups" value="Group code" />
      <TextInput
      id="groups"
      type="text"
      placeholder="e.g. 110, 220, 760"
      v-model="groupsQuery"
    />
      <!-- No results found message -->
      <p 
        v-if="groupsQuery && filteredGroups.length === 0" 
        class="mt-2 text-gray-500"
      >
        No results!
      </p>
    </div>

    <!-- Groups listing -->
    <Listing v-show="filteredGroups.length > 0">
      <li
        v-for="group in filteredGroups.sort(compareCodes)"
        :key="group.obj.code" 
      >
        <Group 
        :group="group.obj"
      />
      </li>
    </Listing>
  </div>
</template>
