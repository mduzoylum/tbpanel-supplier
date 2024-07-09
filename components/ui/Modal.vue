<template>
    <div v-if="state" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div :class="{'opacity-0' : !state , 'opacity-100' : state}" class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div :class="[{'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95' : !state , 'opacity-100 translate-y-0 sm:scale-100' : state},sizeOpts[size].width]" class="dark:bg-slate-800 dark:text-slate-400 inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  min-w-[20%] sm:p-6">
                <div class="sm:flex sm:items-start">
                    <div v-if="type" class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full  sm:mx-0 sm:h-10 sm:w-10 sm:mr-4" :class="{'bg-red-100' : type == 'error', 'bg-green-100': type == 'success' }">
                        <i class="h-6 w-6 la la-exclamation-circle text-2xl text-red-600" v-if="type == 'error'"></i>
                        <i class="h-6 w-6 la la-check-circle text-2xl text-green-600" v-if="type == 'success'"></i>
                    </div>
                    <div class="mt-3 text-center sm:mt-0  sm:text-left">
                        <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">{{ title }}</h3>
                        <div class="mt-2">
                            <div class="text-sm text-gray-500 whitespace-pre" v-html="content"> </div>
                        </div>
                    </div>
                </div>
                <slot v-if="!type"></slot>
                <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <slot name="actions"></slot>
                    <button type="button" @click="state = false" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm dark:bg-slate-800 dark:border-slate-900 dark:text-slate-400">{{ $t('button.cancel') }}</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    props : {
        size : {
            type : String,
            default : 'small',
        },
    },
    data(){
        return {
            state : false,
            title : '',
            content : '',
            type : null,
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
                    width : 'w-full md:max-w-md',
                    font    : 'text-xs',
                }
            },
        }
    },
    methods : {
        error(title,content){
            this.type = 'error';
            this.show(title,content)

        },

        success(title,content){
            this.type = 'success';
            this.show(title,content)
        },

        show(title,content){
            this.state = true;
            this.title = title;
            this.content = content;
        },
        hide(){
            this.state = false
        }
    }
}
</script>
