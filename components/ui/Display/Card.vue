<template>
  <div>
    <div class="bg-white border dark:bg-slate-800  dark:border-gray-600 rounded-md p-4 " v-if="!toggle" :class="$attrs.class">
      <h2 class="font-medium dark:text-slate-400 mb-3 flex gap-2 items-center justify-between" v-if="title">
        <span>{{ title }}</span>
        <slot name="header"></slot>
      </h2>
      <slot/>
    </div>
    <Disclosure v-slot="{ open }" :default-open="open" as="div" class="bg-white border  dark:bg-slate-800  dark:border-gray-600  rounded-md py-2 px-4" v-if="toggle" :class="$attrs.class">
      <DisclosureButton class="flex w-full justify-between items-center font-medium dark:text-slate-400" >
        <div class="flex gap-2 items-center">
          <span>{{ title }}</span>
          <slot name="header"></slot>
          <div class="flex items-center gap-1">
            <a :href="article" target="_blank" v-if="article"><i class="la la-question-circle text-lg text-gray-500 dark:text-slate-500"></i></a>
            <a :href="setting" target="_blank" v-if="setting"><i class="la la-cog text-lg text-gray-500 dark:text-slate-500"></i></a>
          </div>
        </div>

        <i class=" text-xl la" :class="open ? 'la-minus-square' : 'la-plus-square'"></i>
      </DisclosureButton>
      <DisclosurePanel>
        <slot/>
      </DisclosurePanel>
    </Disclosure>
  </div>
</template>

<script setup>

import { Disclosure, DisclosureButton,  DisclosurePanel } from '@headlessui/vue'

defineProps({
  title: {
    type: String,
    default: null
  },
  toggle: {
    type: Boolean,
    default: false
  },
  article : {
    type : String,
    default : null
  },
  setting : {
    type : String,
    default : null
  },
  open : {
    type : Boolean,
    default : false
  }
})

</script>