<script setup>
// import { useRegisterSW } from 'virtual:pwa-register/vue';
//
// const {
//   offlineReady,
//   needRefresh,
//   updateServiceWorker,
// } = useRegisterSW({
//   onRegisteredSW(swUrl) {
//     console.log(`Service Worker at: ${swUrl}`);
//   },
// });
//
// const close = async () => {
//   offlineReady.value = false;
//   needRefresh.value = false;
// };
</script>

<template lang="pug">
  .pwa-toast(
    role="alert"
    v-if="offlineReady || needRefresh")
    .message
      span(v-if="offlineReady") Сайт доступен в офлайн режиме
      span New content available, click on reload button to update.

    button(
      @click="updateServiceWorker()"
      type="button"
      v-if="needRefresh") Reload

    button(
      @click="close"
      type="button") Close
</template>

<style>
.pwa-toast {
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 16px;
  padding: 12px;
  border: 1px solid #8885;
  border-radius: 4px;
  z-index: 1000;
  text-align: left;
  box-shadow: 3px 4px 5px 0 #8885;
  background-color: white;
}
.pwa-toast .message {
  margin-bottom: 8px;
}
.pwa-toast button {
  border: 1px solid #8885;
  outline: none;
  margin-right: 5px;
  border-radius: 2px;
  padding: 3px 10px;
}
</style>
