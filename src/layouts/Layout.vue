<template lang="pug">
  #app
    Header

    keep-alive
      router-view

    Footer
</template>

<script>
export default {
  name: 'Layout',

  data() {
    return {};
  },

  methods: {},

  mounted() {},

  components: {
    Header: () => import('@/components/Header.vue'),
    Footer: () => import('@/components/Footer.vue'),
  },
};
</script>

<style lang="sass"></style>
