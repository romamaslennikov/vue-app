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

<style lang="sass" scoped>
.hamburger-wrapper
  width: rem(68px)
  height: rem(68px)
  min-width: rem(68px)
  display: flex
  flex-flow: row nowrap
  justify-content: center
  align-items: center
  z-index: 200
  cursor: pointer
  +media($port)
    width: rem(30px)
    height: rem(30px)
    min-width: rem(30px)

.hamburger
  cursor: pointer
  transition-timing-function: linear
  transition-duration: 0.15s
  transition-property: opacity, filter
  display: inline-flex
  flex-flow: column nowrap
  justify-content: center
  align-items: center
  width: 100%
  height: 100%
  z-index: 101
  position: relative

  &-box
    position: relative
    display: inline-block
    width: 100%
    height: 100%

  &-inner
    position: absolute
    width: 100%
    height: rem(2px)
    transition-property: all
    background-color: $color-black
    transition-timing-function: cubic-bezier(.16,1,.3,1)
    transition-duration: 0.22s
    top: 50%
    display: block
    transform: translateY(-50%)

    &:after, &:before
      display: block
      content: ""
      position: absolute
      height: rem(2px)
      background-color: $color-black
      left: 0

    &:before
      width: 100%
      top: rem(-6px)
      transition: top 0.1s ease-in 0.25s, opacity 0.1s ease-in

    &:after
      width: 100%
      transition: bottom 0.1s ease-in 0.25s, width 0.2s ease-in, transform 0.22s cubic-bezier(.16,1,.3,1)
      bottom: rem(-6px)
      left: 0

  &.-active
    .hamburger-inner
      transition-delay: 0.12s
      transition-timing-function: cubic-bezier(.16,1,.3,1)
      transform: rotate(225deg) translateY(rem(1px)) translateX(rem(1px))
      box-shadow: none

  &.-active
    .hamburger-inner:before
      top: 0
      transition: top 0.1s ease-out, opacity 0.1s ease-out 0.12s
      opacity: 0
      width: 100%

  &.-active
    .hamburger-inner:after
      width: 100%
      bottom: 0
      transition: bottom 0.1s ease-out, transform 0.22s cubic-bezier(.16,1,.3,1) 0.12s
      transform: rotate(-90deg)
</style>
