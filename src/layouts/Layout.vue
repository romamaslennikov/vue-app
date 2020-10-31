<template lang="pug">
  #app
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
      // ...
    } else {
      // пререндер
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
