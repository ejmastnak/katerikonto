<script setup>
import Home from '@/Pages/Home/Home.vue'
import LanguageSwitcher from '@/Components/LanguageSwitcher.vue'
</script>

<template>
  <main class="">
    <LanguageSwitcher class="ml-auto mr-4 mt-4" />
    <div class="max-w-3xl mx-auto px-8 py-16 sm:py-28">
      <Home />
    </div>
  </main>
</template>
