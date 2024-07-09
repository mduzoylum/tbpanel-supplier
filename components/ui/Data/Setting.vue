<template>
    <UiDrawer ref="table_setting" :title="$t('admin_block_management.view')">
        <fieldset>
            <div class="mt-4">
                <div class="relative flex items-start py-2.5 hover:bg-gray-50 cursor-pointer"
                    v-for="(column, index) in config.columns" :key="index">
                    <div class="min-w-0 flex-1 text-sm">
                        <button class="px-1 text-gray-300">
                            <i class="la la-braille text-base"></i>
                        </button>
                        <label :for="'column_' + index" class="font-medium text-gray-700 dark:text-slate-400 select-none">{{
                                column.label
                        }}</label>
                    </div>
                    <div class="ml-3 flex items-center h-5">
                        <button class="text-base dark:text-slate-300" @click="setColumnSetting(index, config.columns[index].hidden)">
                            <i class="la"
                                :class="{ 'la-eye font-medium': !config.columns[index].hidden, 'la-eye-slash': config.columns[index].hidden }"></i>
                        </button>
                    </div>
                </div>
            </div>
        </fieldset>
    </UiDrawer>
</template>

<script>
export default {
    props : {
        config : {
            type : Object,
            required : true
        },
        name : {
            type : String,
            default : null
        }
    },
    methods : {

        getColumnSetting() {

            if (!this.name) {
                return false;
            }

            let columnSettings = localStorage.getItem(this.name);
            if (columnSettings !== null) {
                columnSettings = JSON.parse(columnSettings);
                for (let i = 0; i < columnSettings.length; i++) {
                    this.config.columns[i].hidden = columnSettings[i].hidden;
                }
            }
            this.$emit('change', this.config.columns);
        },

        setColumnSetting(index, value) {

            if (!this.name) {
                return false;
            }

            this.config.columns[index].hidden = !value;
            this.$emit('change', this.config.columns);
            localStorage.setItem(this.name, JSON.stringify(this.config.columns));
        },

        show(){
            this.$refs.table_setting.show();
        }
    },
    mounted() {
        this.getColumnSetting();
    }
}
</script>