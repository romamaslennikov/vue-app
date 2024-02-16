<template lang="pug">
  main#full-page(
    :style='{ transform: `translate3d(0, calc(1dvh * -100 * ${current}), 0)` }')
    slot

</template>

<script>
import {
  onMounted, onUnmounted, watch, ref,
} from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'FullPage',

  setup() {
    // data
    const current = ref(0);
    let app = null;
    const route = useRoute();
    let observer = null;

    // computed

    // methods
    const resolveCurrent = (a) => {
      const { children } = a;

      const node = document
        .getElementById(route.hash?.replace('#', ''));

      node?.scrollTo({
        top: 0,
      });

      const n = Array.from(children).indexOf(node);

      if (n !== -1) current.value = n;
    };

    const init = () => {
      app = document.getElementById('full-page');

      observer = new MutationObserver(() => {
        resolveCurrent(app);
      });

      observer.observe(app, {
        childList: true,
        subtree: false,
        characterDataOldValue: false,
      });
    };

    // hooks
    onMounted(() => {
      init();
    });

    onUnmounted(() => {
      observer.disconnect();
    });

    watch(() => route.hash, () => resolveCurrent(app));

    return {
      current,
    };
  },
};
</script>

<style lang="sass">
html, body
  overflow: hidden
  height: 100dvh
  -webkit-tap-highlight-color: transparent

#full-page
  position: relative
  height: 100dvh
  transform: translate3d(0, 0, 0)
  transition: transform $transition*1.5 ease
  will-change: transform
</style>
