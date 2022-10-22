/**
* @usage:
*
* VImg(:src="logo" :srcset="logoWebp" alt="text")
*
*/

<template lang="pug">
picture
  source(
    :srcset="srcset"
    type="image/webp")

  VLazyImage(
    width="10"
    height="10"
    @load="$emit('load')"
    :src="src"
    :alt="alt")
</template>

<script>
import VLazyImage from 'v-lazy-image';

export default {
  name: 'VImg',

  props: {
    src: {
      type: String,
      required: true,
    },
    srcset: {
      type: String,
      default: '',
    },
    alt: { type: String },
  },

  components: {
    VLazyImage,
  },
};
</script>

<style lang="sass" scoped>
picture
  display: inline-flex
  vertical-align: middle

  img
    width: 100%
</style>
