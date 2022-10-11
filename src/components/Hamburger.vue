<template lang="pug">
.hamburger-wrapper(@click="showNav")
  .hamburger(:class="{'-active': mobileNav}"): .hamburger-box: .hamburger-inner

</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Hamburger',

  data() {
    return {};
  },

  computed: {
    ...mapGetters({
      mobileNav: 'app/showMobileNav',
    }),
  },

  methods: {
    ...mapMutations({
      showMobileNav: 'app/SHOW_MOBILE_NAV',
    }),

    showNav() {
      this.showMobileNav(!this.mobileNav);
    },

    swipeDetect() {
      const body = document.querySelector('body');

      let xDown = null;
      let yDown = null;

      const getTouches = (evt) => evt.touches || evt.originalEvent.touches;

      const handleTouchStart = (evt) => {
        const firstTouch = getTouches(evt)[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
      };

      const handleTouchMove = (evt) => {
        if (!xDown || !yDown) {
          return;
        }

        const xUp = evt.touches[0].clientX;
        const yUp = evt.touches[0].clientY;

        const xDiff = xDown - xUp;
        const yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
          if (xDiff > 0) {
            /* left swipe */
          } else {
            /* right swipe */
          }
        } else if (yDiff > 0) {
          // this.$store.commit('SHOW_MOBILE_NAV', false);
        } else {
          /* down swipe */
        }

        xDown = null;
        yDown = null;
      };

      body.addEventListener('touchstart', handleTouchStart, false);

      body.addEventListener('touchmove', handleTouchMove, false);

      document.addEventListener('scroll', () => {
        if (this.mobileNav) {
          this.showMobileNav(false);
        }
      });
    },
  },

  mounted() {},

  components: {},
};
</script>

<style lang="sass" scoped>
.hamburger-wrapper
  width: rem(68px)
  height: rem(68px)
  min-width: rem(68px)
  display: flex
  flex-flow: row nowrap
  justify-content: center
  align-items: center
  z-index: 200
  cursor: pointer

  +media($port)
    width: rem(30px)
    height: rem(30px)
    min-width: rem(30px)

.hamburger
  cursor: pointer
  transition-timing-function: linear
  transition-duration: 0.15s
  transition-property: opacity, filter
  display: inline-flex
  flex-flow: column nowrap
  justify-content: center
  align-items: center
  width: 100%
  height: 100%
  z-index: 101
  position: relative

  .hamburger-box
    position: relative
    display: inline-block
    width: 100%
    height: 100%

  .hamburger-inner
    position: absolute
    width: 100%
    height: rem(2px)
    transition-property: all
    background-color: $color-white
    transition-timing-function: cubic-bezier(.16,1,.3,1)
    transition-duration: 0.22s
    top: 50%
    display: block
    transform: translateY(-50%)

    .-black-menu:not(.-lock) &
      background-color: $color-black

  .hamburger-inner:after, .hamburger-inner:before
    display: block
    content: ""
    position: absolute
    height: rem(2px)
    background-color: $color-white
    left: 0

    .-black-menu:not(.-lock) &
      background-color: $color-black

  .hamburger-inner:before
    width: 100%
    top: rem(-6px)
    transition: top 0.1s ease-in 0.25s, opacity 0.1s ease-in

  .hamburger-inner:after
    width: 100%
    transition: bottom 0.1s ease-in 0.25s, width 0.2s ease-in, transform 0.22s cubic-bezier(.16,1,.3,1)
    bottom: rem(-6px)
    left: 0

  &.-active
    .hamburger-inner
      transition-delay: 0.12s
      transition-timing-function: cubic-bezier(.16,1,.3,1)
      transform: rotate(225deg)
      box-shadow: none

  &.-active  .hamburger-inner:before
    top: 0
    transition: top 0.1s ease-out, opacity 0.1s ease-out 0.12s
    opacity: 0
    width: 100%

  &.-active  .hamburger-inner:after
    width: 100%
    bottom: 0
    transition: bottom 0.1s ease-out, transform 0.22s cubic-bezier(.16,1,.3,1) 0.12s
    transform: rotate(-90deg)
</style>
