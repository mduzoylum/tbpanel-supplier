<template>
    <div class="w-full">
        <div v-if="this.mode == 'dragdrop'"
            class="mt-1 flex justify-center  border-2 h-40  border-dashed rounded-md w-full"
            @dragover="dragover" @dragleave="dragleave" @drop="drop">
            <div class="space-y-1 text-center overflow-y-auto">
                <input type="file" :id="itemId" multiple name="files[]"
                    class="w-px h-px opacity-0 overflow-hidden absolute" @change="onChange" :ref="itemId"
                    accept=".pdf,.jpg,.jpeg,.png" />
                <div v-if="!hasImage || multiple" class="px-6 pt-10 pb-6">
                    <i class="la la-image text-3xl"></i>
                    <div class="flex text-sm text-gray-600">
                        <label :for="itemId" class="relative cursor-pointer  rounded-md  mt-2 ">
                            <span class="font-medium">{{  $t('admin_main.add_image') }}</span>
                            <span class="block text-xs text-gray-400">
                                {{ $t('admin_main.upload_image_msg')}}
                            </span>
                        </label>
                    </div>
                </div>
                <img  :src="previewUrl" v-if="hasImage && multiple == false" />

            </div>
        </div>
        <div class="my-1 text-sm justify-between w-full flex" v-if="hasImage && mode != 'select' && !multiple">
            <label :for="itemId" class="bg-gray-50 border p-1.5 cursor-pointer">
                <i class="la la-edit mr-1"></i>
                {{ $t('admin_main.update_image')}}
            </label>
           <!-- <button @click="$refs.edit_picture.show()" class="bg-gray-50 border p-1.5">
                <i class="la la-cog mr-1"></i>
                {{ $t('admin_main.edit_image')}}
            </button>
            -->
        </div>
        <div v-if="this.mode == 'dragdrop' && multiple && filelist.length > 0" class="mt-5">

            <dd class="mt-1 text-sm text-gray-900">
                <ul role="list" class="border border-gray-200 rounded-md divide-y divide-gray-200">
                    <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                        v-for="(file, index) in filelist" :key="index">
                        <div class="w-0 flex-1 flex items-center">
                            <svg class="flex-shrink-0 h-5 w-5 text-gray-400"
                                x-description="Heroicon name: solid/paper-clip" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd"
                                    d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            <span class="ml-2 flex-1 w-0 truncate">
                                {{ file.name }}
                            </span>
                        </div>
                        <div class="ml-4 flex-shrink-0">
                            <button class="font-medium text-blue-600 hover:text-blue-500" @click="upload(file, index)">
                                {{ $t('admin_main.upload') }}
                            </button>
                        </div>
                    </li>
                </ul>
            </dd>
        </div>
        <div v-if="mode == 'select'">
            <label class="block ">
              <button @click="this.$refs[this.itemId].click()" class="dark:bg-slate-400 dark:border-gray-600  text-center text-xs text-gray-500 mr-4 py-1 px-4 rounded-md shadow-md font-normal bg-gray-50 border border-gray-200 text-gray-700 cursor-pointer hover:bg-gray-200 focus:outline-none">
                <UiSpinner v-if="uploading" class="text-black float-left"></UiSpinner>
                {{ $t('choose_file')}}
              </button>
                <input
                    type="file"
                    name="files[]"
                    @change="onChange"
                    :ref="itemId"
                    class="hidden block w-full text-xs text-gray-500 file:mr-4 file:py-1 file:px-4 file:rounded-md file:shadow-md file:text-xs file:font-normal file:bg-gray-50 file:border file:border-gray-200 file:text-gray-700 file:cursor-pointer hover:file:bg-gray-200 focus:outline-none" />
            </label>
        </div>
        <div>
            <UiDrawer ref="edit_picture" :title="$t('admin_main.edit_picture')">
                <div class="flex flex-col gap-3 text-sm">
                    <div class="grid grid-cols-4 items-center">
                        <label class="col-span-2">{{ $t('admin_main.resize_picture') }}</label>
                        <input type="checkbox" v-model="edit_picture_state.resize"
                            class=" col-span-2 border-slate-300 text-yellow-500  cursor-pointer rounded-sm">
                    </div>
                    <div class="grid grid-cols-4 items-center">
                        <label class="col-span-2">{{ $t('admin_main.picture_width') }}</label>
                        <input type="number" v-model="edit_picture_state.width"
                            class="col-span-2 rounded-md text-md xs:text-sm border-gray-100 h-5/6 text-center">
                    </div>
                    <div class="grid grid-cols-4 items-center">
                        <label class="col-span-2">{{ $t('admin_main.picture_height') }}</label>
                        <input type="number" v-model="edit_picture_state.height"
                            class="col-span-2 rounded-md text-md xs:text-sm border-gray-100 h-5/6 text-center">
                    </div>
                    <div class="grid grid-cols-4 items-center">
                        <label class="col-span-2">{{ $t('admin_main.force_sizing') }}</label>
                        <input type="checkbox" v-model="edit_picture_state.force"
                            class="col-span-2 border-slate-300 text-yellow-500  cursor-pointer rounded-sm">
                    </div>
                    <div class="grid grid-cols-4 items-center">
                        <label class="col-span-2">{{ $t('admin_main.aspect_ratio') }}</label>
                        <input type="checkbox" v-model="edit_picture_state.aspect_ratio"
                            class="col-span-2 border-slate-300 text-yellow-500  cursor-pointer rounded-sm">
                    </div>
                    <button @click="() => $emit('setConfig', edit_picture_state)" :class="['bg-'+$color+'-500']"
                        class="block mt-3 py-2 px-4 rounded-md  text-white p-1 ">{{ $t('admin_main.save_settings')
                        }}</button>
                </div>
            </UiDrawer>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        api: {
            type: String
        },
        multiple: {
            type: Boolean,
            default: false
        },
        itemId: {
            type: String,
            default: ''
        },
        mode: {
            type: String,
            default: 'select'
        },
        config: {
            type: Boolean,
            default: false
        },
        modelValue : {
            type : [Object,File,Array],
            default : []
        },
        initValue : {
            type :String
        }
    },
    data() {
        return {
            previewUrl : null,
            uploading:false,
            filelist: [],
            edit_picture_state: {
                resize: false,
                force: false,
                aspect_ratio: false,
                width: '',
                height: '',
            }
        }
    },
    computed:{
        hasImage(){
            return this.filelist.length > 0 || this.previewUrl != null
        }
    },
    methods: {
        onChange() {
            if (this.multiple) {
                this.filelist = [...this.$refs[this.itemId].files];
            } else {
                this.filelist = [this.$refs[this.itemId].files[0]];
            }

            this.previewUrl = URL.createObjectURL(this.filelist[0]);
            this.$emit('update:modelValue',this.filelist.length == 1 ? this.filelist[0] : this.filelist );

        },
        remove(i) {
            this.filelist.splice(i, 1);

            if(this.filelist.length == 0) {
              this.$refs[this.itemId].value=''
            }
        },
        dragover(event) {
            event.preventDefault();
            if (!event.currentTarget.classList.contains('bg-teal-50')) {
                event.currentTarget.classList.remove('bg-gray-100');
                event.currentTarget.classList.add('bg-teal-50');
            }
        },
        dragleave(event) {
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-teal-50');
        },
        drop(event) {
            event.preventDefault();
            this.$refs[this.itemId].files = event.dataTransfer.files;
            this.onChange();
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-teal-50');
        },
        upload(file) {
            this.$emit('upload', file, this.itemId)
            this.filelist.splice(this.index, 1);
        }

    },
    mounted() {
        if(this.initValue){
            this.previewUrl = this.$url +'/'+ this.initValue
        }

    }
}
</script>