<script setup>
import { ref } from 'vue'
import Home from '@/Pages/Home/Home.vue'
import LanguageSwitcher from '@/Components/LanguageSwitcher.vue'
import Logo from '@/Components/Logo.vue'
import AboutDialog from '@/Components/AboutDialog.vue'
import { store } from '@/store.js'

</script>

<template>
  <main class="h-full flex flex-col">
    <div class="p-4">

      <LanguageSwitcher class="ml-auto" />

      <div class="max-w-3xl mx-auto sm:px-4 py-8">
        <Logo />
        <Home class="mt-10" />
      </div>
    </div>

    <div class="mt-auto p-4 text-gray-400">
      <button @click="store.aboutDialogOpen = true" type="button" class="rounded bg-sky-50 px-3 py-1.5 text-sm font-semibold text-sky-700 shadow-sm hover:bg-sky-100">{{$t('about.button')}}</button>
    </div>

    <AboutDialog />

  </main>
</template>
