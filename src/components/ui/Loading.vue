<template lang="pug">
  span(:class="$style.spinner")
</template>

<style lang="sass" module>
.spinner
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  display: inline-block
  width: 1.5em
  height: 1.5em

  &[inline]
    position: relative
    transform: none
    top: auto
    left: auto

  &:after
    position: relative
    content: ""
    display: block
    width: 1.5em
    height: 1.5em
    margin: 0
    border-radius: 50%
    border: .75em solid $color-white
    border-color: $color-red $color-white $color-red $color-white
    animation: lds-dual-ring 1.2s linear infinite

@keyframes lds-dual-ring
  0%
    transform: rotate(0)

  100%
    transform: rotate(360deg)
</style>
