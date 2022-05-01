/* eslint-disable */
import modernizr from 'modernizr';

const app = {
  namespaced: true,

  state: {
    isPortrait: null,
    isMobile: null,
    showMobileNav: null,
    webp: null,
  },

  getters: {
    isPortrait: (state) => state.isPortrait,
    isMobile: (state) => state.isMobile,
    showMobileNav: (state) => state.showMobileNav,
    webp: (state) => state.webp,
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
  },

  actions: {},
};

export default app;
