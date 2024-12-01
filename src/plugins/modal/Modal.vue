<template lang="pug">
  teleport(
    defer
    to="body")
    transition(
      @after-enter="onAfterEnter"
      @after-leave="onBeforeLeave"
      name="fade")
      .modal(
        :class="[classNameModal]"
        :style="{ zIndex }"
        @click.self="clickOverlay && $modal.cancel(props.name)"
        v-if="show")
        transition(
          mode="out-in"
          name="scale")
          .modal__container(
            :class="[classNameContainer]"
            v-show="showContent")
            .modal__close.icon.icon-font-x(
              @click="$modal.cancel(props.name)"
              v-if="visibleActionClose")

            slot
</template>

<script setup>
import { inject, computed, ref } from 'vue';

const props = defineProps({
  name: {
    type: String,
    default: '',
  },

  clickOverlay: {
    type: Boolean,
    default: true,
  },

  classNameModal: {
    type: String,
    default: '',
  },

  classNameContainer: {
    type: String,
    default: '',
  },

  visibleActionClose: {
    type: Boolean,
    default: true,
  },
});
const $modal = inject('$modal');
const showContent = ref(false);
const show = computed(() => $modal.active().includes(props.name));
const zIndex = computed(() => 1000 + $modal.active().indexOf(props.name));
const onAfterEnter = () => {
  showContent.value = true;
};
const onBeforeLeave = () => {
  showContent.value = false;
};
</script>

<style lang="scss">
$transition: 0.4s;

.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: grid;
  justify-content: center;
  place-items: center center;
  overflow: auto;
  padding: rem(5px);
  width: 100%;
  height: 100dvh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(1px);
  grid-template-columns: minmax(0, 1fr);

  @include media($port) {
    padding: 0;
    backdrop-filter: none;
  }

  @include media($land) {
    @include scrollbars(rem(6px), $color-yellow, rem(6px), #71033b);
  }

  &__container {
    position: relative;
    padding: rem(50px);
    width: rem(519px);
    max-width: 100%;
    background: $color-white;

    .fade-leave-active & {
      opacity: 0;
      animation: scale calc($transition / 4) ease reverse;
    }

    @include media($port) {
      padding: rem(20px);
    }
  }

  &__close {
    position: absolute;
    top: rem(17px);
    right: rem(17px);
    color: $color-red;
    transition: all $transition ease-out;
    cursor: pointer;

    &:hover {
      color: $color-black;
      transform: rotate(180deg);
    }
  }
}

// fade
.fade-enter-active,
.fade-leave-active {
  transition: opacity calc($transition / 2) ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transition: opacity calc($transition / 2) ease-out;
}

// scale
.scale-enter-active {
  animation: scale $transition ease;
}

.scale-leave-active {
  animation: scale $transition ease reverse;
}

@keyframes scale {
  0% {
    opacity: 0;
    transform: scale(0.8) translate3d(0, 0, 0);
  }

  100% {
    opacity: 1;
    transform: scale(1) translate3d(0, 0, 0);
  }
}
</style>
