/**
* @usage:
*
* ScrollCurrent(:current="'products'")
*/

<template lang="pug">
  div(ref="node")
    slot

</template>

<script>
import { useAppStore } from '@/stores/app';

const appStore = useAppStore();

export default {
  props: {
    current: {
      required: true,
      default: null,
    },
  },

  data() {
    return {
      observer: null,
    };
  },

  methods: {
    onIntersection(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          appStore.updateCurrentNavItem(this.current);
        } else {
          appStore.updateCurrentNavItem(null);
        }
      });
    },

    initObserver() {
      this.observer = new IntersectionObserver(this.onIntersection, {
        root: null,
        threshold: 1,
      });

      this.observer.observe(this.$refs.node);
    },
  },

  mounted() {
    this.initObserver();
  },
};
</script>
