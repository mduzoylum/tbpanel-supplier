<template>
    <div class="flex">
        <UiIconsEdit @edit="action.event(item, index)" v-if="isEdit"></UiIconsEdit>
        <UiIconsDelete :class="['text-'+$color+'-500']" @click="$emit('delete',item.id)" v-if="isDelete"></UiIconsDelete>
        <button v-if="!isDelete && !isEdit"
            :title="action?.tooltip"
            v-show="!action.visibleIndex || item[action.visibleIndex] == action.visibleValue"
            @click="action.event(item, index)"
            v-bind="action"
            :class="[cls[action.location || 'right']]">
            <i :class="[action.location == 'left' ? 'text-lg' : '' , action.icon]" ></i>
            <span class="pl-2 hidden md:block" v-if="action.label">{{ action.label }} </span>
        </button>
    </div>

</template>

<script >
export default {
    props : {
        item : {
            type : Object,
            required : true
        },
        action : {
            type : Object,
            required : true
        },
        index : {
            type : Number,
            required : true
        }
    },
    computed : {
        isEdit() {
            return this.action.action == 'edit'
        },
        isDelete() {
            return this.action.action == 'delete'
        }
    },
    data() {
        return {
            cls : {
                left :  'inline-flex items-center px-1.5 rtl:ml-2 font-medium rounded text-yellow-500  focus:outline-none',
                right : 'inline-flex items-center p-1.5 rtl:ml-2 border border-slate-300 dark:border-0 shadow-sm font-medium rounded text-gray-600 bg-gray-50 hover:bg-gray-100 dark:bg-slate-800 dark:text-slate-400 focus:outline-none',
                sticky : 'border-gray-300 px-4 h-8 flex items-center border  text-stone-50  text-sm rounded-md  cursor-pointer  ',
            }
        }
    },
}
</script>