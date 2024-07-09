<template>
  <div class="sm:gap-4 " :class="[labelPosition == 'left' ? 'flex mt-4 items-center' : 'block']">
    <label class="t-label basis-1/3" :class="[labelPosition == 'top' ? 'mb-1' : '','basis-'+(3 - itemCol)+'/3']">
      <div>
        <slot name="label"/>
        <span v-if="!$slots.label">{{  label }}</span>
      </div>
      <span v-if="tip != null && $i18n.locale == 'tr'" class="text-gray-500 dark:text-slate-400 text-xs block"> {{ tip }}</span>
    </label>
    <div :class="['text-'+itemPosition , 'basis-'+itemCol+'/3']">
      <input :type="type" :maxlength="maxLength" v-model="value" class="t-input border-2 border-gray-200 rounded-md p-2" v-if="['text', 'color', 'date', 'datetime-local', 'password'].includes(type)" :class="[{ 'ring-1 ring-red-500': !valid, 'bg-gray-50': readonly }, inputClass]" :readonly="readonly"/>
      <input type="number"  v-model="value" class="max-w-lg t-input" v-if="type=='number'" @input="checkMinMax" @blur="resetNumberInput" :min="min" :max="max"  :class="[{ 'ring-1 ring-red-500': !valid, 'bg-gray-50': readonly }, inputClass]" :readonly="readonly"/>
      <textarea :maxlength="maxLength" v-model="value" class="t-input" v-if="type=='textarea'" :class="[{ 'ring-1 ring-red-500' : !valid , 'bg-gray-50' : readonly},inputClass]" :readonly="readonly"></textarea>
      <UiFormSwitch v-model="value" v-if="type=='switch'"></UiFormSwitch>
      <UiFormSelect v-model="value" v-if="type=='select' && opt" :options="opt.options" :api="opt.api" :textKey="opt.textKey" :valueKey="opt.valueKey" @selectedOpt="selectedData($event)" ></UiFormSelect>
      <UiFormEditor v-model="value" v-if="type=='editor'" :basic="basic" :config="editorConfig"></UiFormEditor>
    </div>
  </div>
</template>

<script>

export default {
  props : {

    modelValue : {
      type : [String,Number,Boolean,Object,Array],
      default : ''
    },

    type : {
      type : String,
      default : 'text'
    },

    label : {
      type : String,
      default : ''
    },

    labelPosition : {
      type : String,
      default : 'left'
    },

    tip : {
      type : String,
      default : null
    },

    itemCol : {
      type : [String,Number],
      default : 2
    },

    itemPosition : {
      type : String,
      default : 'left'
    },

    valid : {
      type : Boolean,
      default : true
    },

    readonly : {
      type : Boolean,
      default : false
    },

    selectConfig : {
      type : Object,
      default : {
        api : '',
        options : [],
        valueKey : 'id',
        textKey : 'name',
        model : 'object'
      }
    },

    basic : {
      type : Boolean,
      default : false
    },

    min: {
      type : [Number,String]
    },

    max: {
      type : [Number,String]
    },

    inputClass: {
      type : String,
      default : ''
    },

    maxLength: {
      type : [Number,String],
      default : undefined
    },

    editorConfig: {
      type : Object,
      default : () => {}
    }
  },
  data() {
    return {
      value : this.modelValue,
      opt :null
    }
  },
  methods:{
    checkMinMax(e) {
      if (this.min && (e.target.value < +this.min)) {
        this.value = Number(this.min);
      }
      else if (this.max && (e.target.value > +this.max)) {
        this.value = Number(this.max);
      }
    },
    resetNumberInput(e) {
      if(e.target.value == '') {
        this.value = 0;
      }
    },
    selectedData(e) {
      this.$emit('selectedData', e)
    },
    resetSelectOptions() {
      this.opt = {
        api: this.selectConfig.api || '',
        options: this.selectConfig.options || null,
        valueKey: this.selectConfig.valueKey || 'id',
        textKey: this.selectConfig.textKey || 'name',
        model: this.selectConfig.model,
        primitive: this.selectConfig.primitive || false,
        limit: this.selectConfig.limit || 50,
        multiselect: this.selectConfig.multiselect || false,
        defaultOption: this.selectConfig.defaultOption,
        sort: this.selectConfig.sort,
        idsWontAdd: this.selectConfig.idsWontAdd,
      }
    }
  },
  watch : {
    value: {
      handler(newValue, oldValue) {
        this.$emit('update:modelValue', newValue);
      },
      deep: true
    },
    modelValue: {
      handler(newValue, oldValue) {
        this.value = newValue;
      },
      deep: true
    },
    selectConfig: {
      handler(newValue, oldValue) {
        this.resetSelectOptions();
      },
      deep: true
    }
  },
  mounted() {
    // this.value = this.modelValue;
    this.resetSelectOptions();
  },

}

</script>