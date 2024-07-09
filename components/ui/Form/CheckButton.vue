<template>
  <button class="my-button text-base" v-if="checked"  @click="unselect()">

    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
         class="bi bi-check2-square text-green-700" viewBox="0 0 16 16">
      <path
          d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z"></path>
      <path
          d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0"></path>
    </svg>
  </button>
  <button class="my-button text-base" v-else @click="select()">
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
         class="bi bi-app" viewBox="0 0 16 16">
      <path
          d="M11 2a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3zM5 1a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4z"></path>
    </svg>
  </button>
</template>

<script>

export default {
  props: {
    checked: {
      type : Boolean,
      default : false
    },
    unselectActive : {
      type : Boolean,
      default : true
    }
  },
  data() {
    return {
    }
  },
  methods: {
    select() {
      this.$emit('select');
    },
    unselect() {
      if(this.unselectActive) {
        this.$emit('unselect');
      }
    }
  },
  mounted() {
  }
}

</script>