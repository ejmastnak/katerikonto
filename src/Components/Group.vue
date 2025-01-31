<script setup>
import { inject } from 'vue'
const props = defineProps({
  group: Object,
})

const classes = inject('classes')
const accounts = inject('accounts')

</script>

<template>
  <div>
    <p>{{group.code}} – {{group.name_en}}</p>
    <p>Slovene: {{group.name_sl}}</p>
    <p>Class: {{group.code.substring(0, 1)}} – {{classes[group.code.substring(0, 1)].name_en}}</p>
  </div>
</template>
