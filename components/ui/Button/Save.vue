<template>
  <button
      @click="$emit('save')"
      :class="[cls, 'bg-'+$color+'-500']" class="flex gap-2 items-center justify-center px-4 h-9 text-white text-sm rounded-md hover-primary font-medium"
      :disabled="saving">
    <UiSpinner v-if="saving"></UiSpinner>
    <span>{{  label || $t('ui.save') }}</span>
  </button>
</template>


<script setup>

defineProps({
  saving : {
    type : Boolean,
    default : false
  },
  label : {
    type : String,
    default : null
  },
  cls : {
    type : String,
    default : 'w-40'
  }
})

</script>