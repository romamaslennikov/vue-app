<template lang="pug">
  transition(
    @after-enter="onAfterEnter"
    @before-leave="onBeforeLeave"
    name="fade")
    .popup(
      @click.self="onClick"
      @wheel.stop
      v-show="current")
      transition(
        mode="out-in"
        name="scale")
        component(
          :is="current"
          v-if="showContent")
</template>

<script>
import { computed, defineAsyncComponent, ref, onMounted } from 'vue';
import { useAppStore } from '@/stores/app';
import { usePopupStore } from '@/stores/popup';

export default {
  setup() {
    // data
    const appStore = useAppStore();
    const popupStore = usePopupStore();
    const showContent = ref(null);

    // computed
    const isPortrait = computed(() => appStore.isPortrait);
    const current = computed(() => popupStore.current);
    const popupData = computed(() => popupStore.data);

    // methods
    const { show, close } = popupStore;
    const onAfterEnter = () => {
      showContent.value = true;
    };
    const onBeforeLeave = () => {
      showContent.value = null;
    };
    const onClick = () => {
      if (popupData.value?.preventClickOverlay) return;

      close(null);
    };

    // hooks
    onMounted(() => {
      if (current.value) showContent.value = true;
    });

    return {
      onClick,
      onBeforeLeave,
      onAfterEnter,
      isPortrait,
      current,
      show,
      close,
      showContent,
    };
  },

  components: {
    PopupMessage: defineAsyncComponent(() => import('@/components/popup/PopupMessage.vue')),
  },
};
</script>

<style lang="sass" scoped>
//fade
.fade-enter-active,
.fade-leave-active
  transition: opacity calc($transition/2) ease-out

.fade-enter-from,
.fade-leave-to
  transition: none
  opacity: 0

// scale
.scale-enter-active
  animation: scale $transition ease

.scale-leave-active
  animation: scale $transition ease reverse

@keyframes scale
  0%
    opacity: 0
    transform: scale(0.8) translate3d(0,0,0)

  100%
    opacity: 1
    transform: scale(1) translate3d(0,0,0)

:deep(.popup__text)
  color: $color-black
  margin-top: rem(20px)
  font-family: $family-alt
  font-size: rem(24px)
  line-height: 125%
  text-align: center
  +media($port)
    margin-top: rem(10px)
    font-size: rem(18px)
    line-height: 133%

:deep(.popup__title)
  color: $color-blue
  text-transform: uppercase
  font-weight: 600
  margin-bottom: rem(38px)
  font-family: $family-alt
  font-size: rem(32px)
  text-align: center

  +media($port)
    margin-bottom: rem(30px)
    font-size: rem(24px)

.popup__container
  +media($port)
    display: grid
    flex-flow: column nowrap
    justify-content: stretch
    align-items: center

:deep(.popup__form)
  margin: 0 auto
  max-width: rem(280px)

:deep(.popup__close)
  transition: all $transition ease-out
  position: absolute
  cursor: pointer
  right: rem(17px)
  top: rem(17px)
  color: $color-red
  &:hover
    color: $color-black
    transform: rotate(180deg)

:deep(.popup__container)
  position: relative
  max-width: 100%
  width: rem(519px)
  padding: rem(50px)
  background: $color-white
  +media($port)
    padding: rem(20px)

.popup
  position: fixed
  top: 0
  left: 0
  width: 100%
  overflow: auto
  height: 100dvh
  z-index: 1000
  background: rgba(0, 0, 0, .5)
  backdrop-filter: blur(1px)
  display: grid
  justify-content: center
  align-items: center
  justify-items: center
  grid-template-columns: minmax(0, 1fr)
  padding: rem(5px)

  +media($port)
    padding: 0
    backdrop-filter: none

  +media($land)
    +scrollbars(rem(6px), $color-yellow, rem(6px), #71033B)
</style>
