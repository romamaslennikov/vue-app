<template lang="pug">
router-view(v-slot="{ Component }")
  keep-alive
    component(:is="Component")

notifications(position="bottom right")

Popup

// PWAReloadPrompt
</template>

<script>
import { defineAsyncComponent, onMounted, onUnmounted } from 'vue';
import { isPortrait } from '@/utils/device';
import { useAppStore } from '@/stores/app';
// import PWAReloadPrompt from '@/components/PWAReloadPrompt.vue';

export default {
  setup() {
    // data
    const store = useAppStore();

    // computed

    // methods
    function useVh() {
      /*
      * use in css => height: calc(var(--vh, 1vh) * 100)
      * */
      const vh = window.innerHeight * 0.01;

      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    function handleWindowResize() {
      store.updateIsPortrait(isPortrait());

      store.updateIsMobile((isPortrait() && window.innerWidth < 768));

      useVh();
    }

    function handleLoad() {
      if (window.PRERENDER_INJECTED) {
        document.dispatchEvent(new Event('custom-render-trigger'));
      } else {
        const spinner = document.getElementById('spinner');

        spinner?.classList.add('-hide');
      }
    }

    // hooks
    onMounted(() => {
      window.addEventListener('load', handleLoad);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', handleWindowResize);
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
