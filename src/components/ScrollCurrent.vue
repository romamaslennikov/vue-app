/**
* @usage:
*
* scroll-current
*/

<template lang="pug">
  div(ref="node"): slot
</template>

<script>
import { ref, onMounted, inject } from 'vue';

export default {
  setup() {
    // data
    const observer = ref(null);
    const node = ref(null);
    const show = inject('show');

    // methods
    function onIntersection(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          show.value = true;
        } else {
          // ...
        }
      });
    }

    function initObserver() {
      observer.value = new IntersectionObserver(onIntersection, {
        root: null,
        threshold: 1,
      });

      observer.value.observe(node.value);
    }

    // hooks
    onMounted(() => {
      initObserver();
    });

    return {
      node,
    };
  },
};
</script>
