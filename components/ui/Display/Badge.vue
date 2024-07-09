<template>
    <span v-if="value == 1" class="px-2 inline-flex text-xs leading-5  rounded-md bg-emerald-100 text-green-800">
        {{ $t('general.active')}}
    </span>
    <span v-if="value == 0" class="px-2 inline-flex text-xs leading-5 rounded-md bg-red-100 text-red-800">
        {{ $t('general.passive')}}
    </span>
</template>

<script>
export default {
    props : ['value']
}
</script>
