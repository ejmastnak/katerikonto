<template>
  <div class="mx-auto w-fit font-['B612'] italic flex items-center bg-sky-50 text-xl sm:text-3xl px-8 sm:px-10 py-6 rounded-md shadow-sm">
    <div class="w-12 h-12 bg-sky-700 flex items-center rounded shrink-0">
      <p class="text-sky-50 text-center w-full -translate-x-0.5 text-3xl">K</p>
    </div>
    <div class="ml-3 sm:ml-4 ">
      <p class="text-sky-700">Kateri konto?</p>
      <p v-if="$t('logo.subtitle')" class="mt-px text-xs text-gray-400">
        {{$t('logo.subtitle')}}
      </p>
    </div>
  </div>
</template>
