/** * @usage: popover template(v-slot:action) .icon template(v-slot:body) div Текст * */

<template lang="pug">
  .popover
    slot(name="action")

    .popover__body(v-if="!disabled")
      slot(name="body")
</template>

<script>
import { typograf } from '@/utils/format';
import { computed } from 'vue';
import { useAppStore } from '@/stores/app';

export default {
  name: 'Popover',

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },

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

<style scoped lang="scss">
.popover {
  position: relative;
  display: inline-flex;

  &__body {
    position: absolute;
    bottom: 100%;
    left: 50%;
    z-index: 1000;
    padding: rem(18px);
    margin-bottom: rem(12px);
    width: rem(272px);
    font-size: rem(12px);
    color: #3333;
    background: $color-white;
    border-radius: rem(10px);
    opacity: 0;
    visibility: hidden;
    box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.2);
    transition: all $transition ease-out;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    transform: translate(-50%, -0.5rem);

    &::before {
      content: '';
      position: absolute;
      bottom: rem(-7px);
      left: 50%;
      width: rem(14px);
      height: rem(14px);
      background: $color-white;
      border-radius: rem(2px);
      transform: translate(-50%) rotate(-45deg);
    }
  }

  &:hover {
    .popover__body {
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, 0);
    }
  }
}
</style>
