<template> 
    <Menu as="div" class="relative inline-block text-left">
        <div>
            <MenuButton class="inline-flex w-full justify-center rounded-md  px-4 py-2 focus:outline-none" :class="titleClass">
            <span class="hidden sm:block ltr:mr-1 rtl:ml-1">{{ title }}</span>
             <i class="mt-1 la" :class="iconClass"></i>
            </MenuButton>
        </div>
        <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
        >
            <MenuItems  class="absolute ltr:right-0 rtl:left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg z-10 focus:outline-none">
                <div class="px-1 py-1"  v-if="items" >
                    <MenuItem v-slot="{ active }" v-for="(item,index) in items" :key="index">
                        <button @click="click(item)" :class="[active ? 'bg-gray-50' : 'text-gray-900', 'group flex rtl:justify-start items-center rtl:flex-row-reverse w-full rounded-md px-2 py-2 text-xs']">
                            <slot name="icon" v-bind="item" ></slot>
                            <i class="la mr-2 text-yellow-500" :class="item.icon || itemIconClass" v-if="!$slots.icon"></i>
                            {{ item.label }}
                        </button>
                    </MenuItem>
                </div>
                <div class="px-1 py-1" v-if="!items" >
                    <slot></slot>
                </div>
            </MenuItems>
        </transition>
    </Menu>
</template>

<script>
  import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
  export default {
    props : {
        items : Array,
        title : String ,
        titleClass : {
            type : String,
            default : ' text-sm font-medium  '
        },
        iconClass : {
            type : String,
            default : 'la-angle-down'
        },
        itemIconClass : {
            type : String,
            default : 'la-angle-right'
        }
    },
    components : {
        Menu,MenuItem,MenuItems,MenuButton
    },
    methods:{
        click(item){
            if(item.route) {
                this.$router.push(item.route);
            }else{
                if(!item.action) {
                    this.$emit('action',item)
                }else{
                    this.$emit('itemAction',item)
                }
            }
        }
    }
  }
</script>