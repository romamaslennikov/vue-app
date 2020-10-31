/* eslint-disable */
import modernizr from 'modernizr';
import Vue from 'vue';

const app = {
  state: {
    isPortrait: null,
    isMobile: null,
    showMobileNav: null,
    windowWidth: null,
    scrollY: null,
    webp: null,
  },
  mutations: {
    DETECT_WEBP: (state) => {
      const isSafari = navigator.userAgent.indexOf('Safari') !== -1
        && navigator.userAgent.indexOf('Chrome') === -1;

      state.webp = !isSafari;

      modernizr.on('webp', (result) => {
        if (!result) {
          state.webp = false;
        }
      });
    },

    UPDATE_IS_MOBILE: (state, isMobile) => {
      state.isMobile = isMobile;
    },

    SHOW_MOBILE_NAV: (state, show) => {
      state.showMobileNav = show;
    },

    UPDATE_IS_PORTRAIT: (state, isPortrait) => {
      state.isPortrait = isPortrait;
    },

    UPDATE_WINDOW_WIDTH(state, width) {
      state.windowWidth = width
    },

    UPDATE_WINDOW_SCROLL_Y(state, val) {
      state.scrollY = val
    },
  },
  actions: {},
};

export default app;
