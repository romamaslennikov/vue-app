<template lang="pug">
  main.content(
    :class="`-${$route.name}`"
    @wheel="onWheel($event)"
    v-touch:release="swipeHandlerEnd"
    v-touch:press="swipeHandlerStart")
    slot

</template>

<script>
import debounce from 'lodash.debounce';

let touchendY = 0;
let touchstartY = 0;

export default {
  name: 'ScrollPrevent',

  props: {
    stopNext: {
      default: false,
    },

    stopPrev: {
      default: false,
    },

    currentLinkArticle: {
      type: String,
      default: null,
    },
  },

  methods: {
    allow(e) {
      const { currentTarget } = e;

      const allowNext = !this.stopNext
        && ((currentTarget.scrollTop + currentTarget.offsetHeight)
          >= currentTarget.scrollHeight - 1);

      const allowPrev = !this.stopPrev && (currentTarget.scrollTop <= 0);

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
          this.$emit('onScrollPrev');

          if (allowPrev) {
            return;
          }
        } else {
          this.$emit('onScrollNext');

          if (allowNext) {
            if (this.currentLinkArticle) {
              document.location.href = this.currentLinkArticle;
            }

            return;
          }
        }

        if (touchstartY > touchendY) {
          this.$emit('callbackNext', true);
        }
      }

      e.stopPropagation();
    },

    swipeHandlerStart(e) {
      touchstartY = e?.changedTouches && e?.changedTouches[0]?.screenY;
    },

    onWheel(e) {
      const r = this.wheelHandler(this, e);

      if (!r) {
        e.stopPropagation();
      }
    },

    wheelHandler: debounce((vm, e) => {
      const { allowNext } = vm.allow(e);

      const { allowPrev } = vm.allow(e);

      if (e.deltaY > 0) {
        vm.$emit('onScrollNext');

        if (allowNext) {
          // if (vm.currentLinkArticle) {
          //   document.location.href = vm.currentLinkArticle;
          //
          //   return false;
          // }

          return true;
        }
      } else {
        vm.$emit('onScrollPrev');

        if (allowPrev) {
          return true;
        }
      }

      return null;
    }, 400, {
      leading: true,
      trailing: false,
      maxWait: 10,
    }),
  },
};
</script>

<style lang="sass" scoped></style>
