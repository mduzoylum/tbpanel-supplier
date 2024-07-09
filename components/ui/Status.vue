<template>
    <div>
        <div v-if="mode == 'status'">
            <span v-if="condition == 1" class="p-1 inline-flex text-xs rounded-full bg-green-500 text-white">
            <i class="la la-check"></i>
            </span>
            <span v-if="condition == 0" class="p-1 inline-flex text-xs rounded-full bg-red-400 text-white">
                <i class="la la-minus"></i>
            </span>
        </div>
        <div v-if="mode == 'flag'">
            <i v-if="condition == 1" class="las la-flag text-lg" :class="typeMapping[type]"></i>
        </div>
    </div>
</template>

<script>
export default {
    props : {
        condition : {
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
                warning : 'text-yellow-500 font-medium',
                danger  : 'text-red-500 font-medium'
            }
        }
    }
}
</script>
