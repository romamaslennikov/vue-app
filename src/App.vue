<template lang="pug">
  router-view(v-slot="{ Component }")
    keep-alive
      component(:is="Component")

  popup

  // PWAReloadPrompt
</template>

<script setup>
import { defineAsyncComponent, onMounted } from 'vue';
import { isPortrait } from '@/utils/device';
import { useAppStore } from '@/stores/app';
// import PWAReloadPrompt from '@/components/PWAReloadPrompt.vue';

const Popup = defineAsyncComponent(() => import('@/components/popup/PopupLayout.vue'));

const store = useAppStore();

function handleWindowResize() {
  store.updateIsPortrait(isPortrait());

  store.updateIsMobile();
}

function handleLoad() {
  if (window.PRERENDER_INJECTED) {
    setTimeout(() => {
      document.dispatchEvent(new Event('custom-render-trigger'));
    }, 3000);
  } else {
    const spinner = document.getElementById('spinner');

    spinner?.classList.add('-hide');
  }
}

onMounted(() => {
  window.addEventListener('load', handleLoad);
});

handleWindowResize();

window.addEventListener('resize', handleWindowResize);
</script>
