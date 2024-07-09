<template>
    <div v-if="state" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        
            <div :class="{'opacity-0' : !state , 'opacity-100' : state}" class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div :class="{'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95 dark:bg-slate-800 dark:text-slate-400' : !state , 'opacity-100 translate-y-0 sm:scale-100 dark:bg-slate-800 dark:text-slate-400' : state}" class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 dark:bg-slate-800 dark:text-slate-400">
                <div class="sm:flex sm:items-start">
                    <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <!-- Heroicon name: outline/exclamation -->
                    <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    </div>
                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-slate-400" id="modal-title">{{ $t('warning')}}</h3>
                    <div class="mt-2">
                        <p class="text-sm text-gray-500 dark:text-slate-400">{{ message }} </p>
                    </div>
                    </div>
                </div>
                <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button type="button" @click="execute"  :class="['bg-'+$color+'-500']" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2  text-base font-medium text-white focus:outline-none  rtl:mr-3 ltr:ml-3 sm:w-auto sm:text-sm">
                        {{ confirmText }}
                    </button>
                    <button type="button" @click="state = false" class="dark:bg-slate-800 dark:border-slate-900 dark:text-slate-400 mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm">
                        {{ $t('button.cancel') }}
                    </button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    data(){
        return {
            state : false,
            promise : null,
            record : 0,
            confirmText : this.$t('general.delete'),
            message     : this.$t('message.delete')
        }
    },
    methods : {
        confirm(id,promise){
            this.state = true;
            this.record = id;
            this.promise = promise;
        },
        execute(){
           (this.promise)(this.record);
           this.state = false;
        },

        show(opts){
            this.state        = true;
            this.confirmText  = opts.confirmText || this.confirmText;
            this.message      = opts.message || this.message;
            this.promise      = opts.confirm;
        }
    }
}
</script>
