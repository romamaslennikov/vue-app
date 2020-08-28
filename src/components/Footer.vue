<template lang="pug">
  footer.footer
    .container footer
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      ready: false,
    };
  },
  methods: {},
  mounted() {},
  components: {},
};
</script>

<style lang="sass">
  @import "../styles/mixins/mixins"
  @import "../styles/vars/variables"

  .footer
    background: #eee
    content-visibility: auto
</style>
