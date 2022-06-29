<template lang="pug">
Header

router-view(v-slot="{ Component }")
  keep-alive
    component(:is="Component")

Footer
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'Layout',

  data() {
    return {};
  },

  methods: {},

  mounted() {},

  components: {
    Header,
    Footer,
  },
};
</script>
