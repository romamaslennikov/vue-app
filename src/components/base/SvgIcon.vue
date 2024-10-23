<template lang="pug">
  svg:   use(:xlink:href="`${sprite}#${id}`")
</template>

<script>
/*
 * @usage: svg-icon(id="name")
 *  */
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
