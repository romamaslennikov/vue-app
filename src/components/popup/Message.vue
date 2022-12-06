<template lang="pug">
.popup__container
  .popup__close.icon.i_x(@click="close")

  div Message
</template>

<script>
import { typograf } from '@/utils/format';
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

    // methods

    // hooks

    return {
      show,
      close,
      isPortrait,
      typograf,
    };
  },

  components: {},
};
</script>

<style lang="sass" scoped></style>
