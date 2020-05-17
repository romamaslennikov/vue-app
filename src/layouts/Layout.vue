<template lang="pug">
  #app(:class="{'-transparent': !ready}")
    Header

    keep-alive
      router-view

    Footer
</template>

<script>
import Footer from '../components/Footer.vue';
import Header from '../components/Header.vue';

export default {
  name: 'Layout',
  data() {
    return {
      ready: false,
    };
  },
  methods: {},
  mounted() {
    if (!window.PRERENDER_INJECTED) {
      window.addEventListener('load', () => {
        (document.getElementById('spinner')).classList.add('-hide');

        this.ready = true;
      });
    } else {
      document.querySelector('html')
        .setAttribute('class', '');
    }
  },
  components: {
    Footer,
    Header,
  },
};
</script>

<style lang="sass"></style>
