<template lang="pug">
router-view

notifications(position="bottom right")
</template>

<script>
import { mapMutations } from 'vuex';
import { isPortrait } from '@/utils/device';

export default {
  data() {
    return {
      ready: null,
    };
  },

  methods: {
    ...mapMutations({
      updateIsMobile: 'app/UPDATE_IS_MOBILE',
      updateIsPortrait: 'app/UPDATE_IS_PORTRAIT',
    }),

    handleWindowResize() {
      this.updateIsPortrait(isPortrait());

      this.updateIsMobile((isPortrait() && window.innerWidth < 768));

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

  unmounted() {
    window.removeEventListener('resize', this.handleWindowResize);
  },
};
</script>
