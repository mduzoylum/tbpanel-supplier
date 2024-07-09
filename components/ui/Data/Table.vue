<template>
  <div>
    <div class="flex flex-col">
      <div v-if="!hideTitle">
        <UiDataHeader
            :title="title"
            :config="config"
            :titleIcon="titleIcon" v-if="!noheader && !error.license"
            :size="size=='xsmall'?'small' : 'default'"
            @events="actions">
          <template #actions>
            <slot name="actions"></slot>
          </template>
        </UiDataHeader>
        <slot name="filter"></slot>
      </div>
      <div class=" bg-white dark:bg-slate-800 shadow rounded-md  overflow-hidden border border-gray-200 dark:border-gray-600" v-if="!error.license">
        <div class="-my-2 overflow-x-auto ">
          <UiEmpty v-if="!hasData && loader == false" :button="true"/>
          <div class="py-2 align-middle inline-block min-w-full " v-if="loader">
            <UiLoader noborder/>
          </div>
          <div class="py-2 align-middle inline-block min-w-full" v-show="hasData">
            <div class=" overflow-hidden  ">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-600 " v-if="loader == false">
                <thead class="bg-gray-50 dark:bg-slate-800 dark:text-slate-400 ">
                <tr class="cursor-pointer h-10">
                  <td class="text-center px-3" v-if="config.indexable">
                    #
                  </td>
                  <th class="px-2 text-center " :class="[size=='xsmall'?'w-7':'w-14']" v-if="config.selectable">
                    <input type="checkbox"
                           class="border-slate-300 text-yellow-500 focus:outline-none focus:ring-0 dark:bg-slate-400 dark:text-slate-400 "
                           @change="setSelection"/>
                  </th>
                  <th v-if="config.actions && config.actions.length > 0"
                      :class="sizeOpts[size].padding"
                      class="text-sm font-medium tracking-wider text-right w-10">

                  </th>
                  <th :title="column.title || column.label" v-show="!column.hidden"
                      v-for="(column, index) in config.columns" :key="index"
                      class="border-l first:border-0 dark:border-0 text-left text-sm font-medium  tracking-wider"
                      :class="[sizeOpts[size].padding, sizeOpts[size].font]">
                    <div :class="column?.class"
                         class="whitespace-nowrap overflow-hidden flex">
                      <span> {{ column.label }}</span>
                      <button v-if="column?.sortable" @click="setSortSetting(column.sortable)"
                              class="ml-1">
                        <UiIconsSort v-if="column.sortable != sort.column && sort.column !=  '-' + column.sortable" class="w-1.5"/>
                        <UiIconsDown v-if="sort.column == column.sortable" class="w-2"/>
                        <UiIconsUp v-if="sort.column == '-' + column.sortable" class="w-2"/>
                      </button>
                    </div>
                  </th>
                  <th v-if="config.actions && config.actions.length > 0"
                      :class="sizeOpts[size].padding"
                      class="text-sm font-medium text-gray-600  tracking-wider text-right">
                    #
                  </th>
                </tr>
                </thead>
                <tbody class="bg-white  divide-y divide-gray-200 dark:divide-gray-600 dark:bg-slate-800 dark:text-slate-200">
                <tr v-for="(item, index) in data[mapping.data]" @click="rowClick(item, index)" :key="index" class="cursor-pointer hover:bg-orange-50 dark:hover:bg-slate-700 group"
                    :class="{ 'bg-orange-50 dark:bg-slate-700': selectedRowId && selectedRowId == item.id }">
                  <td class=" text-center text-gray-600 px-3" v-if="config.indexable">
                    {{ index + 1 }}
                  </td>
                  <td class="text-center" :class="{'p-0':size=='xsmall'}" v-if="config.selectable">
                    <input type="checkbox" class="border-slate-300 text-yellow-500 focus:outline-none focus:ring-0 dark:bg-slate-400 " v-model="selected" :value="item"/>
                  </td>
                  <td v-if="config.actions && config.actions.length > 0"
                      :class="sizeOpts[size].padding"
                      class=" whitespace-nowrap text-right text-sm font-medium rtl:text-left  w-10">
                    <div class="flex justify-start md:space-x-1">
                      <UiDataAction v-for="(action, actIndex) in config.actions" v-show="action?.location == 'left'" :key="actIndex" :action="action" :item="item" :index="index" @delete="remove"></UiDataAction>
                    </div>
                  </td>

                  <UiDataCell v-for="(column, subindex) in config.columns"
                              :api="api"
                              :key="subindex"
                              :column="column"
                              :item="item"
                              :rowIndex="index"
                              :class="[sizeOpts[size].padding,sizeOpts[size].height]"
                              @update="get"
                              @openTree="openTree"
                              @closeTree="closeTree"
                  >
                    <template #[column.slot]>
                      <slot :name="column.slot" v-bind="item"></slot>
                    </template>
                  </UiDataCell>

                  <td v-if="config.actions && config.actions.length > 0"
                      :class="sizeOpts[size].padding"
                      class=" whitespace-nowrap text-right text-sm font-medium  rtl:text-left  ">
                    <div class="flex md:space-x-1 justify-end ">
                      <UiDataAction v-for="(action, actIndex) in config.actions" v-show="!action.location" :key="actIndex" :action="action" :item="item" :index="index" @delete="remove"></UiDataAction>
                    </div>
                  </td>
                </tr>

                </tbody>
              </table>
            </div>

            <UiPagination v-if="hasData && data.paging && data.paging.total > data.paging.limit"
                          ref="pagination"
                          class="p-2"
                          :data="data.paging" @change="get" v-model="currentPage"
                          :size="size =='xsmall' ? 'small' :'default' "
            />
          </div>
        </div>
      </div>
    </div>

    <UiConfirm ref="cleaner"/>
    <UiNotification ref="notification"></UiNotification>
    <UiModal ref="alert"/>
    <UiDataStickyAction v-if="selected.length > 0 && hasSticky " :count="selected.length">
      <div class="flex space-x-1 lg:space-x-2 items-center justify-center h-full">
        <UiDataAction v-for="(action, actIndex) in config.actions" v-show="action.location == 'sticky'" :key="actIndex" :action="action" :item="item" :index="index" @delete="remove"></UiDataAction>
      </div>
    </UiDataStickyAction>
    <UiDataSetting :config="config" :name="name" ref="table_setting"></UiDataSetting>
  </div>
