/** * @usage: popover template(v-slot:action) .icon template(v-slot:body) div Текст * */

<template lang="pug">
  .popover(
    :class="skin"
    v-click-outside="() => (isShow = false)")
    .popover__action(@click="toggle")
      slot(name="action")

    transition(name="fade")
      .popover__body(
        ref="popoverBody"
        v-if="isShow")
        slot(name="body")

        .popover__close.icon.icon__x2(@click="toggle")
</template>

<script>
import { typograf } from '@/utils/format';
import { computed, nextTick, ref } from 'vue';
import { useAppStore } from '@/stores/app';

export default {
  name: 'Popover',

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },

    skin: {
      type: String,
      default: '',
    },
  },

  setup() {
    // data
    const appStore = useAppStore();
    const isShow = ref(false);
    const popoverBody = ref(null);

    // computed
    const isPortrait = computed(() => appStore.isPortrait);

    // methods
    function resolvePosition() {
      const target = popoverBody.value;

      if (target) {
        const { clientWidth } = document.documentElement;
        const { right, left } = target.getBoundingClientRect();
        const deltaRight = clientWidth - right;

        if (deltaRight < 0) {
          target.style.marginLeft = `${deltaRight}px`;
        } else if (left < 0) {
          target.style.marginLeft = `${Math.abs(left)}px`;
        }
      }
    }

    function toggle() {
      isShow.value = !isShow.value;

      nextTick(resolvePosition);
    }

    // hooks

    return {
      popoverBody,
      isShow,
      isPortrait,
      typograf,
      toggle,
    };
  },

  components: {},
};
</script>

<style scoped lang="sass">
.popover
  display: inline
  position: relative

  &__action
    cursor: pointer
    display: inline

  &__close
    position: absolute
    top: rem(17px)
    right: rem(17px)
    font-size: rem(14px)
    line-height: 1
    color: #D1D0D0
    cursor: pointer
    &:hover
      color: $color-red
    +media($port)
      font-size: rem(12px)
      top: rem(14px)
      right: rem(14px)

  &__body
    box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, .2)
    position: absolute
    bottom: 100%
    left: 50%
    width: rem(352px)
    z-index: 1000
    background: $color-black
    padding: rem(40px)
    color: #D1D0D0
    text-transform: uppercase
    font-size: rem(18px)
    line-height: 120%
    font-style: normal
    font-weight: 400
    transform: translate(-50%, -.5rem)
    +media($port)
      width: rem(273px)
      font-size: rem(13px)
      padding: rem(35px)
</style>
