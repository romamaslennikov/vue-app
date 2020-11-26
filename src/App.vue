<template lang="pug">
  router-view(:class="{'-transparent': !ready}")
</template>

<script>
import objectFitImages from 'object-fit-images';
import { isPortrait } from '@/utils/device';

export default {
  data() {
    return {
      ready: false,
    };
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

    if (!window.PRERENDER_INJECTED) {
      window.addEventListener('load', () => {
        const spinner = document.getElementById('spinner');

        if (spinner) {
          spinner.classList.add('-hide');
        }

        this.ready = true;

        objectFitImages();
      });
    } else {
      // пререндер
      document.querySelector('html')
        .setAttribute('class', '');
    }
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
