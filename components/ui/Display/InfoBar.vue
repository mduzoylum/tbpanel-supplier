<template>
   <div class="fixed bg-slate-600 text-gray-100 left-0 right-0 m-auto h-10 z-40 px-4 " :class="[position == 'top' ? 'top-0' : 'bottom-0']" v-if="visible">
        <div class="flex h-full items-center w-full justify-between"> 
            <div class="flex items-center">
                <i class="la la-info-circle mr-2"></i>
                <p class="text-xs">
                    {{  message  }}
                </p>
            </div>
            <button class="float-right font-medium text-lg" @click="visible = false">
                <i class="la la-times"></i>
            </button>
        </div>
    </div>
</template>

<script> 
export default {
    props: {
        message : {
            type : String,
            default : ''
        },
        position : {
            type : String,
            default : 'bottom'
        },
    },
    data() {
        return {
            visible : false
        }
    },
    mounted() {
        this.visible = true;
    },
}
</script>