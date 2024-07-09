<template>
    <div class="flex justify-center mt-4 dark:text-slate-400">
        <div class="grid grid-cols-2 w-full md:w-1/2 p-4  items-center">
            <div class="space-y-4">
                <h1 class="text-2xl">{{ $t('warning')}}</h1>
                <p>{{ $t('empty_msg')}}</p>
            </div>
            <div>
                <img src="~/assets/img/empty-data.svg"/>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    props : ['button'],
    data () {
        return {
            type : 'any'
        }
    },
    mounted(){
        this.type = this.$route.name;
    }
}
</script>
