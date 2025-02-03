<script setup>
import { onMounted, ref } from 'vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  placeholder: String,
  type: String,
  id: String,
})

const model = defineModel({
  type: [String, Number],
});

const input = ref(null);

onMounted(() => {
  if (input.value.hasAttribute('autofocus')) {
    input.value.focus();
  }
});

defineExpose({ focus: () => input.value.focus() });
</script>

<template>
  <div class="border-none relative p-0">
    <div class="absolute left-4 inset-y-0 flex items-center">
      <MagnifyingGlassIcon class="-translate-x-0.5 translate-y-px w-6 h-6 text-gray-400 shrink-0" />
    </div>
    <input
    class="pl-[2.75rem] rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 !text-lg"
    :placeholder="placeholder"
    :type="type"
    :id="id"
    v-model="model"
    ref="input"
  />
  </div>
</template>
