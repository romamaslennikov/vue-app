<template lang="pug">
  header.header(
    :class="{ '-hide': showHeader }"
    ref="header")
    .container.header__container header
</template>

<script>
import debounce from 'lodash.debounce';
import { ref, onMounted, computed } from 'vue';
import { useAppStore } from '@/stores/app';

export default {
  name: 'VHeader',

  setup() {
    // data
    const appStore = useAppStore();
    const showHeader = ref(null);
    const header = ref(null);

    // computed
    const isPortrait = computed(() => appStore.isPortrait);
    const mobileNav = computed(() => appStore.mobileNav);

    // methods
    const show = () => {
      let current = 0;

      const handler = debounce(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        const a = header?.value?.clientHeight;

        if (scrollTop > current) {
          if (scrollTop > (a || 0) * 2) {
            showHeader.value = true;
          }
        } else {
          showHeader.value = false;
        }

        current = scrollTop;
      }, 200);

      document.addEventListener('scroll', handler);
    };

    // hooks
    onMounted(show);

    return {
      header,
      mobileNav,
      showHeader,
      isPortrait,
    };
  },

  components: {},
};
</script>

<style scoped lang="scss">
.header {
  // position: fixed;
  // top: 0;
  // left: 0;
  // z-index: 100;
  padding: rem(18px) 0;
  width: 100%;
  background: $color-white;

  @include media($port) {
    padding: rem(13px) 0;
  }

  &__container {
    position: relative;
  }
}
</style>
