<template>
  <div class="bg-white dark:bg-slate-800 flex items-center justify-between border-t border-gray-200 dark:border-gray-600" v-if="total">
    <div class="flex-1 flex justify-between sm:hidden">
      <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700  hover:bg-gray-50"> 
        {{  $t('main.previous') }}
      </a>
      <a href="#" class="ltr:ml-3 rtl:mr-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50"> 
        {{  $t('main.next') }}
      </a>
    </div>
    <div class="hidden sm:flex justify-between items-center w-full" :class="{'flex-col gap-1':size=='small'}">
      <div>
        <p class="text-gray-700 dark:text-slate-400" :class="[size=='small'?'text-xs':'text-sm']">
          {{ $t('main.total') }} {{ total }} {{ $t('main.from_the_recording') }} {{ ((current_page-1) * limit) + 1 }} -  {{ (current_page) * limit < total ?  (current_page) * limit : total }} {{ $t('main.showing') }}
        </p>
      </div>
      <div>
        <nav class="relative z-0 inline-flex rounded-md gap-1 dark:text-slate-400" aria-label="Pagination">
          <button :disabled="current_page == 1" @click="current_page = 1" class="py-1 border rounded-md dark:border-gray-600"
            :class="[size=='small'?'px-2 text-xs':'text-sm font-medium px-3']">
            <i class="la" :class="{'la-angle-double-left' : !$rtl , 'la-angle-double-right' : $rtl}"></i>
          </button>
          <button :disabled="current_page == 1" @click="current_page--" class="py-1 border rounded-md dark:border-gray-600 "
            :class="[size=='small'?'px-2 text-xs':'text-sm font-medium px-3']">
            <i class="la" :class="{'la-angle-left' : !$rtl , 'la-angle-right' : $rtl}"></i>
          </button>
          <div v-if="total_page < 6" class="flex gap-1">
            <button v-for="index in total_page" :key="index" @click="current_page = index" v-html="index"
              class="text-gray-500 inline-flex items-center rounded-md border dark:border-gray-600 py-1"
              :class="[{ 'bg-yellow-500 text-white' : index == current_page  }, size=='small'?'text-xs px-2':'text-sm font-medium px-4']">
            </button>
          </div>
          <div v-if="total_page >= 6" class="px-2" :class="{'text-xs':size=='small'}">
            <input v-model="current_page" type="number" min="1" :max="total_page"
              class="focus:outline-none focus:ring-0 border-gray-100 w-14 py-1 px-2 rounded-md dark:bg-slate-200" :class="{'text-xs':size=='small'}"/> / {{ total_page }}
          </div>
          <button :disabled="current_page == total_page" @click="current_page++" class="border rounded-md dark:border-gray-600"
            :class="[size=='small'?'px-2 text-xs':'text-sm font-medium px-3']">
            <i class="la" :class="{'la-angle-right' : !$rtl , 'la-angle-left' : $rtl}"></i>
          </button>
          <button :disabled="current_page == total_page" @click="current_page = total_page" class="py-1 border rounded-md dark:border-gray-600"
            :class="[size=='small'?'px-2 text-xs':'text-sm font-medium px-3']">
            <i class="la" :class="{'la-angle-double-right' : !$rtl , 'la-angle-double-left' : $rtl}"></i>
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>

export default{
    props : {
      data: {
        type: Object,
        default: null
      },
      size:{
        type:String,
        default:'default'
      },
      modelValue:{
        type:Number,
        default:1
      }
    },
    data() {
        return {
          start : 0,
          limit : 10,
          total : null,
          total_page : 1,
          current_page : 1,
        }
    },
    watch : {
      current_page(value){
        this.$emit('change',value)
        this.$emit('update:modelValue',value)
      },
      data(){
        this.load();
      }
    },
    methods : {
       load(){
          if(!this.data){
            return;
          }
          this.limit = this.data.limit || this.limit;
          this.total = this.data.total;
          this.total_page = Math.ceil(this.data.total  / this.limit);
       }
    },
    mounted(){
        this.load();
        this.current_page = this.modelValue;
    }
}
</script>
