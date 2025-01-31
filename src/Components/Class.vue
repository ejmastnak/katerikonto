<script setup>
import { inject } from 'vue'
const props = defineProps({
  srsClass: Object,
})

const groups = inject('groups')

</script>

<template>
  <div>
    <p>{{srsClass.code}} – {{srsClass.name_en}}</p>
    <p>Slovene: {{srsClass.name_sl}}</p>
  </div>
</template>
