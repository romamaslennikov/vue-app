<template lang="pug">
  header.header(:class="{'-hide': showHeader}" ref="header")
    .container header
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      ready: false,
      showHeader: null,
    };
  },
  methods: {
    showNav(state) {
      this.$store.commit('SHOW_MOBILE_NAV', !state);

      const body = document.querySelector('body');

      if (this.$store.getters.showMobileNav) {
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

      const handler = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > current) {
          if (scrollTop > this.$refs.header?.clientHeight * 2) {
            this.showHeader = true;
          }
        } else {
          this.showHeader = false;
        }

        current = scrollTop;
      };

      document.addEventListener('scroll', () => {
        handler();
      });
    },
  },
  mounted() {
    this.show();
  },
  components: {},
};
</script>

<style lang="sass">
  @import "../styles/mixins/mixins"
  @import "../styles/vars/variables"

  .header
    background: #eee

</style>
