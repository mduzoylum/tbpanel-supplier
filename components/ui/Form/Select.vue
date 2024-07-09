<template>
    <Listbox as="div" v-model="selected" v-if="selected">
        <div class=" relative">
            <ListboxButton :class="{'border border-gray-200 shadow-sm pl-3  py-2 ' : basic !== true }" class="bg-white dark:bg-slate-400 dark:border-gray-600 relative w-full  rounded-md pr-10 text-left cursor-default focus:outline-none sm:text-sm">
                <span class="block truncate text-gray-900 dark:text-white">{{ getLabelColumn(selected) }}</span>
                <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <UiIconsDown></UiIconsDown>
                </span>
            </ListboxButton>

            <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
               
                <ListboxOptions class="dark:bg-slate-400 absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm">
                    <ListboxOption as="template" v-for="item in data" :key="item[valueKey || 'id']" :value="item" v-slot="{ active, selected }" >
                        <li :class="[active ? 'text-white bg-yellow-500' : 'text-gray-900', 'cursor-pointer select-none relative py-2 pl-3 pr-9']">
                            <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                                {{ getLabelColumn(item) }}
                            </span>          
                        </li>
                    </ListboxOption>
                </ListboxOptions>
               
            </transition>
        </div>
  </Listbox>
</template>

<script>

import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'


export default {
    components: {
        Listbox,
        ListboxButton,
        ListboxLabel,
        ListboxOption,
        ListboxOptions,
    },
    props : ['api','config' ,'modelValue','options','textKey', 'valueKey','basic'],
    data (){

        return {
            data : [],
            selected : null,
        }
    },

    watch : {
        selected(newValue, o){
            this.$emit('update:modelValue',newValue[this.valueKey || 'id']);
            if(o != null) {
                this.$emit('change',newValue[this.valueKey || 'id']);
            }
        },
        modelValue (newValue){
            if(newValue != 0 && this.data.length > 0){
                this.getSelected();
            }
        },
        options() {
          this.get();
        }
    },
    methods: {

        async get(url = null) {

           if(!this.options){
                let response  = await this.$apiFetch(url || this.api);
                this.data = response.data ? response.data : response;
           }else{
                this.data = this.options;
           }
           this.getSelected();
        },

        getLabelColumn(item){
            if(typeof item != 'object'){
                return item;
            }
            return item[this.textKey || 'name'] || this.$t('general.select')
        },

        getSelected(){
            let self = this;
           
            let found =  this.data.filter(function(a){ return a[self.valueKey || 'id'] == self.modelValue });
            if(found.length > 0 ){
                this.selected = found[0];
            } else {
                this.selected = { 'name' : this.$t('general.select') , 'id' : 0};
            }
        }
        
    },
    mounted(){
        this.get();
    }
}
</script>
