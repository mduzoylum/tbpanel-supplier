<template>
  <div class="relative pb-36 pt-10 bg-gradient-to-b from-blue-100 via-blue-100 to-white">
    <div
      class="relative max-w-md mx-auto px-4 pb-20 md:pb-32 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8"
    >
      <h1 class="text-xl font-extrabold tracking-tight md:text-3xl lg:text-4xl">
        {{ $t("listPage.multiFactor.title") }}
      </h1>
      <p class="mt-6 max-w-3xl text-base md:text-lg text-blue-gray-300">
        {{ $t("listPage.multiFactor.description") }}
      </p>
    </div>
  </div>

  <div class="mb-16">
    <section
      class="-mt-32 max-w-md mx-auto relative z-10 px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8"
      aria-labelledby="contact-heading"
    >
      <div class="grid grid-cols-1 gap-y-20 lg:grid-cols-3 lg:gap-y-0 lg:gap-x-8">
        <div
          v-for="mfaMethod in multiFactorMethods"
          :key="mfaMethod.name"
          class="flex flex-col bg-white rounded-2xl shadow-xl"
        >
          <div class="flex-1 z-10 relative pt-16 px-4 pb-8 xl:px-6">
            <span
              v-if="!enabledMethods.find((mfa) => mfa.method === mfaMethod.id && mfa.enabled_at)"
              class="absolute -z-10 right-2 bottom-0 px-4 pointer-events-none animate-pulse text-slate-200 text-5xl font-bold"
            >
              {{ $t("listPage.multiFactor.disabled") }}
            </span>
            <div
              class="absolute top-0 p-5 inline-block bg-blue-900 rounded-xl shadow-lg transform -translate-y-1/2"
            >
              <component :is="mfaMethod.icon" class="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <span
              v-if="primaryMethod && primaryMethod.method === mfaMethod.id"
              class="absolute top-4 right-4 xl:right-6 inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
            >
              <span class="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
              {{ $t("listPage.multiFactor.primary") }}
            </span>

            <h3 class="text-xl font-medium text-blue-gray-900">{{ $t(mfaMethod.name) }}</h3>
            <p class="mt-4 text-base text-gray-800">{{ $t(mfaMethod.description) }}</p>
          </div>
          <div
            class="p-6 rounded-bl-2xl rounded-br-2xl md:px-8 flex flex-row items-center justify-between"
          >
            <span
              v-if="!enabledMethods.find((mfa) => mfa.method === mfaMethod.id && mfa.enabled_at)"
              @click="setupMfa(mfaMethod)"
              class="group/action cursor-pointer text-base font-medium text-blue-900 hover:text-blue-900 hover:tracking-wider transition-all duration-300"
            >
              {{ $t("listPage.multiFactor.enable") }}
              <span class="group-hover/action:ml-2 transition-all duration-300">&rarr;</span>
            </span>
            <span
              v-else
              @click="
                this.$refs.confirmer.show({
                  message: this.$t('message.disable_mfa', { method: $t(mfaMethod.name) }),
                  confirmText: this.$t('general.yes'),
                  cancelBtnText: this.$t('button.cancel'),
                  confirm: () => disableMfa(mfaMethod.id),
                })
              "
              class="group/action cursor-pointer text-base font-medium text-blue-900 hover:text-blue-900 hover:tracking-wider transition-all duration-300"
            >
              {{ $t("listPage.multiFactor.disable")
              }}<span class="group-hover/action:ml-2 transition-all duration-300">&rarr;</span>
            </span>
            <span
              @click="
                this.$refs.confirmer.show({
                  message: this.$t('message.set_primary_mfa', { method: $t(mfaMethod.name) }),
                  confirmText: this.$t('general.yes'),
                  confirm: () => setPrimaryMethod(mfaMethod),
                })
              "
              v-if="enabledMethods.find((mfa) => mfa.method === mfaMethod.id && !mfa.is_primary)"
              class="bg-white border border-blue-900 cursor-pointer text-xs text-blue-900 px-2 py-1 rounded-md transition-colors duration-200 hover:bg-blue-900 hover:text-white"
            >
              Öncelikli Yap
            </span>
          </div>
        </div>
      </div>
    </section>
  </div>
  <UiModal ref="modal" :centeredContent="true" :cancelBtnText="'button.cancel'">
    <div class="grid place-content-center my-5">
      <QRCodeVue3
        v-if="mfaSecret"
        :width="200"
        :height="200"
        :value="`otpauth://totp/${userMail}?secret=${mfaSecret}&issuer=${$config.public.APP_NAME}`"
        :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' }"
        :imageOptions="{ hideBackgroundDots: true, imageSize: 0.5, margin: 3 }"
        image="/logo-d.svg"
        :dotsOptions="{
          type: 'extra-rounded',
          color: '#1e3a8a',
          gradient: {
            type: 'linear',
            rotation: 0,
            colorStops: [
              { offset: 0, color: '#09a54e' },
              { offset: 1, color: '#1e3a8a' },
            ],
          },
        }"
        :backgroundOptions="{ color: '#fff' }"
        :cornersSquareOptions="{ type: 'extra-rounded', color: '#000000' }"
        :cornersDotOptions="{ type: undefined, color: '#000000' }"
        fileExt="png"
      />
    </div>
    <div class="flex justify-center">
      <UiFormOtp v-model="otpData" :fields="6" @submit="enableMfa" />
    </div>
    <template #actions>
      <button
        :disabled="isVerifying"
        @click="enableMfa"
        class="ml-3 w-full inline-flex justify-center rounded-md border border-blue-800 shadow-sm px-4 py-2 bg-blue-900 text-base font-medium text-white hover:bg-blue-800 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ $t("button.verify") }}
      </button>
    </template>
  </UiModal>
  <UiPageLoading v-if="isPageloading" />
  <UiConfirm ref="confirmer" />
  <UiNotification ref="notify"></UiNotification>
