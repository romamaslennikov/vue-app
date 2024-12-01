<template lang="pug">
  header.header(
    :class="{ header_active: showHeader }"
    ref="header")
    .container.header__container
      p header
      p mobileNav: {{ mobileNav }}
      button(
        @click="showMobileNav(!mobileNav)"
        type="button") showMobileNav
</template>

<script setup>
import debounce from 'lodash.debounce';
import { ref, onMounted } from 'vue';
import useMobileNav from '@/utils/useMobileNav';

const showHeader = ref(null);
const header = ref(null);
const { mobileNav, showMobileNav } = useMobileNav();
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

onMounted(show);
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
