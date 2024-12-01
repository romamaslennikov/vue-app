<template lang="pug">
  component(
    :class="[$style.spinner, modifier]"
    :is="tag")
</template>

<script setup>
/*
 * @usage: spinner or spinner(inline)
 *  */
defineProps({
  tag: {
    type: String,
    default: 'span',
  },

  modifier: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss" module>
.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;
  width: 1.5em;
  height: 1.5em;

  &[inline] {
    position: relative;
    transform: none;
    top: auto;
    left: auto;
  }

  &::after {
    content: '';
    position: relative;
    display: block;
    margin: 0;
    width: 1.5em;
    height: 1.5em;
    border: 0.75em solid $color-white;
    border-color: $color-blue $color-white $color-blue $color-white;
    border-radius: 50%;
    animation: lds-dual-ring 1.2s linear infinite;
  }
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
