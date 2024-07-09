<template>
  <div aria-live="assertive" class="fixed top-0 right-0  min-w-[20%]  flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-50" v-if="visible">
    <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
      <div class="max-w-xl w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
        <div class="p-4 "  :class="{ 'bg-green-100' : type == 'success' , 'bg-red-100' : type == 'error'}">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <i class="la  text-medium text-white" :class="{ 'text-green-800 la-check-circle' : type == 'success' , 'text-red-800 la-ban' : type == 'error'}"></i>
            </div>
            <div class="ml-3 flex-1 pt-0.5">
              <p class="text-sm font-medium text-gray-900">{{ type == 'error' ? $t('warning') : $t('general.success_msg')}}</p>
              <p class="mt-1 text-sm text-gray-500" v-html="message"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props : {
    position : {
      type : String,
      default : 'top-right',
    },
    timeout : {
      type : Number,
      default : 3000
    }
  },
  data(){
    return {
      type : 'success',
      title : '',
      message : '',
      visible : false,
    }
  },
  watch : {
    visible(value){
      if(value){
        let self = this;
        setTimeout(function(){
           self.visible = false;
        },self.timeout)
      }
    }
  },
  methods : {
    show() {
      this.visible = true;
    },
    hide(){
      this.visible = false;
    },
   
    success(message){

      this.visible = true;
      this.title   = this.$t('general.success')
      this.type    = 'success';
      this.message = message;

    },
    error(message){
      this.visible = true;
      this.title   = this.$t('general.error')
      this.type    = 'error';
      this.message = message;
    }
  }
};
</script>