<template lang="pug">
  v-header

  router-view(v-slot="{ Component }")
    transition(
      mode="out-in"
      name="fade")
      keep-alive
        component(:is="Component")

  v-footer
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  setup() {
    return {};
  },

  components: {
    VHeader: defineAsyncComponent(() => import('@/components/VHeader.vue')),
    VFooter: defineAsyncComponent(() => import('@/components/VFooter.vue')),
  },
};
</script>
