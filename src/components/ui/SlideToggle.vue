<template lang="pug">
  div(
    :class="$style.slide"
    :style="props.open ? 'height: auto' : null"):   slot
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    return {
      props,
    };
  },
};
</script>

<style lang="scss" module>
.slide {
  position: relative;
  overflow: hidden;
  height: 0;
  transition: all $transition ease-out;
}
</style>
