<template>
  <div class=" shadow rounded-md p-4 w-full mx-auto ">
    <div class="animate-pulse flex space-x-4">
      <div class="flex-1 space-y-6 py-1">
        <div class="space-y-3">
          <div class="h-2 my-3 bg-slate-200 rounded" v-for="i in lines" :key="i"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  props : {
    line : String,
  },
  computed: {
    lines() {
      const line = this.line > 0 ? this.line : 5;
      return Array.from({ length: line }, (_, index) => index);
    },
  },
}
</script>