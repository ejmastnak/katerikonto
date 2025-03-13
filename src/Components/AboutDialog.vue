<script setup>
import { ref, } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import Logo from '@/Components/Logo.vue'
import { store } from '@/store.js'
</script>

<template>
  <TransitionRoot as="template" :show="store.aboutDialogOpen">
    <Dialog class="relative z-10" @close="store.aboutDialogOpen = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl">
              <div class="px-4 pb-4 pt-5 sm:p-10 sm:pb-4">
                <Logo />
                <div class="mt-12 sm:mt-16 text-gray-800">
                  <p>
                    {{$t('about.about[0]')}}
                    <a href="https://www.si-revizija.si/" class="text-sky-600 hover:underline">{{$t('about.about[1]')}}</a>
                    <span>{{$t('about.about[2]')}}</span>
                  </p>

                  <!-- About -->
                  <p class="mt-10 sm:mt-12 text-sm">
                    <span class="font-bold">{{$t('about.source[0]')}}</span> 
                    {{$t('about.source[1]')}}
                    <span class="italic">{{$t('about.source[2]')}}</span>
                    <span>{{$t('about.source[3]')}}</span>
                    <a href="https://si-revizija.si/komisija-za-srs/srs-2024" class="text-sky-600 hover:underline">{{$t('about.source[4]')}}</a>
                    <span class="">{{$t('about.source[5]')}}</span>
                  </p>

                  <!-- Made by -->
                  <div class="mt-4 text-sm">
                    <p>
                      <span class="font-bold">{{$t('about.madeBy[0]')}}</span> 
                      <a class="text-sky-600 hover:underline" href="https://ejmastnak.com/">{{$t('about.madeBy[1]')}}</a>
                    </p>
                  </div>

                  <!-- Open source -->
                  <p class="mt-4 text-sm text-gray-500">
                    {{$t('about.openSource[0]')}}
                    <a href="https://github.com/ejmastnak/katerikonto" class="text-sky-600 hover:underline">{{$t('about.openSource[1]')}}</a>
                    <span>{{$t('about.openSource[2]')}}</span>
                  </p>

                </div>
              </div>

              <!-- Close button -->
              <div class="mt-2 bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" @click="store.aboutDialogOpen = false" ref="cancelButtonRef">{{$t('about.closeButton')}}</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