</template>

<script>

export default {
  props: {
    name: String,
    title: String,
    titleIcon: String,
    hideTitle: {
      type: Boolean,
      default: false
    },
    api: String,
    local: Object,
    apiOpts: {
      type: Object,
      default: {
        method: 'POST',
      }
    },
    config: {
      type: Object,
      default: {
        columns: [],
        actions: [],
        selectable: true,
        searchable: false,
        deletable: true,
      }
    },
    size: {
      type: String,
      default: 'big'
    },
    noheader: {
      type: Boolean,
      default: false
    },
    mapping: {
      type: Object,
      default: {
        data: 'data',
        total: 'total'
      }
    },
    autoload: {
      type: Boolean,
      default: true,
    }
  },
  emits: ['rowClick', 'selectedChange'],
  data() {
    return {
      url: this.api,
      error: {
        license: false
      },
      data: {},
      loader: false,
      limit: 10,
      sort: {
        column: '-id',
      },
      sizeOpts: {
        big: {
          padding: 'px-6 p-2 2xl:py-3',
          font: 'text-sm',
        },
        medium: {
          padding: 'px-1.5 py-1.5 2xl:px-2 2xl:py-2',
          font: 'text-xs',
        },
        small: {
          padding: 'px-2 py-1',
          font: 'text-xs',
        },
        xsmall: {
          height: 'h-[25px]',
          padding: 'px-1',
          font: 'text-[12px]',

        }
      },
      selected: [],
      selectedRowId: null,
      requestBody: {},
      currentPage: 1,
    }
  },
  computed: {
    hasData() {
      return this.data[this.mapping.data] && this.data[this.mapping.data].length > 0
    },
    hasSticky() {
      return this.config.actions && this.config.actions.filter(action => action.location == 'sticky').length > 0
    }
  },
  methods: {

    async get(page = null) {

      let self = this;
      let query = new URL(this.$url + '/' + this.url);

      if (page !== null) {
        query.searchParams.set('page', page);
        if (page == 1) {
          self.start = 0;
        } else {
          self.start = (page - 1) * self.limit;
        }
        query.searchParams.set('start', self.start);
      }

      query.searchParams.set('sort', this.config.sort || this.sort.column);
      query.searchParams.set('limit', this.config.limit || this.limit);
      query.searchParams.set('search', this.requestBody.search ?? '');

      let url = query.pathname + query.search;

      this.loader = true;

      const options = {
        method: this.apiOpts.method,
      };

      if (this.apiOpts.method === 'POST') {
        options.body = JSON.stringify(this.requestBody);
      }

      try {
        this.data = await this.$apiFetch(url, options);
      } catch (e) {
        if (e.data.error) {
          this.$emit('status', {'status': false})
        }
        if (e.data.message) {
          if (e.data.message.includes('Lisans')) {
            this.error.license = true;
          }
        }
      }

      if (!this.data.paging) {
        this.data.paging = {
          total: this.data[this.mapping.total],
          limit: this.data.limit || 10,
        }
      }

      this.loader = false;
      this.requestBody = {}
      this.selected = [];
    },

    remove(item) {
      let self = this;
      this.$refs.cleaner.confirm(item, function (id) {
        this.$apiFetch(`${this.$url}/${self.api.split("?")[0]}/${id}`, {method: 'DELETE'}).then((r) => {
          if (r.success) {
            self.$refs.notification.success(self.$t('general.delete_successful'));
            self.get();
          }
        }).catch((e) => {
          self.$refs.notification.error(e.data.message);
        })
      });
    },

    removeAccount(item) {
      let self = this;
      this.$refs.cleaner.confirm(item, function (id) {
        const urlParts = self.api.split("?");
        const baseUrl = urlParts[0];
        const queryParams = new URLSearchParams(urlParts[1]);
        const apiUrl = `${baseUrl}/${id}?${queryParams.toString()}`;

        this.$apiFetch(`${apiUrl}`, {method: 'DELETE'}).then((r) => {
          if (r.success) {
            self.$refs.notification.success(self.$t('general.delete_successful'));
            self.get();
          }
        }).catch((e) => {
          self.$refs.notification.error(e.data.message);
        })
      });
    },

    rowClick(item, index) {
      if (!this.config.selectable) {
        this.selectedRowId = item.id;
        this.$emit('rowClick', {item, index})
      }
    },

    actions(action, params) {

      switch (action) {

        case 'reload':
          this.get();
          break;

        case 'search':

          if (!this.config.searchable) {
            return;
          }

          this.currentPage = 1;
          this.requestBody.search = params;
          this.get()
          break;

        case 'filter':


          this.currentPage = 1;
          this.requestBody = {...params, ...this.requestBody}
          this.get()
          break;

        case 'setting':
          this.$refs.table_setting.show();
          break;

        case 'remove':
          if (this.selected.length == 0) {
            this.$refs.alert.error(this.$t('admin_main.warning'), this.$t('admin_main.select_one'));
            return;
          }
          this.$refs.cleaner.confirm(null, () => {
            for (let item of this.selected) {
              this.$apiFetch(`${this.$url}/${this.api}/${item.id}`, {method: 'DELETE'}).then((r) => {
                if (r.status) {
                  this.$refs.notification.success(this.$t('general.delete_successful'));
                  this.get()
                }
              });
            }
          })
          break;

        case 'export' :
          this.export()
          break;

      }
    },

    setSelection() {
      if (this.selected.length == this.data[this.mapping.data].length) {
        this.selected = [];
      } else {
        this.selected = this.data[this.mapping.data];
      }
    },

    getSelection() {
      return this.selected;
    },

    setSortSetting(key) {

      if (this.sort.column == key) {
        this.sort.column = (this.sort.column.substr(0, 1) == '-' ? '' : '-') + key;
      } else {
        this.sort.column = key;
      }
      this.get();
    },

    setVisibleSetting(cols) {
      this.config.columns = cols;
    },

    filter(filter) {
      if (filter == null) {
        this.url = this.api;
        return this.get();
      }

      this.actions('filter', filter);
    },

    // tree column

    openTree(item) {
      let index = this.data[this.mapping.data].findIndex(i => i.id == item.id)
      this.data[this.mapping.data].splice(index + 1, 0, ...item.children)
    },

    closeTree(item, delCnt) {
      let index = this.data[this.mapping.data].findIndex(i => i.id == item.id)
      this.data[this.mapping.data].splice(index + 1, delCnt);
    },

    export() {

      let arrData = this.data[this.mapping.data];
      let columns = this.config.columns;

      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += [
        columns.map(i => i.label).join(";"),
        ...arrData.map(item =>
            columns.map(i => item[i.index]).join(";")
        )
      ]
          .join("\n")
          .replace(/(^\[)|(\]$)/gm, "");

      const data = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", data);
      link.setAttribute("download", (this.name || 'export') + ".csv");
      link.click();
    }

  },
  watch: {
    selected() {
      this.$emit('selectedChange', this.selected)
    },
    local: {
      handler() {
        this.data = this.local;
      },
      deep: true
    }
  },

  mounted() {
    if (!this.autoload) {
      return
    }

    if (!this.local) {
      this.get();
    } else {
      this.data = this.local;
    }
  },
}
</script>
