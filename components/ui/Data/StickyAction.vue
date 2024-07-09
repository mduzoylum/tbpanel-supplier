<template>
    <div class="absolute rounded-md bg-zinc-700 text-white left-0 right-0 bottom-10 m-auto h-12 max-w-fit px-4 ">
        <div class="flex items-center h-full ">
            <div class="text-sm mr-4">
                Seçili Kayıtlara Uygula ( {{  count  }} )
            </div>
            <div>
                <slot/>
            </div>
       </div>
    </div>
</template>

<script> 

export default {
    props : ['count']
}
</script>