<template>
    <div class="fixed inset-0 overflow-hidden z-40" aria-labelledby="slide-over-title" role="dialog" aria-modal="true" v-if="visible">
        <div class="absolute inset-0 overflow-hidden">
            <div :class="{'opacity-100' : visible , 'opacity-0' : !visible}" @click="visible=!visible" class="absolute inset-0 bg-gray-500 bg-opacity-75 "></div>
            <div :class="positionClass[position]" class="fixed inset-y-0 max-w-full flex">
                <div :class="[{'translate-x-0' : visible , 'translate-x-full' : !visible },sizeOpts[size].width ,index]" class="relative w-screen " >
                    <div class="h-full flex flex-col  bg-white dark:bg-slate-800 shadow-xl overflow-y-scroll">
                        <div class="px-4 sm:px-6 sticky top-0  py-4" :class="[index]">
                           <div class="flex items-start justify-between pb-4 border-b border-gray-200 dark:border-gray-600 sticky">
                                <div class="flex items-center">
                                    <button v-if="closable" type="button" class="border px-2 h-8 ltr:mr-2 rtl:ml-2 rounded-md text-sm dark:text-slate-400 dark:border-gray-600" @click="visible = false">
                                        <i class="la la-times"></i>
                                    </button>
                                    <slot name="title"></slot>
                                    <h3 v-if="title" class="text-lg leading-6 font-medium text-gray-900 dark:text-slate-400 whitespace-pre-line">
                                        {{ title }}
                                    </h3>
                                </div>
                                <div class="ltr:ml-3 rtl:mr-3 flex items-center ">
                                    <slot name="actions"></slot>
                                </div>
                            </div>
                        </div>
                        <div class="relative flex-1 px-4 sm:px-6">
                           <slot></slot>
                        </div>
                      
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default{
    props : {
        title : {
            type : String,
        },
        position :  {
            type : String ,
            default : 'right'
        },
        size : {
            type : String,
            default : 'small',
        },
        visibility : {
            type : Boolean,
            default : false
        },
        closable : {
            type : Boolean,
            default : true
        },
        index : {
            type : String,
            default : 'z-50'
        }
    },
  
    data(){
        return {
            visible : false,
            positionClass : {
                left : 'left-0 md:pr-10',
                right : 'right-0 md:pl-10'
            },
            sizeOpts : {
                big : {
                    width : 'w-full',
                    font    : 'text-sm',
                },
                large : {
                    width : 'w-full md:max-w-5xl',
                    font    : 'text-xs',
                },
                medium : {
                    width : 'w-full md:max-w-xl',
                    font    : 'text-xs',
                },
                small : {
                    width : 'w-full md:max-w-sm',
                    font    : 'text-xs',
                }
            },
        }
    },
    methods : {
        set(key,val){
            this[key] = val;
        },
        show(){
            this.visible = true;
        },
        hide(){
            this.visible = false;
        }
    },
    mounted(){
        this.visible = this.visibility
    }
}

</script>
