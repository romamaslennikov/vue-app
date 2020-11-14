<template lang="pug">
  // use: SvgIcon(id="yandex-music-logo")
  svg: use(:xlink:href="require(`@/assets/images/sprite.svg`) + '#' + id")
</template>

<script>
export default {
  name: 'SvgIcon',

  props: ['id'],
};
</script>

<style lang="sass" scoped>
@import "../styles/mixins/mixins"
@import "../styles/vars/variables"

svg
  width: 1em
  height: 1em
</style>
