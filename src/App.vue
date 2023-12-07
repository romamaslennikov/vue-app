<template lang="pug">
  router-view(v-slot="{ Component }")
    keep-alive
      component(:is="Component")

  notifications(position="bottom right")

  Popup

  // PWAReloadPrompt
</template>

<script>
import { defineAsyncComponent, onMounted } from 'vue';
import { isPortrait } from '@/utils/device';
import { useAppStore } from '@/stores/app';
// import PWAReloadPrompt from '@/components/PWAReloadPrompt.vue';

export default {
  setup() {
    // data
    const store = useAppStore();

    // computed

    // methods
    function handleWindowResize() {
      store.updateIsPortrait(isPortrait());

      store.updateIsMobile();
    }

    function handleLoad() {
      if (window.PRERENDER_INJECTED) {
        setTimeout(() => {
          document.dispatchEvent(new Event('custom-render-trigger'));
        }, 5000);
      } else {
        const spinner = document.getElementById('spinner');

        spinner?.classList.add('-hide');
      }
    }

    // hooks
    onMounted(() => {
      window.addEventListener('load', handleLoad);
    });

    handleWindowResize();

    window.addEventListener('resize', handleWindowResize);

    return {};
  },

  components: {
    Popup: defineAsyncComponent(() => import('@/components/popup/PopupLayout.vue')),
  },
};
</script>
