<template>
    <div>
        <div class="flex-shrink-0 h-10 w-10" @click="open" v-if="mode == 'thumb'">
            <div class="flex-shrink-0" v-if="!src">
                <span class="inline-flex items-center justify-center h-10 w-10 rounded-lg border dark:border-gray-600">
                    <i class="la la-image"></i>
                </span>
            </div>
            <img class="h-10 w-10 rounded-md" v-if="src" :src="$url+'/'+src" alt="">
        </div>

        <div class="relative" v-if="mode == 'icon'" >
            <button class="focus:outline-none" @click="open">
                <i class="la la-image text-xl" :class="{'text-green-500 font-medium': src , 'text-gray-400' : !src}"></i>
            </button>
        </div>
       
        <UiModal ref="modal" size="medium" v-if="entity != 'product'">
            <div>
                <UiFormUpload mode="dragdrop" itemId="upimg"  v-model="file" :initValue="src"></UiFormUpload>
            </div>
            
            <template #actions>
                <div class="flex justify-end" v-if="file">
                    <UiButtonSave @save="upload" :saving="loader" ></UiButtonSave>
                </div>
            </template>
        </UiModal>

        <UiModal ref="modal" size="large" v-if="entity == 'product'" >
            <div v-if="entity == 'product'">
                <ProductImage :productId="item.id"></ProductImage>
            </div>
        </UiModal>
    </div>
</template>

<script>

export default {
    props : {
        item : {
            type : Object,
            required : true
        },  
        resource : {
            type : String,
            required : true
        },
        param : {
            type : String,
            default : 'image1'
        },
        mode : {
            type : String,
            default : 'thumb' // icon , thumb
        },
        entity : {
            type : String,
            default : 'default' // product 
        }
    },
    data() {
        return {
            src : null,
            file : null,
            loader : false
        }
    },
    methods : {

        open() {
            if(!this.resource) return;
                this.$refs.modal.show()
        },

        upload() {

            if(!this.file) return;

            this.loader = true
            let url = this.$url+this.resource+'/'+this.item.id;
            let formData = new FormData();
            
            formData.append(this.param, this.file);
            formData.append('_method', 'PUT');

            this.$apiFetch(url,{
                method : 'POST',
                body : formData
            }).then(res => {
               // this.src = res.data
                this.$refs.modal.hide()
                this.$emit('upload')
            }).finally(()=>{
                this.loader = false
            })
        }
    },
    mounted() {
        this.src = getImage(this.item)
    },
}
</script>
