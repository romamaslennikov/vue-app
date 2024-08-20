/** * @usage: * * v-img(src="@images/logo.png" webp="@images/logo.webp" avif="@images/logo.avif"
alt="") */

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

<script>
import { ref } from 'vue';

export default {
  name: 'v-img',

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

<style lang="scss" scoped>
picture {
  display: inline-block;
  vertical-align: middle;

  img {
    width: 100%;
    height: auto;
    opacity: 0;
    transition: opacity $transition;

    &.v-lazy-image-loaded {
      opacity: 1;
    }
  }
}
</style>
