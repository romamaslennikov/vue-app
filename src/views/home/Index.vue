<template>
  <main class="content">
    <div class="container">Home</div>
  </main>
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
    const { show } = popupStore;

    // computed
    const isPortrait = computed(() => appStore.isPortrait);

    // methods
    const popup = async (e) => {
      const res = await show(e);

      console.log(res);
    };

    // hooks

    return {
      popup,
      show,
      isPortrait,
      typograf,
    };
  },

  components: {},
};
</script>

<style lang="sass" scoped></style>
