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

<script setup>
import { defineAsyncComponent } from 'vue';

const VHeader = defineAsyncComponent(() => import('@/components/VHeader.vue'));
const VFooter = defineAsyncComponent(() => import('@/components/VFooter.vue'));
</script>
