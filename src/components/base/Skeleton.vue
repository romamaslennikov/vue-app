<template lang="pug">
  div(:class="$style.skeleton")
</template>

<script>
export default {
  name: 'Skeleton',
};
</script>

<style module lang="sass">
.skeleton
  display: inline-flex
  position: relative
  overflow: hidden
  box-shadow: 0 rem(4px) rem(10px) 0 rgba(33, 33, 33, 0.15)
  border-radius: rem(4px)
  background: rgba(255, 255, 255, .1)
  &::before
    pointer-events: none
    content: ''
    display: block
    position: absolute
    left: rem(-150px)
    top: 0
    height: 100%
    width: rem(150px)
    background: linear-gradient(to right, transparent 0%, rgba(204, 204, 204, .25) 50%, transparent 100%)
    animation: load 1s cubic-bezier(0.4, 0.0, 0.2, 1) infinite

@keyframes load
  from
    left: rem(-150px)
  to
    left: 100%
</style>
