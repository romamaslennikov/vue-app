/* eslint-disable */
import modernizr from 'modernizr';
import Vue from 'vue';

const app = {
  state: {
    ready: null,
    isPortrait: null,
    isMobile: null,
    showMobileNav: null,
    windowWidth: null,
    scrollY: null,
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

    UPDATE_READY: (state, ready) => {
      state.ready = ready;
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
  actions: {
    ShowMobileNav: ({commit}, show) => {
      commit('SHOW_MOBILE_NAV', show);
    },
  },
};

export default app;
