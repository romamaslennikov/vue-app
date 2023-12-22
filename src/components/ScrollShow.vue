/**
* @usage:
*
* <ScrollShow />
*/

<template>
  <div class="observer-move" ref="node">
    <div class="slide" :class="origin" :style="{ 'transition-delay': delay }">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScrollShow',

  props: {
    delay: {
      default: 0,
    },

    origin: {
      default: 'top',
    },

    speed: {
      default: '.4s',
    },
  },

  data() {
    return {
      observer: null,
    };
  },

  methods: {
    onIntersection(entries) {
      entries.forEach((entry) => {
        // entry.target.classList.toggle('-visible', entry.isIntersecting);

        if (entry.isIntersecting) {
          entry.target.classList.add('-visible');

          this.$emit('visible');
        }
      });
    },

    initObserver() {
      this.observer = new IntersectionObserver(this.onIntersection, {
        root: null,
        threshold: 0.5,
      });

      this.observer.observe(this.$refs.node);
    },
  },

  mounted() {
    this.initObserver();
  },
};
</script>

<style lang="sass" scoped>
$size: 1.5rem

.slide
  opacity: 0
  transition: all $transition linear
  transition-duration: v-bind(speed)

  &.top
    transform: translateY($size)

  &.right
    transform: translateX($size)

  &.left
    transform: translateX(-$size)

  &.bottom
    transform: translateY(-$size)

  &.fade
    opacity: 0

  .-visible > &
    opacity: 1
    transform: none
</style>
