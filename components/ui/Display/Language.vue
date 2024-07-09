<template>
     <img :src="$url+'/lang/'+language+'/'+language+'.png'" class="w-4"/>
</template>

<script>

export default {
    props: {
        language: {
            type: String,
            required: true
        }
    }
}
</script>