<template>
  <div class="w-full">

    <form @submit.prevent="resetPassword">
      <div class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-white"> {{ $t('register.email') }} </label>
          <input type="email" v-model="email" id="email"
                 class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"/>
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-white"> {{ $t('register.password') }} </label>
          <input type="password" v-model="password" id="password"
                 class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"/>
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-white"> {{ $t('register.passwordAgain') }} </label>
          <input type="password" v-model="repassword" id="repassword"
                 class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"/>
        </div>
        <div class="flex items-center justify-between">
          <div>
            <button :disabled='saving' type="submit"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700">
              <UiSpinner v-if="saving"></UiSpinner>
              {{ $t('button.send') }}
            </button>
          </div>

          <NuxtLink to="/auth/login" class="text-sm font-medium text-white hover:text-green-600">
            {{ $t('auth.login') }}
          </NuxtLink>
        </div>
      </div>

    </form>
    <UiNotification ref="notification"></UiNotification>
  </div>

</template>

<script>

export default {
  data() {
    return {
      email: this.$route.query.email || "",
      renew_code: "",
      password: "",
      repassword: "",
    };
  },
  email: function (val) {
    this.email = val.toLowerCase().split('').filter(char => char.match(/[a-z0-9@._]/)).join('');
  },
  methods: {

    resetPassword() {

      let self = this;

      this.$apiFetch('reset-password', {
        method: "POST",
        body: {
          email: this.email,
          token: this.token,
          password: this.password,
          password_confirmation: this.repassword,
          type: this.$route.query.type || 'users'
        }
      }).then(function (response) {
        if (!response.status) {
          self.$refs.notification.error(response.message);
        } else {
          self.$refs.notification.success(response.message);
          setTimeout(function () {
            self.$route.query.type === 'accounts' ? navigateTo('/accounts/auth/login/') : navigateTo('/auth/login');
          }, 1500);
        }

      }).catch(err => {
        self.$refs.notification.error(err.data.message);
      }).finally(() => {
        self.saving = false;
      });
    },

  },
  mounted() {

    if (!this.$route.query.reset_token) {
      this.$router.push('/auth/login')
      return false;
    }

    this.token = this.$route.query.reset_token;
  }
};
</script>