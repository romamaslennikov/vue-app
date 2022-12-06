import { defineStore, acceptHMRUpdate } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => (
    {
      isPortrait: null,
      isMobile: null,
      mobileNav: null,
    }
  ),

  // getters: {},

  actions: {
    updateIsMobile(b) {
      this.isMobile = b;
    },

    showMobileNav(b) {
      this.mobileNav = b;
    },

    updateIsPortrait(b) {
      this.isPortrait = b;
    },
    
    gtm(data) {
      /* eslint-disable */
      window.dataLayer?.push({
        event: 'eventTracking',
        action: data[1],
        category: data[0],
        label: data[2]
      });
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot));
}

export default useAppStore;