</template>

<script>
import QRCodeVue3 from "qrcode-vue3";
import { ChatBubbleLeftRightIcon, AtSymbolIcon, KeyIcon } from "@heroicons/vue/24/outline";

export default {
  props: {
    userType: {
      type: String,
      default: "user", // user, account
    },
    setHasMfa: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      isPageloading: true,
      userMail: "",
      userMfas: [],
      multiFactorMethods: [
        {
          id: "sms",
          name: "listPage.multiFactor.sms.title",
          description: "listPage.multiFactor.sms.description",
          setupDescription: "listPage.multiFactor.sms.setupDescription",
          icon: ChatBubbleLeftRightIcon,
        },
        {
          id: "email",
          name: "listPage.multiFactor.email.title",
          description: "listPage.multiFactor.email.description",
          setupDescription: "listPage.multiFactor.email.setupDescription",
          icon: AtSymbolIcon,
        },
        {
          id: "google",
          name: "listPage.multiFactor.google.title",
          description: "listPage.multiFactor.google.description",
          setupDescription: "listPage.multiFactor.google.setupDescription",
          icon: KeyIcon,
        },
      ],
      otpHash: null,
      mfaSecret: null,
      enabledMethods: [],
      primaryMethod: null,
      otpData: null,
      selectedMfaMethod: null,
      isVerifying: false,
      forceMfa: false,
    };
  },
  components: {
    QRCodeVue3,
  },
  watch: {
    userMfas: {
      handler(val) {
        this.enabledMethods = val.filter((mfa) => mfa.enabled_at);
        this.primaryMethod = this.enabledMethods.find((mfa) => mfa.is_primary);
      },
      deep: true,
    },
  },
  methods: {
    async getUserMfas() {
      try {
        this.isPageloading = true;
        const res = await this.$apiFetch(`${this.userType}/multi-factor/methods`);
        if (res.status) {
          this.userMfas = res.data;
          if (this.userMfas.every((mfa) => !mfa.enabled_at)) {
            this.setHasMfa(false);
          }
        } else {
          this.$refs.notify.error(res.message);
        }
        this.isPageloading = false;
      } catch (error) {
        this.$refs.notify.error(error.data.message);
      } finally {
        this.isPageloading = false;
      }
    },
    async setupMfa(method) {
      try {
        this.isPageloading = true;
        const res = await this.$apiFetch(`${this.userType}/multi-factor/setup`, {
          method: "POST",
          body: { method: method.id },
        });
        if (res.status) {
          this.$refs.notify.success(res.message);
          this.otpHash = res.data.hash || null;
          this.mfaSecret = res.data.secret || null;
          this.$refs.modal.show(this.$t(method.name), this.$t(method.setupDescription));
          this.selectedMfaMethod = method;
        } else {
          this.$refs.notify.error(res.message);
        }
      } catch (error) {
        this.$refs.notify.error(error.data.message);
      } finally {
        this.isPageloading = false;
      }
    },
    async enableMfa() {
      if (!this.otpData || this.otpData?.length < 6) {
        return this.$refs.notify.error(this.$t("message.invalid_otp"));
      }
      try {
        this.isVerifying = true;
        const res = await this.$apiFetch(`${this.userType}/multi-factor/enable`, {
          method: "POST",
          body: {
            hash: this.otpHash,
            otp: this.otpData,
            method: this.selectedMfaMethod.id,
          },
        });
        if (res.status) {
          this.$refs.notify.success(res.message);
          this.$refs.modal.hide();
          this.setHasMfa(true);

          if (this.forceMfa) {
            const url = new URL(window.location.href);
            url.searchParams.delete("mfa_require");
            window.location.href = url.href;
            return;
          }

          this.getUserMfas();
        } else {
          this.$refs.notify.error(res.message);
        }
      } catch (error) {
        this.$refs.notify.error(error.data.message);
      } finally {
        this.isVerifying = false;
      }
    },
    async disableMfa(method) {
      try {
        this.isPageloading = true;
        const res = await this.$apiFetch(`${this.userType}/multi-factor/disable`, {
          method: "POST",
          body: { method },
        });
        if (res.status) {
          this.$refs.notify.success(res.message);
          this.getUserMfas();
        } else {
          this.$refs.notify.error(res.message);
        }
      } catch (error) {
        this.$refs.notify.error(error.data.message);
      } finally {
        this.isPageloading = false;
      }
    },
    async setPrimaryMethod(method) {
      try {
        this.isPageloading = true;
        const res = await this.$apiFetch(`${this.userType}/multi-factor/set-primary`, {
          method: "POST",
          body: { method: method.id },
        });
        if (res.status) {
          this.$refs.notify.success(res.message);
          this.getUserMfas();
        } else {
          this.$refs.notify.error(res.message);
        }
      } catch (error) {
        this.$refs.notify.error(error.data.message);
      } finally {
        this.isPageloading = false;
      }
    },
    checkMfaRequire() {
      const urlParams = new URLSearchParams(window.location.search);
      const mfaRequire = urlParams.get("mfa_require");
      if (mfaRequire) {
        this.forceMfa = true;
        this.$refs.notify.error(this.$t("message.mfa_required"));
      }
    },
  },
  mounted() {
    this.userMail = JSON.parse(localStorage.getItem("email"));
    this.getUserMfas();
    this.checkMfaRequire();
  },
};
</script>
