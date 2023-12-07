<template lang="pug">
  section.full-page__section(
    @wheel="onWheel($event)"
    v-touch:release="swipeHandlerEnd"
    v-touch:press="swipeHandlerStart")
    slot
</template>

<script>
let touchendY = 0;
let touchstartY = 0;
let timeStamp = 0;
let prevTime = new Date().getTime();

export default {
  name: 'FullPageSection',

  props: {
    stopNext: {
      default: false,
    },

    stopPrev: {
      default: false,
    },
  },

  methods: {
    allow(e) {
      const { currentTarget } = e;

      const { overflow } = window.getComputedStyle(currentTarget);

      const visible = overflow === 'visible';

      const allowNext = !this.stopNext
        && (((currentTarget.scrollTop + window.innerHeight) >= currentTarget.scrollHeight - 1)
          || visible);

      const allowPrev = !this.stopPrev && ((currentTarget.scrollTop <= 0) || visible);

      return {
        allowNext,
        allowPrev,
      };
    },

    async swipeHandlerEnd(e) {
      touchendY = e.changedTouches && e.changedTouches[0]?.screenY;

      const swipeTolerance = 30;

      const { allowNext } = this.allow(e);

      const { allowPrev } = this.allow(e);

      if (Math.abs(touchstartY - touchendY) > swipeTolerance) {
        if (touchstartY < touchendY) {
          if (allowPrev) {
            this.$emit('onScrollPrev');

            return;
          }
        } else if (allowNext) {
          this.$emit('onScrollNext');

          return;
        }
      }

      e.stopPropagation();
    },

    swipeHandlerStart(e) {
      touchstartY = e?.changedTouches && e?.changedTouches[0]?.screenY;
    },

    onWheel(e) {
      const curTime = new Date().getTime();

      if (typeof prevTime !== 'undefined') {
        const timeDiff = curTime - prevTime;

        if (timeDiff > 40) {
          if ((e.timeStamp - timeStamp) > 600) {
            this.wheelHandler(e);

            timeStamp = e.timeStamp;
          }
        }
      }

      prevTime = curTime;
    },

    wheelHandler(e) {
      const { allowNext } = this.allow(e);

      const { allowPrev } = this.allow(e);

      if (e.deltaY > 0) {
        if (allowNext) {
          this.$emit('onScrollNext');

          return true;
        }
      } else if (allowPrev) {
        this.$emit('onScrollPrev');

        return true;
      }

      return null;
    },
  },
};
</script>

<style lang="sass" scoped>
.full-page__section
  position: relative
  height: 100dvh
  overflow: auto
  overflow-x: hidden

  +scrollbars(rem(2px), $color-orange, 0, transparent)
</style>
