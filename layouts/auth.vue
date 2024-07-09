<template>
  <div class="static min-h-screen flex">
    <div
        class=" overflow-x-auto relative bg-opacity-70 flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-gray-800 z-20">
      <header class='mt-10'>
        <div class="absolute top-0 right-0 h-16">

        </div>
      </header>

      <slot/>

      <footer class="mt-12">
        <div class='absolute bottom-8 space-x-8 justify-items-end grid grid-cols-3'>

        </div>
      </footer>
    </div>

    <img class="absolute inset-0 h-full w-full object-cover z-0" src="/bg.png" alt=""/>
  </div>
</template>


<script setup>


useHead({
  bodyAttrs: {
    class: 'h-full '
  },
  htmlAttrs: {
    class: 'h-full',
    dir: localStorage.getItem("store-language") == 'ar' ? 'rtl' : 'ltr'
  },
  title: 'Toptancım Burada',
})
</script>