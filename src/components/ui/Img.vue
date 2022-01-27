/**
* @usage:
*
*   Img(src="landing/line")
*   Img(src="landing/line" :ext="'svg'" :alt="'text'")
*   Img(src="landing/line" :ext="'jpg'" :alt="'text'")
*/

<template lang="pug">
  v-lazy-image(
    @load="$emit('load')"
    width="10"
    height="10"
    :src="require(`@/assets/images/${src}.${(ext === 'svg' || ext === 'gif') ? ext : $store.getters['app/webp'] ? 'webp' : ext}`)"
    :alt="alt")
</template>

<script>
export default {
  name: 'Img',

  props: {
    src: {
      type: String,
      required: true,
    },

    ext: {
      type: String,
      default: 'png',
    },

    alt: {
      type: String,
      default: '',
    },
  },
};
</script>
