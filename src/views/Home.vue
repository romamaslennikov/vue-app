<template lang="pug">
main.content
  .container
    p
      br
    p
      br
    p
      a(href="signalapp://activate/?password=457687") open signalapp 457687
    p
      br
    p
      br

    VImg(
      :src="logo"
      :srcset='logoWebp'
      alt="logo-text")

    | Home {{ formatNumber(123333) }}

    | {{ declOfNum(2, ['телефон', 'телефона', 'телефонов']) }}

    p(v-html="typograf('Мы используем куки <br> на всех своих сайтах, включая этот, потому что без кук вообще весь интернет работал бы через жопу')")

    SvgIcon(
      @click="onClick"
      id="ch")

</template>

<script>
import { defineAsyncComponent } from 'vue';
import { formatNumber, declOfNum, typograf } from '@utils/format';
import VLazyImage from 'v-lazy-image';
import logo from '@images/logo.png';
import logoWebp from '@images/logo.webp';
import ch from '@images/svg-to-font/ch.svg';

export default {
  name: 'Home',

  inject: ['eventHub'],

  components: {
    VImg: defineAsyncComponent(() => import('@/components/ui/VImg.vue')),
    SvgIcon: defineAsyncComponent(() => import('@/components/ui/SvgIcon.vue')),
    VLazyImage,
  },

  data() {
    return {
      logo,
      logoWebp,
      ch,
    };
  },

  methods: {
    formatNumber,

    declOfNum,

    typograf,

    onClick() {
      this.eventHub.emit('test', [2, 1]);
    },
  },

  mounted() {},
};
</script>

<style lang="sass">
.img
  width: 100px
</style>
