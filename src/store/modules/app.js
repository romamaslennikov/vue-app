const app = {
  namespaced: true,

  state: {
    isPortrait: null,
    isMobile: null,
    showMobileNav: null,
    webp: true,
  },

  getters: {
    isPortrait: (state) => state.isPortrait,
    isMobile: (state) => state.isMobile,
    showMobileNav: (state) => state.showMobileNav,
    webp: (state) => state.webp,
  },

  mutations: {
    DETECT_WEBP: (state) => {
      // check_webp_feature:
      // 'feature' can be one of 'lossy', 'lossless', 'alpha' or 'animation'.
      // 'callback(feature, result)' will be passed back the detection result (in an asynchronous way!)
      function checkWebpFeature(feature, callback) {
        const kTestImages = {
          lossy: 'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
          lossless: 'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==',
          alpha: 'UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==',
          animation: 'UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA',
        };
        const img = new Image();

        img.onerror = () => {
          callback(feature, false);
        };

        img.onload = () => {
          const result = (img.width > 0) && (img.height > 0);
          callback(feature, result);
        };

        img.src = `data:image/webp;base64,${kTestImages[feature]}`;
      }

      checkWebpFeature('lossy', (feature, result) => {
        state.webp = result;

        if (!result) {
          document.documentElement.classList.add('no-webp');
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
