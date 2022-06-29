<template lang="pug">
main.content
  .container
    | About

    p(v-html="typograf('Мы используем куки <br> на всех своих сайтах, включая этот, потому что без кук вообще весь интернет работал бы через жопу')")
</template>

<script>
import { typograf } from '@/utils/format';

export default {
  name: 'About',

  data() {
    return {};
  },

  methods: {
    typograf,
  },

  mounted() {},

  components: {},
};
</script>

<style lang="sass"></style>
