<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
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
