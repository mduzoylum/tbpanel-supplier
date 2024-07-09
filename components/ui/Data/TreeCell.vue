<template>
    <div class="flex group text-sm" :class="[leftCls]" v-if="data">
        <div class="w-6" @click="toggleChildren(data)">
            <i class="la la-angle-right " v-if="data.isChild == 1 && hasOpened == false && !loader"></i>
            <i class="la la-spinner animate-spin" v-if="loader"></i>
            <i class="la la-angle-down" v-if="hasOpened && data.isChild == 1"></i>
        </div>
        <div>
            {{ data.name }}
            <a :href="$url+'/'+data.seoLink" target="_blank" class="opacity-0 group-hover:opacity-100" ><i class="la la-link"></i></a>
        </div>
    </div>
</template>

<script>
export default {
    props : {
        item : {
            type : Object,
            default : () => {}
        },
    },
    data() {
        return {
            hasOpened : false,
            loader : false,
            childrenCount : 0 ,
            data : null
        }
    },
    computed : {
        leftCls(){
            if(this.data.level < 1) {
                return ''
            }
            return 'ml-'+ (this.data.level * 4)
        }
    },
    watch : {
        item : {
            handler : function(val){
                this.data = val;
            },
            deep : true
        }
    },
    methods : {

        toggleChildren(data){
            if(this.hasOpened){
                this.closeChildren();
            }else{
                this.openChildren(data.level ||0);
            }
        },

        openChildren(level = 0){

            this.loader = true;
            let url = '/api/v1/admin/catalog/category?filter=' + encodeURIComponent(JSON.stringify({ parentCategoryId: { eq: this.data.id} }));
            this.$apiFetch(url).then(res => {
                res.data.map(item => {
                    item['level'] = level + 1;
                })
                this.data.children = res.data;
                this.childrenCount = res.data.length;
                this.$emit('open', this.data);
                this.hasOpened = true;
            }).finally(() => {
                this.loader = false;
            });
        },

        closeChildren(){
            this.$emit('close', this.data,this.childrenCount)
            this.hasOpened = false;
        },
    },
    mounted(){
        this.data = this.item;
    }
 }
</script>
