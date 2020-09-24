<template lang="pug">
  router-view
</template>

<script>
import { isPortrait } from '@/utils/device';

export default {
  data() {
    return {};
  },

  methods: {
    handleWindowResize() {
      this.$store.commit('UPDATE_WINDOW_WIDTH', window.innerWidth);

      this.$store.commit('UPDATE_IS_PORTRAIT', isPortrait());

      this.$store.commit('UPDATE_IS_MOBILE', (isPortrait() && window.innerWidth < 768));
    },

    handleScroll() {
      this.$store.commit('UPDATE_WINDOW_SCROLL_Y', window.scrollY);
    },
  },

  mounted() {
    this.$store.commit('UPDATE_WINDOW_WIDTH', window.innerWidth);
  },

  async beforeCreate() {
    this.$store.commit('DETECT_WEBP');
  },

  async created() {
    this.handleWindowResize();

    this.handleScroll();

    window.addEventListener('resize', this.handleWindowResize);

    // window.addEventListener('scroll', this.handleScroll);
  },

  destroyed() {
    window.removeEventListener('resize', this.handleWindowResize);

    // window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>
