<template lang="pug">
header.header(:class="{'-hide': showHeader}" ref="header")
  .container
    | VHeader
    Hamburger
</template>

<script>
import debounce from 'lodash.debounce';
import { ref, onMounted } from 'vue';

export default {
  name: 'VHeader',

  setup() {
    // data
    const showHeader = ref(null);

    // computed

    // methods
    const show = () => {
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
    };

    // hooks
    onMounted(show);

    return {
      showHeader,
    };
  },
};
</script>

<style lang="sass">
.header
  background: $color-white

</style>
