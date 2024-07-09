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
          <!--                <div class="flex items-center">-->
          <!--                  <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />-->
          <!--                  <label for="remember-me" class="ml-2 block text-sm text-gray-900"> {{ $t('auth.rememberMe') }} </label>-->
          <!--                </div>-->
          <div>
            <button type="submit" :disabled='saving'
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700">
              <UiSpinner v-if="saving"></UiSpinner>
              {{ $t('auth.login') }}
            </button>
          </div>

          <NuxtLink to="/auth/recover?type=accounts" class="text-sm font-medium text-white hover:text-green-500">
            {{ $t('auth.forgotPassword') }}
          </NuxtLink>
          <NuxtLink v-if="isRegisterPageActive" to="/auth/register" class="text-sm font-medium text-white hover:text-green-500">
            {{ $t('connective.or') }} {{ $t('auth.register') }}
          </NuxtLink>
        </div>
      </div>
    </form>
    <UiModal ref="otpVerifyModal" :showCancelBtn="false">
      <template #title>
        <h3 class="text-lg leading-6 font-medium text-gray-900 text-center">{{ $t(`listPage.multiFactor.${selectedMfaMethod}.title`) }}</h3>
      </template>
      <template #content>
        <div class="mt-2 text-center">
          <div class="text-sm text-gray-500" v-html="$t(`listPage.multiFactor.${selectedMfaMethod}.verifyDescription`)"></div>
        </div>
        <div class="flex flex-col items-center justify-center mt-5 gap-y-3">
          <UiFormOtp ref="formOtp" v-model="otpData" :fields="6" @submit="verifyOtp" />
          <span @click="sendOtp(selectedMfaMethod)" class="text-sm text-blue-900 cursor-pointer hover:text-blue-700"> {{ $t('message.resendOtp') }} </span>
        </div>
      </template>
      <template #actions>
        <div class="w-full mt-5 flex flex-row items-center justify-between">
          <button
            v-if="mfaMethods.length > 1"
            @click="this.$refs.useAnotherMfaModal.show()"
            class="w-full inline-flex justify-center rounded-md border border-blue-800 shadow-sm px-4 py-2 bg-white text-base font-medium text-blue-800 hover:bg-blue-800 hover:text-white focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
          >
            {{ $t("button.useAnotherMethod") }}
          </button>
          <button
            :disabled="saving"
            @click="verifyOtp"
            class="ml-auto w-full inline-flex justify-center rounded-md border border-blue-800 shadow-sm px-4 py-2 bg-blue-900 text-base font-medium text-white hover:bg-blue-800 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <UiSpinner v-if="saving"></UiSpinner>
            {{ $t("button.verify") }}
          </button>
        </div>
      </template>
    </UiModal>
    <UiModal ref="useAnotherMfaModal" :showCancelBtn="true" :cancelBtnText="'button.cancel'">
      <template #title>
        <h3 class="text-lg leading-6 font-medium text-gray-900 text-center">Farlı Doğrulama Yöntemi Kullan</h3>
      </template>
      <template #content>
        <div class="flex flex-col mt-2">
          <p class="text-sm text-center text-gray-500">
            Aşağıda aktif olan doğrulama yöntemlerinden birini seçerek doğrulama işlemini gerçekleştirebilirsiniz.
          </p>
          <div class="my-5 flex flex-row justify-center flex-wrap gap-4">
            <div 
              v-for="mfaMethod in mfaMethods.filter(method => method !== selectedMfaMethod)"
              :key="mfaMethod"
              @click="changeSelectedMfa(mfaMethod)"
              class="relative rounded-lg border cursor-pointer border-gray-300 bg-white px-4 py-3 shadow-sm flex items-center hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
              <p class="text-sm font-medium text-gray-900">
                {{ $t(`listPage.multiFactor.${mfaMethod}.title`) }}
              </p>
            </div>
          </div>
        </div>
      </template>
    </UiModal>
    <UiNotification ref="notification"></UiNotification>
  </div>
</template>

<script>

export default {
  data() {
    return {
      saving: false,
      email: "",
      password: "",
      isRegisterPageActive: this.$config.public.IS_REGISTER_ACTIVE === 'true',
      mfaMethods: null,
      selectedMfaMethod: null,
      otpHash: null,
      otpData: "",
    };
  },
  watch: {
    email: function (val) {
      this.email = val.toLowerCase().split('').filter(char => char.match(/[a-z0-9@._]/)).join('');
    }
  },

  methods: {
    setUserDataToLocalStorage(data) {
      window.localStorage.setItem('account-token', data.token);
      window.localStorage.setItem('name', data.name)
      window.localStorage.setItem('surname', data.surname)
      window.localStorage.setItem('email', JSON.stringify(data.email))
      window.localStorage.setItem('loginDate', data.token_iat)
      window.localStorage.setItem('tokenExp', data.token_exp)
    },
    login() {
      let self = this;
      self.saving = true;

      this.$apiFetch('/accounts/login', {
        method: "POST",
        body: {
          email: this.email,
          password: this.password,
          processType: 'login'
        }
      }).then(function (response) {
        if (response.status) {

          if (response.code === 'mfa') {
            ({ methods: self.mfaMethods, hash: self.otpHash } = response.data);
            self.$refs.notification.success(response.message);
            self.selectedMfaMethod = self.mfaMethods[0];
            self.$refs.otpVerifyModal.show();
            return;
          }
          
          self.setUserDataToLocalStorage(response.data);
          self.$refs.notification.success(self.$t('success_login'));
          setTimeout(() => {
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
        const res = await this.$apiFetch("accounts/login/mfa-verify", {
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
          this.setUserDataToLocalStorage(res.data);
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
        const res = await this.$apiFetch("accounts/login/mfa-send-otp", {
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