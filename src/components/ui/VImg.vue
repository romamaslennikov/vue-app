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

<script setup>
// eslint-disable-next-line no-unused-vars
import VLazyImage from 'v-lazy-image';

defineProps({
  src: {
    type: String,
    required: true,
  },
  srcset: {
    type: String,
    default: '',
  },
  alt: { type: String },
});
</script>

<style lang="sass" scoped>
picture
  display: block

  img
    width: 100%
</style>
