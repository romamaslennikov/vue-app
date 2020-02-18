/* eslint-disable */

const app = {
  state: {
    isPortrait: null,
    isMobile: null,
    showMobileNav: null,
    windowWidth: null,
    scrollY: null,
  },
  mutations: {
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
