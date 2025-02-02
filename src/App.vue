<script setup>
import Home from '@/Pages/Home/Home.vue'
import LanguageSwitcher from '@/Components/LanguageSwitcher.vue'
import Logo from '@/Components/Logo.vue'
</script>

<template>
  <main class="h-full flex flex-col">
    <div class="p-4">

      <LanguageSwitcher class="ml-auto" />

      <div class="max-w-3xl mx-auto sm:px-4 py-8">
        <Logo />
        <Home class="mt-8" />
      </div>
    </div>

    <div class="mt-auto p-5">
      <p class="text-gray-500">
        {{$t('app.source')}} <a class="hover:underline hover:text-sky-600" href="https://si-revizija.si/standardi/slovenski-racunovodski-standardi-2016">SRS 2016</a>
      </p>
    </div>

  </main>
</template>
