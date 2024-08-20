<template lang="pug">
  main.content
    .container Home
</template>

<script>
import { typograf } from '@/utils/format';
import { computed, onMounted } from 'vue';
import { useAppStore } from '@/stores/app';
import { usePopupStore } from '@/stores/popup';

export default {
  setup() {
    // data
    const appStore = useAppStore();
    const popupStore = usePopupStore();
    const { show } = popupStore;

    // computed
    const isPortrait = computed(() => appStore.isPortrait);

    // methods

    // hooks
    onMounted(() => {
      // ...
    });

    return {
      show,
      isPortrait,
      typograf,
    };
  },

  components: {},
};
</script>
