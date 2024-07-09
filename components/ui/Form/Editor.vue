<template>
  <div :class="{'simple-editor' : basic}">
    <UiLoader v-if="loader"></UiLoader>
    <textarea v-show="!loader" :id="id" :value="modelValue" @input="updateValue"></textarea>
  </div>
</template>

<script>

export default {
  props: {
    modelValue: '',
    id: {
      type: String,
      default: 'default'
    },
    basic: {
      type: Boolean,
      default: false,
    },
   
  },
  data() {
    return {
      loader : false,
      darkMode: false,
      simple: {
        toolbar: ' bold underline  alignleft aligncenter  forecolor link ',
        plugins: 'code link  advlist lists'
      },
      pro: {
        toolbar: ' bold italic underline | blocks fontsize | alignleft aligncenter alignjustify | outdent indent |  numlist bullist | forecolor backcolor | fullscreen preview ',
        plugins: 'preview  directionality code fullscreen image link media table advlist lists'
      }
    }
  },
 
  methods: {

    updateValue(content) {
      this.$emit('update:modelValue', content);
    },

    selectFile(file) {
      let url = file.url || file.thumb;
      if (url) {
        this.$editor.activeEditor.insertContent('<img  src="' + url + '"/>');
      }
      this.$refs.fileexplorer.hide();
    },
    
    loadEditor() {

      const self = this;

      this.$editor.init({
        selector: 'textarea#' + self.id,
        language: localStorage.getItem('store-language') || 'tr',
        plugins: self.basic ? self.simple.plugins : self.pro.plugins,
        menubar: self.basic ? false : 'file edit view insert format tools table help',
        statusbar: self.basic ? false : true,
        toolbar: self.basic ? self.simple.toolbar : self.pro.toolbar,
        height: self.basic ? 200 : 500,
        skin: self.darkMode ? 'oxide-dark' : 'small',
        content_css: self.basic ? 'default' : `${self.$url}/srv/compressed/load/v5/css/1/0.css?v=1659096184`,
        document_base_url: self.$url,
        toolbar_mode: 'sliding',
        forced_root_block: "div",

        setup: (editor) => {

          editor.on('init', function (e) {
            self.$editor.get(self.id).setContent(self.modelValue);
          });

          editor.on('change', function (e) {
            self.updateValue(self.$editor.get(self.id).getContent());
          });

        }
      });
    }
  },
  mounted() {

      this.$editor.get(this.id)?.destroy();
      this.loader = true;

      const self = this;
      setTimeout(()=> {
          this.$editor.get(this.id)?.destroy();
          self.loadEditor();
          self.loader = false;
      },500);
  },
 
}

</script>