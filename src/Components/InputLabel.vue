<script setup>
defineProps({
  value: {
    type: String,
  },
});
</script>

<template>
  <label class="block text-base font-bold text-gray-500">
    <span v-if="value">{{ value }}</span>
    <span v-else><slot /></span>
  </label>
</template>
