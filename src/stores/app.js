import { defineStore, acceptHMRUpdate } from 'pinia';
import { isTouch } from '@/utils/device';

export const useAppStore = defineStore('app', {
  persist: true,

  state: () => ({
    isPortrait: null,
    isMobile: isTouch(),
    mobileNav: null,
  }),

  // getters: {},

  actions: {
    updateIsMobile() {
      this.isMobile = isTouch();
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
        label: data[2],
      });
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot));
}

export default useAppStore;
