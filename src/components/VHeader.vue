<template lang="pug">
header.header(:class="{'-hide': showHeader}" ref="header")
  .container
    router-link(to="/") home

    router-link(to="/about") about
</template>

<script>
import debounce from 'lodash.debounce';

export default {
  name: 'VHeader',

  inject: ['eventHub'],

  data() {
    return {
      showHeader: null,
    };
  },

  methods: {
    show() {
      let current = 0;

      const handler = debounce(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > current) {
          if (scrollTop > this.$refs.header.clientHeight * 2) {
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

    // console.log(this.eventHub);

    this.eventHub.on('test', (e) => {
      console.log(e);
    });
  },

  components: {},
};
</script>

<style lang="sass">
.header
  background: $color-white

</style>
