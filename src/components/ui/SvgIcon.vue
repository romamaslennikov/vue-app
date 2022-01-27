/**
* @usage:
*
*   SvgIcon(id="yandex-music-logo")
*/

<template lang="pug">
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
