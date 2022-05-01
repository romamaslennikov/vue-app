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
      this.$store.commit('app/UPDATE_IS_PORTRAIT', isPortrait());

      this.$store.commit('app/UPDATE_IS_MOBILE', (isPortrait() && window.innerWidth < 768));

      this.vh();
    },

    vh() {
      const vh = window.innerHeight * 0.01;

      document.documentElement.style.setProperty('--vh', `${vh}px`);
      // use in css => height: calc(var(--vh, 1vh) * 100);
    },
  },

  mounted() {
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
    this.$store.commit('app/DETECT_WEBP');
  },

  async created() {
    this.handleWindowResize();

    window.addEventListener('resize', this.handleWindowResize);
  },

  destroyed() {
    window.removeEventListener('resize', this.handleWindowResize);
  },
};
</script>
