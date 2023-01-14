/**
* @usage:
*
* VImg(src="logo.png" webp="logo.webp" avif="logo.avif" alt="alt")
*
*/

<template lang="pug">
picture
  source(
    v-if="avif"
    :srcset="avif"
    type="image/avif")

  source(
    v-if="webp"
    :srcset="webp"
    type="image/webp")

  img(
    :class="{'v-lazy-image-loaded': loaded}"
    loading="lazy"
    decoding="async"
    width="10"
    height="10"
    @load="load"
    :src="src"
    :alt="alt")
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'VImg',

  props: {
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
      default: 'text',
    },
  },

  setup(props, { emit }) {
    const loaded = ref(null);

    const load = () => {
      loaded.value = true;

      emit('load');
    };

    return {
      loaded,
      load,
    };
  },
};
</script>

<style lang="sass" scoped>
picture
  display: inline-block
  vertical-align: middle

  img
    width: 100%

:deep(.v-lazy-image)
  opacity: 0
  transition: opacity $transition

  &.v-lazy-image-loaded
    opacity: 1
</style>
