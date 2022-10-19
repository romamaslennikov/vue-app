<template lang="pug">
VHeader

router-view(v-slot="{ Component }")
  keep-alive
    component(:is="Component")

VFooter
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'VLayout',

  setup() {
    return {};
  },

  components: {
    VHeader: defineAsyncComponent(() => import('@/components/VHeader.vue')),
    VFooter: defineAsyncComponent(() => import('@/components/VFooter.vue')),
  },
};
</script>
