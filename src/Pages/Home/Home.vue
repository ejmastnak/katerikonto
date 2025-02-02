<script setup>
import { ref, onBeforeUnmount, onMounted } from 'vue'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import MyTabButton from '@/Components/TabButton.vue'
import Accounts from './Partials/Accounts.vue'
import Groups from './Partials/Groups.vue'
import Classes from './Partials/Classes.vue'

const selectedTab = ref(sessionStorage.getItem('selectedTab') ?? 0);
function changeTab(index) {
  selectedTab.value = index;
}

// Preserve selected tab between page visits
onBeforeUnmount(() => {
  sessionStorage.setItem('selectedTab', selectedTab.value);
})
window.onbeforeunload = function() {
  sessionStorage.setItem('selectedTab', selectedTab.value);
}
onMounted(() => {
  const storedSelectedTab = sessionStorage.getItem('selectedTab');
  if (storedSelectedTab) selectedTab.value = Number(storedSelectedTab);
})

</script>

<template>
  <div>

    <TabGroup @change="changeTab" :defaultIndex="Number(selectedTab)">

      <TabList class="rounded border-b border-gray-300 space-x-2 whitespace-nowrap flex justify-between w-fit mx-auto">

        <!-- Accounts tab button -->
        <Tab as="template" v-slot="{ selected }">
          <MyTabButton :selected="selected">{{$t('home.accounts')}}</MyTabButton>
        </Tab>

        <!-- Groups tab button -->
        <Tab as="template" v-slot="{ selected }">
          <MyTabButton :selected="selected">{{$t('home.groups')}}</MyTabButton>
        </Tab>

        <!-- Classes tab button -->
        <Tab as="template" v-slot="{ selected }">
          <MyTabButton :selected="selected">{{$t('home.classes')}}</MyTabButton>
        </Tab>

      </TabList>

      <TabPanels class="mt-3">

        <!-- Accounts panel -->
        <TabPanel class="rounded p-1">
          <Accounts />
        </TabPanel>

        <!-- Groups panel -->
        <TabPanel class="rounded-md p-1">
          <Groups />
        </TabPanel>

        <!-- Classes panel -->
        <TabPanel class="rounded-md p-1">
          <Classes />
        </TabPanel>

      </TabPanels>
    </TabGroup>

  </div>
</template>
