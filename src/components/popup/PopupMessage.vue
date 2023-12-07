<template lang="pug">
  .popup__container
    .popup__close.icon.icon__close(@click="close(null)")

    .popup__title(
      v-html="typograf(data.title)"
      v-if="data.title")

    .popup__text(
      v-html="typograf(data.title)"
      v-if="data.text")

    .mt-2
      .btn.-black.w-100(
        v-html="data.btn"
        v-if="data.btn")

</template>

<script>
import { typograf } from '@/utils/format';
import { computed } from 'vue';
import { useAppStore } from '@/stores/app';
import { usePopupStore } from '@/stores/popup';

export default {
  setup() {
    // data
    const appStore = useAppStore();
    const popupStore = usePopupStore();
    const { show, close, data } = popupStore;

    // computed
    const isPortrait = computed(() => appStore.isPortrait);

    // methods

    // hooks

    return {
      show,
      close,
      isPortrait,
      typograf,
      data,
    };
  },

  components: {},
};
</script>

<style lang="sass" scoped></style>
