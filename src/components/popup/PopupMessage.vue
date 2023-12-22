<template>
  <div class="popup__container">
    <div
      class="popup__close icon icon__close"
      @click="close(null)" />

    <div
      class="popup__title"
      v-html="typograf(data.title)"
      v-if="data.title" />

    <div
      class="popup__text"
      v-html="typograf(data.title)"
      v-if="data.text" />

    <div class="mt-2">
      <div
        class="btn"
        v-html="data.btn"
        v-if="data.btn" />
    </div>
  </div>
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
