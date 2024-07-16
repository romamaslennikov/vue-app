/** * @usage: * * svg-icon(id="name") */

<template lang="pug">
  svg: use(:xlink:href="`${sprite}#${id}`")
</template>

<script>
import sprite from '@/assets/images/sprite.svg';

export default {
  name: 'SvgIcon',

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  setup() {
    return {
      sprite,
    };
  },
};
</script>
