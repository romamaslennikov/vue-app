<template lang="pug">
  .loading-spinner
    div
</template>

<script>
export default {
  name: 'Loading',
};
</script>

<style lang="sass">
@import "../styles/mixins/mixins"
@import "../styles/vars/variables"

.loading-spinner
  background-color: rgba(255, 255, 255, .9)
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0
  height: auto
  z-index: 1

  &.-inline
    background: none
    border-radius: 6vmin
    position: relative
    display: inline-block
    width: 1.5em
    height: 1.5em
    vertical-align: middle

  div
    position: absolute
    top: 50%
    left: 50%
    margin: 0
    text-align: center
    z-index: 1000
    transform: translateX(-50%) translateY(-50%)
    width: 1.5em
    height: 1.5em
    font-size: 1em

    &::after, &::before
      width: 1.5em
      height: 1.5em
      margin: 0 0 0 -.75em

    &::before
      position: absolute
      content: ""
      top: 0
      left: 50%
      border-radius: 500em
      border: .2em solid rgba(0, 0, 0, .2)

    &::after
      position: absolute
      content: ""
      top: 0
      left: 50%
      animation: loader .6s linear
      animation-iteration-count: infinite
      border-radius: 500em
      border-color: #fff transparent transparent
      border-style: solid
      border-width: .2em
      box-shadow: 0 0 0 1px transparent

@keyframes loader
  from
    transform: rotate(0)

  to
    transform: rotate(360deg)
</style>
