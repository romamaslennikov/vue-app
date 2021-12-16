<template lang="pug">
  header.header(:class="{'-hide': showHeader}" ref="header")
    .container Header
</template>

<script>
import debounce from 'lodash.debounce';

export default {
  name: 'Header',

  data() {
    return {
      showHeader: null,
    };
  },

  methods: {
    showNav(state) {
      this.$store.commit('app/SHOW_MOBILE_NAV', !state);

      const body = document.querySelector('body');

      if (this.$store.getters['app/showMobileNav']) {
        body
          .classList
          .add('-lock');
      } else {
        body
          .classList
          .remove('-lock');
      }
    },

    show() {
      let current = 0;

      const handler = debounce(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > current) {
          if (scrollTop > this.$refs.header?.clientHeight * 2) {
            this.showHeader = true;
          }
        } else {
          this.showHeader = false;
        }

        current = scrollTop;
      }, 200);

      document.addEventListener('scroll', handler);
    },
  },

  mounted() {
    this.show();
  },

  components: {},
};
</script>

<style lang="sass">
.header
  background: $color-white

</style>
