<script setup>
import { ref, watch, inject, onBeforeUnmount, onMounted } from 'vue'
import { useI18n } from 'vue-i18n';
import fuzzysort from 'fuzzysort'
import throttle from "lodash/throttle";
import TextInput from '@/Components/TextInput.vue'
import InputLabel from '@/Components/InputLabel.vue'
import Class from './Class.vue'
import ItemWrapper from './ItemWrapper.vue'

const { t, locale } = useI18n();
const classesArray = inject('classesArray')

// fuzzysort options
const throttlems = 200
const threshold = -100
const limit = 20

const query = ref("")
const filteredClasses = ref([])
function searchClasses(query) {
  filteredClasses.value = fuzzysort.go(query.trim(), classesArray, {
    keys: (locale.value === 'en') ? ['code', 'name_en'] : ['code', 'name_sl'],
    limit: limit,
    threshold: threshold,
  })
}

watch(query, throttle(function (value) {
  searchClasses(value.toString())
}, throttlems))

function compareCodes(a, b) {
  return a.obj.code - b.obj.code;
}

onBeforeUnmount(() => {
  sessionStorage.setItem('classesQuery', query.value);
})

window.onbeforeunload = function() {
  sessionStorage.setItem('classesQuery', query.value);
}

onMounted(() => {
  const savedQuery = sessionStorage.getItem('classesQuery');
  if (savedQuery) query.value = savedQuery;
})

</script>

<template>
  <div>
    <!-- Search input for classes -->
    <div class="w-fit mx-auto text-lg">
      <InputLabel for="classes" :value="$t('classes.inputLabel')" />
      <TextInput
      id="classes"
      class="mt-px"
      inputWidth="w-64"
      :placeholder="$t('classes.inputPlaceholder')"
      v-model="query"
    />
      <!-- No results found message -->
      <p 
        v-if="query && filteredClasses.length === 0" 
        class="mt-2 text-gray-500"
      >
        {{$t('classes.noResults')}}
      </p>
    </div>

    <!-- Classes listing -->
    <ul v-show="filteredClasses.length" class="mt-10 space-y-6">
      <li
        v-for="srsClass in filteredClasses.sort(compareCodes)"
        :key="srsClass.obj.code" 
      >
        <ItemWrapper>
          <Class :srsClass="srsClass.obj" />
        </ItemWrapper>
      </li>
    </ul>
  </div>
</template>
