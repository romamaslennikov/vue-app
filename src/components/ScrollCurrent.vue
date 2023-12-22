/**
* @usage:
*
* <ScrollCurrent />
*/

<template>
  <div ref="node"><slot /></div>
</template>

<script>
export default {
  data() {
    return {
      observer: null,
    };
  },

  methods: {
    onIntersection(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // ...
        } else {
          // ...
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
