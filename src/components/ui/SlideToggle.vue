<template lang="pug">
  div(
    :style="props.open ? 'height: auto' : null"
    :class="$style.slide")
    slot
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

<style lang="sass" module>
.slide
  overflow: hidden
  position: relative
  transition: all $transition ease-out
  height: 0
</style>
