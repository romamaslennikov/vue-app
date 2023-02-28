<template lang="pug"></template>

<script>
import { typograf } from '@/utils/format';
import { computed, defineAsyncComponent } from 'vue';
import { useAppStore } from '@/stores/app';

export default {
  setup() {
    // data
    const appStore = useAppStore();

    // computed
    const isPortrait = computed(() => appStore.isPortrait);

    // methods

    // hooks

    return {
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
