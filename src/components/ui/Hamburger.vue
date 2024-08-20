<template lang="pug">
  .hamburger-wrapper(@click="show(!active)")
    .hamburger(:class="{ '-active': active }")
      .hamburger-box
        .hamburger-inner
</template>

<script>
import { useAppStore } from '@/stores/app';
import { computed } from 'vue';

export default {
  name: 'Hamburger',

  setup() {
    // data
    const appStore = useAppStore();

    // computed
    const active = computed(() => appStore.mobileNav);

    // methods
    const show = (e) => appStore.showMobileNav(e);

    return {
      active,
      show,
    };
  },
};
</script>

<style scoped lang="scss">
.hamburger-wrapper {
  z-index: 200;
  display: flex;
  justify-content: center;
  align-items: center;
  width: rem(68px);
  min-width: rem(68px);
  height: rem(68px);
  flex-flow: row nowrap;
  cursor: pointer;

  @include media($port) {
    width: rem(30px);
    min-width: rem(30px);
    height: rem(30px);
  }
}

.hamburger {
  position: relative;
  z-index: 101;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition-timing-function: linear;
  transition-duration: 0.15s;
  transition-property: opacity, filter;
  flex-flow: column nowrap;

  &-box {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 100%;
  }

  &-inner {
    position: absolute;
    top: 50%;
    display: block;
    width: 100%;
    height: rem(2px);
    background-color: $color-black;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
    transition-duration: 0.22s;
    transform: translateY(-50%);

    &::after,
    &::before {
      content: '';
      position: absolute;
      left: 0;
      display: block;
      height: rem(2px);
      background-color: $color-black;
    }

    &::before {
      top: rem(-6px);
      width: 100%;
      transition:
        top 0.1s ease-in 0.25s,
        opacity 0.1s ease-in;
    }

    &::after {
      bottom: rem(-6px);
      left: 0;
      width: 100%;
      transition:
        bottom 0.1s ease-in 0.25s,
        width 0.2s ease-in,
        transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
    }
  }

  &.-active {
    .hamburger-inner {
      transition-delay: 0.12s;
      transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
      transform: rotate(225deg) translateY(rem(1px)) translateX(rem(1px));
      box-shadow: none;
    }

    .hamburger-inner::before {
      top: 0;
      width: 100%;
      opacity: 0;
      transition:
        top 0.1s ease-out,
        opacity 0.1s ease-out 0.12s;
    }

    .hamburger-inner::after {
      bottom: 0;
      width: 100%;
      transition:
        bottom 0.1s ease-out,
        transform 0.22s cubic-bezier(0.16, 1, 0.3, 1) 0.12s;
      transform: rotate(-90deg);
    }
  }
}
</style>
