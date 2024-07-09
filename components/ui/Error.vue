<template>
    <div class="flex justify-center mt-4">
        <div class="grid grid-cols-2 w-full  p-4  items-center" :class="{'md:w-1/2' : !basic}">
            <div class="space-y-4">
                <h1 :class="{'text-2xl' : !basic}">{{ title }}</h1>
                <p v-html="message"></p>
            </div>
            <div v-if="!basic">
                <img src="~/assets/img/error-data.svg"/>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    props : {
        title : String,
        message : String,
        basic : {
            type : Boolean ,
            default : false
        }
    },
    data(){
        return {
            classMap : {
                
            }
        }
    }
}
</script>
