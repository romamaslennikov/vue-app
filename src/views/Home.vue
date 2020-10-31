<template lang="pug">
  main.content
    .container
      p container
</template>

<script>
export default {
  name: 'Home',

  data() {
    return {
      ready: false,
    };
  },

  methods: {},

  mounted() {
    this.ready = true;
  },

  components: {},
};
</script>

<style lang="sass">
@import "../styles/mixins/mixins"
@import "../styles/vars/variables"

</style>
