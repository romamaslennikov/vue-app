<template lang="pug">
  svg:   use(:xlink:href="`${sprite}#${id}`")
</template>

<script setup>
/*
 * @usage: svg-icon(id="name")
 *  */
import sprite from '@/assets/images/sprite.svg';

defineProps({
  id: {
    type: String,
    required: true,
  },
});
</script>
