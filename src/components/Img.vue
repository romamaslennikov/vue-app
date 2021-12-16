<template lang="pug">
  // use: Img(src="landing/line")
  v-lazy-image(
    @load="$emit('load')"
    width="10"
    height="10"
    :src="require(`@/assets/images/${src}.${type === 'svg' ? 'svg' : $store.getters['app/webp'] ? 'webp' : 'png'}`)"
    alt="")
</template>

<script>
export default {
  name: 'Img',

  props: {
    src: String,
    type: String,
  },

  // props: ['src', 'type'],
};
</script>

<style lang="sass" scoped></style>
