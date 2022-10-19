<template lang="pug">
transition(name="fade")
  .popup(
    @click.self="close()"
    v-if="current"
    @wheel.prevent)
    transition(name="slide-bottom-smile" mode="out-in")
      component(:is="current")

</template>

<script>
import { computed, defineAsyncComponent } from 'vue';
import { useAppStore } from '@/stores/app';
import { usePopupStore } from '@/stores/popup';

export default {
  setup() {
    // data
    const appStore = useAppStore();
    const popupStore = usePopupStore();
    const { show, close } = popupStore;

    // computed
    const isPortrait = computed(() => appStore.isPortrait);
    const current = computed(() => popupStore.current);

    // methods

    // hooks

    return {
      isPortrait,
      current,
      show,
      close,
    };
  },

  components: {
    Message: defineAsyncComponent(() => import('@/components/popup/Message.vue')),
    Message1: defineAsyncComponent(() => import('@/components/popup/Message1.vue')),
  },
};
</script>

<style lang="sass" scoped>
:deep(.popup__close)
  position: absolute
  cursor: pointer
  right: rem(5px)
  top: rem(5px)

  &:hover
    color: $color-red

:deep(.popup__container)
  position: relative
  max-width: 100%
  width: rem(600px)
  padding: rem(15px)
  background: $color-white

.popup
  position: fixed
  top: 0
  left: 0
  width: 100%
  overflow: auto
  height: calc(var(--vh, 1vh) * 100)
  z-index: 1000
  background: rgba(0, 0, 0, .5)
  display: grid
  justify-content: center
  align-items: center
  justify-items: center
  grid-template-columns: minmax(0, 1fr)
  padding: rem(5px)

  +scrollbars(6px, $color-orange, 8px, $color-black)

</style>
