
<template>
  <div class="mx-auto w-full max-w-sm lg:w-96">
    <div class="grid grid-cols-2 space-x-14">
      <img class="h-12 w-auto" src="/logo.png" alt="Workflow" />
      <h2 class="mt-5 text-l text-white underline decoration-green-600">{{ $t('auth.resetPassword') }}</h2>
    </div>
    <div class="mt-8">
      <div class="mt-6">
        <AuthReset></AuthReset>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "auth",
});
</script>