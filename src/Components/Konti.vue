<script setup>
import { ref, watch, inject } from 'vue'
import fuzzysort from 'fuzzysort'
import throttle from "lodash/throttle";

import TextInput from '@/Components/TextInput.vue'
import InputLabel from '@/Components/InputLabel.vue'
import Account from '@/Components/Account.vue'
import Group from '@/Components/Group.vue'
import Class from '@/Components/Class.vue'

const accounts = inject('accounts')
const groups = inject('groups')
const groupsArray = inject('groupsArray')
const classes = inject('classes')
const classesArray = inject('classesArray')
const uses = inject('uses')

// fuzzysort options
const throttlems = 200
const threshold = -100
const accountsLimit = 15
const groupsLimit = 20
const classesLimit = 1

const accountsQuery = ref("")
const filteredAccounts = ref([])
function searchAccounts(query) {
  filteredAccounts.value = fuzzysort.go(query.trim(), accounts, {
    key: 'code',
    limit: accountsLimit,
    threshold: threshold,
  })
}

const groupsQuery = ref("")
const filteredGroups = ref([])
function searchGroups(query) {
  filteredGroups.value = fuzzysort.go(query.trim(), groupsArray, {
    key: 'code',
    limit: groupsLimit,
    threshold: threshold,
  })
}

const classesQuery = ref("")
const filteredClasses = ref([])
function searchClasses(query) {
  filteredClasses.value = fuzzysort.go(query.trim(), classesArray, {
    key: 'code',
    limit: classesLimit,
    threshold: threshold,
  })
}

watch(accountsQuery, throttle(function (value) {
  searchAccounts(value)
}, throttlems))

watch(groupsQuery, throttle(function (value) {
  searchGroups(value)
}, throttlems))

watch(classesQuery, throttle(function (value) {
  searchClasses(value)
}, throttlems))

function compareCodes(a, b) {
  return a.target - b.target;
}

</script>

<template>
  <div>

    <!-- Search input for accounts -->
    <div class="mx-auto w-40 w-fit">
      <InputLabel for="accounts" value="Search accounts" />
      <TextInput
      id="accounts"
      type="text"
      placeholder="e.g. 110, 220, 760"
      v-model="accountsQuery"
    />
      <!-- No results found message -->
      <p 
        v-if="accountsQuery && filteredAccounts.length === 0" 
        class="mt-2 text-gray-500"
      >
        No results!
      </p>
    </div>

    <!-- Search input for groups -->
    <div class="mt-8 mx-auto w-40 w-fit">
      <InputLabel for="groups" value="Search groups" />
      <TextInput
      id="groups"
      type="text"
      placeholder="e.g. 11, 22, 76"
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

    <!-- Search input for classes -->
    <div class="mt-8 mx-auto w-40 w-fit">
      <InputLabel for="classes" value="Search classes" />
      <TextInput
      id="classes"
      type="text"
      placeholder="e.g. 1, 2, 7"
      v-model="classesQuery"
    />
      <!-- No results found message -->
      <p 
        v-if="classesQuery && filteredClasses.length === 0" 
        class="mt-2 text-gray-500"
      >
        No results!
      </p>
    </div>

    <!-- Accounts -->
    <ul class="mt-10 space-y-5">
      <li
        v-for="account in filteredAccounts.sort(compareCodes)"
        :key="account.obj.code" 
      >
        <Account 
        :account="account.obj"
      />
      </li>
    </ul>

    <!-- Groups -->
    <ul class="mt-10 space-y-5">
      <li
        v-for="group in filteredGroups.sort(compareCodes)"
        :key="group.obj.code" 
      >
        <Group 
        :group="group.obj"
      />
      </li>
    </ul>

    <!-- Classes -->
    <ul class="mt-10 space-y-5">
      <li
        v-for="srsClass in filteredClasses.sort(compareCodes)"
        :key="srsClass.obj.code" 
      >
        <Class 
        :srsClass="srsClass.obj"
      />
      </li>
    </ul>

  </div>
</template>
