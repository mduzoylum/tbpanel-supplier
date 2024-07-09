<template>
  <Switch v-model="enabled"
    :class="enabled ? 'bg-'+$color+'-500' : 'bg-gray-200'"
    class="dark:bg-slate-400 dark:border-gray-600 relative inline-flex h-6 w-11 items-center rounded-full"
  >
    <span class="sr-only">Enable</span>
    <span
      :class="enabled ? 'ltr:translate-x-6 rtl:-translate-x-6' : 'ltr:translate-x-1 rtl:-translate-x-1'"
      class="inline-block h-4 w-4 transform rounded-full bg-white"
    />
  </Switch>
</template>

<script>
import { Switch } from '@headlessui/vue'

export default {
  components : { Switch },
  props : {
    modelValue : {
      type    : [String,Number,Boolean],
      default : 0
    }
  },
  data(){
    return {
      enabled : this.modelValue == 1
    }
  },
  watch :{
    enabled(){
      this.$emit('update:modelValue',this.enabled ? 1 : 0);
      this.$emit('change',this.enabled ? 1 : 0);
    }
  },
  mounted(){
    this.enabled = this.modelValue == 1;
  }
}
</script>