<template lang="pug">
  div(
    :class="$style.slide"
    :style="open ? 'height: auto' : null"):   slot
</template>

<script setup>
defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" module>
.slide {
  position: relative;
  overflow: hidden;
  height: 0;
  transition: all $transition ease-out;
}
</style>
