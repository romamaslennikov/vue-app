<template lang="pug">
  picture
    source(
      :srcset="avif"
      type="image/avif"
      v-if="avif")

    source(
      :srcset="webp"
      type="image/webp"
      v-if="webp")

    img(
      :alt="alt"
      :class="{ 'v-lazy-image-loaded': loaded }"
      :src="src"
      @load="load"
      decoding="async"
      height="10"
      loading="lazy"
      width="10")
</template>

<script setup>
/*
 * @usage: v-img(src="@images/logo.png" webp="@images/logo.webp" avif="@images/logo.avif" alt="")
 *  */
import { ref } from 'vue';

defineProps({
  src: {
    type: String,
    required: true,
  },

  avif: {
    type: String,
    default: '',
  },

  webp: {
    type: String,
    default: '',
  },

  alt: {
    type: String,
    default: 'picture',
  },
});

const emit = defineEmits(['load']);

const loaded = ref(null);

const load = () => {
  loaded.value = true;

  emit('load');
};
</script>

<style lang="scss" scoped>
picture {
  display: inline-block;
  vertical-align: middle;

  img {
    width: 100%;
    opacity: 0;
    transition: opacity $transition;

    &.v-lazy-image-loaded {
      opacity: 1;
    }
  }
}
</style>
