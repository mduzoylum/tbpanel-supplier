<template>
     <td v-show="!column.hidden"  class="whitespace-nowrap"  >
        
        <div class="text-sm dark:text-slate-400" :class="column?.class" v-if="column.slot" >
            <slot :name="column.slot" v-bind="item" ></slot>
        </div>

        <div v-if="column.component" :class="column?.class">

            <button v-if="column.component == 'status'" @click="update" :disabled="loader" class="flex">
                <span class="relative flex h-5 w-5 my-1" v-if="loader" >
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-5 w-5 bg-yellow-500"></span>
                </span>
                <UiDisplayStatus  v-if="!loader" :value="item[column.index]" :type="(column.type || '')" :mode="(column.mode || 'status')"></UiDisplayStatus>
            </button>

            <div v-if="column.component == 'inline-editor'" class="text-sm dark:text-slate-400 ">
                <button v-if="!editorActive"  @dblclick="editorActive = !editorActive" >
                     {{  item[column.index] }}
                </button>
                <div v-if="editorActive" class="flex rounded-md shadow-sm  text-xs absolute -mt-2.5">
                    <div class=" flex  focus-within:z-10">
                        <input v-model="item[column.index]" class="block w-10 rounded-none rounded-l-md pl-2  sm:text-sm focus:outline-none border border-slate-300">
                    </div>
                    <button @click="update"  :disabled="loader" type="button" class="relative inline-flex items-center p-1 border border-yellow-500 text-xs  rounded-r-md bg-yellow-500 text-white focus:outline-none">
                        <UiSpinner v-if="loader"  size="small" />
                        <i class="la la-check" v-if="!loader"></i>
                    </button>
                </div>
            </div>
        </div>
        
        <div class="text-sm text-gray-900 dark:text-slate-400" :class="column?.class"   v-if="!column.slot && !column.component" >
            {{ formatter(item[column.index], column,item) }}
        </div>
    </td>
</template>

<script>

export default {
    props: {
        column: {
            type: Object,
            required: true
        },
        item: {
            type: Object,
            required: true
        },
        api: {
            type: String,
            required: false
        },
        rowIndex: {
            type: Number,
            required: false
        }
    },
    data() {
        return {
            loader: false,
            editorActive: false,
            record : null
        }
    },
    methods: {

        formatter(data, column, record = null) {

            if (!column.format) {
                return data;
            }
            switch (column.format) {
                case "price":
                    if (typeof data !== "number")
                        data = Number(data);
                    let currency = record[column.formatValue] || record["currency"] || "TRY";
                    data = this.$n(data, "currency", currency.replace("TL", "TRY"));
                    break;
                case "date":
                    if (Number.isInteger(data)) {
                        data = new Date(data * 1000);
                        return data.getDate() + '.' +  data.getMonth() + '.' + data.getFullYear() + ' ' + data.getHours() + ':' + data.getMinutes();
                    }
                    else {
                      data = new Date(data * 1000);
                      return data.getDate() + '.' +  data.getMonth() + '.' + data.getFullYear() + ' ' + data.getHours() + ':' + data.getMinutes();
                    }
                    break;
            }
            return data;
        },

        update() {

            if (!this.api)
                return;

            this.loader = true;
            this.$apiFetch(`https://${this.$domain}/${this.api.split("?")[0]}/${this.item.id}`, {
                method: "PUT",
                body: {
                    [this.column.index]: this.getData()
                }
            }).then((r) => {
                this.$emit("update");
            }).finally(() => {
                this.loader = false;
                this.editorActive = false;
            });
        },

        getData() {
            if(this.column.component == 'status') {
                return this.item[this.column.index] == 1 ? 0 : 1;
            }
            return this.item[this.column.index];
        },
    },
    mounted() {
        this.record = this.item;
    }
}
</script>