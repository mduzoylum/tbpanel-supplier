<template>
  <div class="w-full">

    <form @submit.prevent="register">

      <div class="space-y-6">
        <div class="columns-2">
          <div>
            <label for="name" class="block text-sm font-medium text-white"> {{ $t('register.name') }} </label>
            <div class="mt-1">
              <input v-model="formData.name" id="name" name="name" type="" autocomplete="email" required=""
                     class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"/>
            </div>
          </div>
          <div>
            <label for="surname" class="block text-sm font-medium text-white"> {{ $t('register.surname') }} </label>
            <div class="mt-1">
              <input v-model="formData.surname" id="surname" name="surname" type="" autocomplete="email" required=""
                     class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"/>
            </div>
          </div>
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-white"> {{ $t('register.email') }} </label>
          <div class="mt-1">
            <input v-model="formData.email" id="email" name="email" type="email" autocomplete="email" required=""
                   class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"/>
          </div>
        </div>

        <div class="columns-2">
          <div>
            <label for="password" class="block text-sm font-medium text-white"> {{ $t('register.password') }} </label>
            <div class="mt-1">
              <input v-model="formData.password" @keyup.enter="onSubmit" id="password" name="password" type="password"
                     autocomplete="current-password" required=""
                     class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"/>
            </div>
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-white"> {{
                $t('register.passwordAgain')
              }} </label>
            <div class="mt-1">
              <input v-model="formData.password_again" @keyup.enter="onSubmit" id="passwordAgain" name="passwordAgain"
                     type="password" autocomplete="current-password" required=""
                     class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"/>
            </div>
          </div>
        </div>
        <div class="space-y-1">
          <label for="phone" class="block text-sm font-medium text-white"> {{ $t('register.phone') }} </label>
          <div class="mt-1">
            <input v-model="formData.phone" @keyup.enter="onSubmit" id="phone" name="phone" type=""
                   autocomplete="current-password" required=""
                   class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"/>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <div>
            <button :disabled='saving' type="submit"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700">
              <UiSpinner v-if="saving"></UiSpinner>
              {{ $t('register.register') }}
            </button>
          </div>


          <NuxtLink to="/auth/login" class="text-sm font-medium text-white hover:text-green-600">
            {{ $t('connective.or') }} {{ $t('auth.login') }}
          </NuxtLink>
        </div>
      </div>
    </form>
    <UiNotification ref="notification"></UiNotification>
  </div>
</template>

<script>

export default {
  props: ['modelValue'],
  data() {
    return {
      saving: false,
      formData: {
        name: "",
        surname: "",
        email: "",
        password: "",
        password_again: "",
        phone: ""
      }
    };
  },
  watch: {
    formData: {
      handler: function (val) {
        this.$emit('update:modelValue', val)
      },
      deep: true
    },    
    'formData.email': function (val) {
      this.formData.email = val.toLowerCase().split('').filter(char => char.match(/[a-z0-9@._]/)).join('');
    }
  },
  methods: {
    reset() {
      this.formData = {
        name: "",
        surname: "",
        email: "",
        password: "",
        password_again: "",
        phone: ""
      }
    },
    register() {

      let self = this;
      self.saving = true;

      this.$apiFetch('register', {
        method: "POST",
        body: this.formData
      }).then(function (response) {
        if (!response.status) {
          self.$refs.notification.error(response.message);
        } else {
          self.$refs.notification.success(response.message);
          this.reset();
        }

      }).catch(err => {
        self.$refs.notification.error(err.data.message);
      }).finally(() => {
        self.saving = false;
      });
    },

  },
  mounted() {
    this.reset();
  }
};
</script>