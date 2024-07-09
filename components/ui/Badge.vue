<template>
    <span v-if="condition == 1" class="px-2 inline-flex text-xs leading-5  rounded-md bg-emerald-100 text-green-800 dark:text-gray-800">
        {{ $t('general.active')}}
    </span>
    <span v-if="condition == 0" class="px-2 inline-flex text-xs leading-5 rounded-md bg-red-100 text-red-800 dark:text-gray-800">
        {{ $t('general.passive')}}
    </span>
</template>

<script>
export default {
    props : ['condition']
}
</script>
