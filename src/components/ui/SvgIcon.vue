<template lang="pug">
  // use: SvgIcon(id="yandex-music-logo")
  svg: use(:xlink:href="require(`@/assets/images/sprite.svg`) + '#' + id")
</template>

<script>
export default {
  name: 'SvgIcon',

  props: {
    id: String,
  },
};
</script>
