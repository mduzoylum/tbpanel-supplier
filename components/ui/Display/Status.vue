<template>
    <div>
        <div v-if="mode == 'status'">
            <span v-if="value == 1" class="p-1 inline-flex text-xs rounded-full bg-green-500 text-white">
            <i class="la la-check"></i>
            </span>
            <span v-if="value == 0" class="p-1 inline-flex text-xs rounded-full bg-red-400 text-white">
                <i class="la la-minus"></i>
            </span>
        </div>
        <div v-if="mode == 'flag'">
            <i  class="las la-flag text-lg font-medium" :class="[ value == 1 ?  typeMapping[type]  : 'text-gray-100 dark:text-slate-400']"></i>
        </div>
    </div>
</template>

<script>
export default {
    props : {
        value : {
            type : Number,
            default : 0
        },
        mode : {
            type : String,
            default : 'status'
        },
        type : {
            type : String,
            default : 'none'
        },

    },
    data(){
        return {
            typeMapping : {
                none : '',
                warning : 'text-yellow-500 ',
                danger  : 'text-red-500 ',
                blue  : 'text-sky-500 ',
                purple : 'text-purple-500',
                slate : 'text-slate-500',
            }
        }
    }
}
</script>
