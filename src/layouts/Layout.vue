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
  mounted() {},
  components: {
    Footer,
    Header,
  },
};
</script>

<style lang="sass"></style>
