const getters = {
  ready: (state) => state.app.ready,
  isPortrait: (state) => state.app.isPortrait,
  isMobile: (state) => state.app.isMobile,
  showMobileNav: (state) => state.app.showMobileNav,
  windowWidth: (state) => state.app.windowWidth,
  scrollY: (state) => state.app.scrollY,
  token: (state) => state.account.token,
  user: (state) => state.account.user,
  webp: (state) => state.app.webp,
};

export default getters;
