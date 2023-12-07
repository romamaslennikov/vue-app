<template lang="pug">
  .popover
    slot(name="action")
    .popover__body
      slot(name="body")

</template>

<script>
import { typograf } from '@/utils/format';
import { computed } from 'vue';
import { useAppStore } from '@/stores/app';

export default {
  setup() {
    // data
    const appStore = useAppStore();

    // computed
    const isPortrait = computed(() => appStore.isPortrait);

    // methods

    // hooks

    return {
      isPortrait,
      typograf,
    };
  },

  components: {},
};
</script>

<style scoped lang="sass">
.popover
  display: inline-flex
  position: relative

  &__body
    box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, .2)
    position: absolute
    bottom: 100%
    left: 50%
    width: rem(272px)
    z-index: 1000
    background: $color-white
    padding: rem(18px)
    color: #333
    font-size: rem(12px)
    border-radius: rem(10px)
    margin-bottom: rem(12px)
    font-style: normal
    font-weight: 400
    line-height: normal
    visibility: hidden
    opacity: 0
    transform: translate(-50%, -.5rem)
    transition: all $transition ease-out

    &::before
      content: ""
      position: absolute
      bottom: rem(-7px)
      background: $color-white
      left: 50%
      transform: translate(-50%) rotate(-45deg)
      width: rem(14px)
      height: rem(14px)
      border-radius: rem(2px)

  &:hover
    .popover__body
      opacity: 1
      visibility: visible
      transform: translate(-50%, 0)

</style>
