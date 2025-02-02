<script setup>
const props = defineProps({
  selected: Boolean,
})
</script>
<template>
  <button
    class="px-4 py-2 text-gray-600 focus:outline-none transition ease-in-out duration-150"
    :class="{
    'text-gray-800 font-semibold border-b-2 border-blue-500': selected,
    'hover:border-b-2 hover:border-gray-300': !selected
    }" >
    <slot />
  </button>
</template>
