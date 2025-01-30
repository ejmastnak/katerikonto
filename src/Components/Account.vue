<script setup>
import { inject } from 'vue'
const props = defineProps({
  account: Object,
})

const groups = inject('groups')
const classes = inject('classes')
const uses = inject('uses')

</script>

<template>
  <div>
    <p>{{account.code}} – {{account.name_en}}</p>
    <p>Slovene: {{account.name_sl}}</p>

    <p>Group: {{account.code.substring(0, 2)}} – {{groups[account.code.substring(0, 2)].name_en}}</p>
    <p>Class: {{account.code.substring(0, 1)}} – {{classes[account.code.substring(0, 1)].name_en}}</p>

    <div class="">
      Used by:
      <ul class="ml-5 list-disc">
        <li v-for="use in account.uses_en">
          {{use}} – {{uses['en'][use]}}
        </li>
      </ul>
    </div>
  </div>
</template>


<!-- 000 – Dobro ime -->
<!-- ang: Goodwill -->
<!-- Uporabljajo: -->
<!-- - D – Gospodarske družbe -->
<!-- - Z – Zadruge -->
<!-- Skupina: 00 – Neopredmetena sredstva in dolgoročne aktivne časovne razmejitve -->
<!-- Razred: 0 – DOLGOROČNA SREDSTVA -->
