<template>
        <div class="bg-white dark:bg-slate-800 rounded-md shadow data-grid-nav  block md:flex items-center justify-between mt-2"
        :class="[size=='small'?'p-1 mb-2':'px-4 py-2 mb-3']">
            <h1  :class="['text-'+$color+'-500']" class="text-sm md:text-xl mb-2 md:mb-0 " v-if="title != '' && titleIcon != ''">
                <i :class="titleIcon" class="la"></i>
                {{ title }}
            </h1>
            <div class="flex items-center justify-end" v-if="basic">
                <slot name="actions"></slot>
            </div>
          <div class="flex items-center justify-end" v-if="!basic">
            <div class="flex rtl:flex-row-reverse rounded-md h-" v-if="config.searchable">
              <div class="relative flex items-stretch flex-grow focus-within:z-10 focus:outline-none focus:ring-0">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UiIconsSearch class="text-gray-400"></UiIconsSearch>
                </div>
                <input
                    type="text"
                    @keyup.enter="sendEvent('search',query)"
                    v-model="query"
                    class="border border-gray-300 focus:ring-0 focus:ring-offset-0 focus:outline-none focus:border-gray-400 block w-full rounded-md pl-10 sm:text-sm dark:bg-slate-400 dark:border-gray-600"
                    :placeholder="$t('button.search_input')"
                >
              </div>
              <button
                  @click="sendEvent('search',query)"
                  type="button"
                  class="bg-white flex items-center px-3 h-8 text-white text-sm rounded-md hover-primary border"
              >
                <span class="text-black">{{ $t('button.search')}}</span>
              </button>
            </div>
            <slot name="actions"></slot>
          </div>
        </div>
</template>

<script> 
export default{
    props : {
        title : String,
        titleIcon : {
            type : String,
            default : ''
        },
        config : {
            type : Object,
            default : {

            }
        },
        basic : {
            type : Boolean,
            default : false,
        },
        size: {
          type: String,
          default: 'default'
        }      
    },
    data(){
        return {
            query : '',
        }
    },
    methods : {
        sendEvent(event,params = null){
            this.$emit('events',event,params);
        }
    }
}

</script>