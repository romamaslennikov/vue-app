<template lang="pug">
.popup__container
  .popup__close.icon.i_x(@click="close")

  div Message1
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
    const { close } = popupStore;

    // computed
    const isPortrait = computed(() => appStore.isPortrait);

    // methods

    // hooks

    return {
      close,
      isPortrait,
      typograf,
    };
  },

  components: {
    SvgIcon: defineAsyncComponent(() => import('@/components/ui/SvgIcon.vue')),
  },
};
</script>

<style lang="sass" scoped></style>
