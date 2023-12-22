/**
* @usage:
*
*  <SvgIcon id="name" />
*/

<template>
  <svg><use :xlink:href="`${sprite}#${id}`" /></svg>
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
