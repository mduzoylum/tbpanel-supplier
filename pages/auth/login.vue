
<template>
  <div class="mx-auto w-full max-w-sm lg:w-96">
    <div class="grid grid-cols-1 ">
      <img class="w-auto" src="/logo-dark.png" alt="Workflow" />
    </div>
    <div class="mt-8">
      <div class="mt-6">
        <AuthLogin/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            config : null
        }
    },
    methods : {

    },
    mounted(){

    },
    setup(){
        definePageMeta({
            layout: "auth",
        });
    }
}

</script>