/** * @usage: * * v-loading * v-loading(inline) */

<template lang="pug">
  span(:class="$style.spinner")
</template>

<script>
export default {
  name: 'VLoading',
};
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
    border-color: $color-red $color-white $color-red $color-white;
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
