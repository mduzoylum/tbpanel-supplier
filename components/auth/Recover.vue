<template>
  <div class="w-full">

    <form @submit.prevent="reset">
      <div class="space-y-6">

        <div>
          <label for="email" class="block text-sm font-medium text-white"> {{ $t('auth.email') }} </label>
          <div class="mt-1">
            <input v-model="email" id="email" name="email" type="email" autocomplete="email" required=""
                   class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"/>
          </div>
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
      saving: false,
      email: "",

    };
  },
  watch: {
    email: function (val) {
      this.email = val.toLowerCase().split('').filter(char => char.match(/[a-z0-9@._]/)).join('');
    }
  },
  methods: {

    reset() {

      let self = this;
      self.saving = true;

      this.$apiFetch('forgot-password', {
        method: "POST",
        body: {
          email: this.email,
          type: this.$route.query.type || 'users'
        }
      }).then(function (response) {

        if (!response.status) {
          self.$refs.notification.error(response.message);
        } else {
          self.$refs.notification.success(response.message);
          self.email = '';
        }

      }).catch(err => {
        self.$refs.notification.error(err.data.message);
      }).finally(() => {
        self.saving = false;
      });
    },

  },
  mounted() {

  }
};
</script>