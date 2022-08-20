const app = {
  namespaced: true,

  state: {
    isPortrait: null,
    isMobile: null,
    showMobileNav: null,
  },

  getters: {
    isPortrait: (state) => state.isPortrait,
    isMobile: (state) => state.isMobile,
    showMobileNav: (state) => state.showMobileNav,
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
  },

  actions: {},
};

export default app;
