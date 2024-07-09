<template>
  <div class="w-full">

    <form @submit.prevent="login">
      <div class="space-y-6">

        <div>
          <label for="email" class="block text-sm font-medium text-white"> {{ $t('auth.email') }} </label>
          <div class="mt-1">
            <input v-model="email" id="email" name="email" type="email" autocomplete="email" required="" 
                   class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"/>
          </div>
        </div>
        <div class="space-y-1">
          <label for="password" class="block text-sm font-medium text-white"> {{ $t('auth.password') }} </label>
          <div class="mt-1">
            <input v-model="password" id="password" name="password" type="password"
                   autocomplete="current-password" required=""
                   class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"/>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <div>
            <button type="submit" :disabled='saving'
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700">
              <UiSpinner v-if="saving"></UiSpinner>
              {{ $t('auth.login') }}
            </button>
          </div>

          <NuxtLink to="/auth/recover" class="text-sm font-medium text-white hover:text-green-600">
            {{ $t('auth.forgotPassword') }}
          </NuxtLink>
        </div>
      </div>

    </form>
    <UiNotification ref="notification"></UiNotification>
  </div>
</template>

<script>

export default {
  setup() {
  },
  data() {
    return {
      saving: false,
      email: "",
      password: ""
    };
  },
  watch: {
    email: function (val) {
      this.email = val.toLowerCase().split('').filter(char => char.match(/[a-z0-9@._]/)).join('');
    },
  },

  methods: {
    storeUserData(data) {
      this.setHasMfa(data.has_mfa);
      window.localStorage.setItem('bearer-token', data.token);
      window.localStorage.setItem('user', JSON.stringify(data.name))
      window.localStorage.setItem('email', JSON.stringify(data.email))
      window.localStorage.setItem('loginDate', data.token_iat)
      window.localStorage.setItem('tokenExp', data.token_exp)
    },
    login() {
      let self = this;
      self.saving = true;

      this.$apiFetch('auth/login', {
        method: "POST",
        body: {
          email: this.email,
          password: this.password,
        }
      }).then(function (response) {
        if (response.status) {
          self.storeUserData(response.data);
          self.$refs.notification.success(self.$t('success_login'));
          setTimeout(() => {
          
            if(localStorage.getItem('last-page') != null)
            window.location.href =  localStorage.getItem('last-page')
            else
            window.location.reload();
          }, 200)
        } else {
          self.$refs.notification.error(self.$t(response.messages.code));
        }

      }).catch(err => {
        self.$refs.notification.error(err.data.message);
      }).finally(() => {
        self.saving = false;
      });
    },
    async verifyOtp() {
      if (this.saving) return;

      if (!this.otpData || this.otpData?.length < 6){
        return this.$refs.notification.error(this.$t("message.invalid_otp"));
      }

      try {
        this.saving = true;
        const res = await this.$apiFetch("login/mfa-verify", {
          method: "POST",
          body: {
            hash: this.otpHash,
            otp: this.otpData,
            method: this.selectedMfaMethod,
          },

        });
        if (res.status) {
          this.$refs.notification.success(res.message);
          this.$refs.otpVerifyModal.hide();
          this.storeUserData(res.data);
          this.$refs.notification.success(this.$t('success_login'));
          setTimeout(() => {
            window.location.reload();
          }, 200)
        } else {
          this.$refs.notification.error(res.message);
        }
      } catch (error) {
        this.$refs.notification.error(error.data.message);
      } finally {
        this.saving = false;
      }

    },
    async sendOtp(method) {
      try {
        const res = await this.$apiFetch("login/mfa-send-otp", {
          method: "POST",
          body: {
            email: this.email,
            password: this.password,
            method: this.selectedMfaMethod,
          },
        });
        if (res.status) {
          this.$refs.notification.success(res.message);
          ({ methods: this.mfaMethods, hash: this.otpHash } = res.data);
        } else {
          this.$refs.notification.error(res.message);
        }
      } catch (error) {
        this.$refs.notification.error(error.data.message);
      }
    },
    changeSelectedMfa(mfaMethod) {
      this.$refs.formOtp.reset();
      this.$refs.useAnotherMfaModal.hide();
      this.selectedMfaMethod = mfaMethod;
      this.sendOtp(mfaMethod);
    }
  },
  mounted() {

  },

};
</script>