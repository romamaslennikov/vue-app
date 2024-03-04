import { acceptHMRUpdate, defineStore } from 'pinia';

let resolve;

const body = document.querySelector('body');

export const usePopupStore = defineStore('popup', {
  state: () => (
    {
      current: null,
      popupData: null,
    }
  ),

  // getters: {},

  actions: {
    async show(o, data) {
      body.style.overflow = 'hidden';

      this.current = o;

      if (data) {
        this.popupData = data;
      }

      const promise = await new Promise((r) => {
        resolve = r;
      });

      return promise;
    },

    close(data) {
      body.style.overflow = '';

      if (resolve) {
        resolve(data);
      }

      this.current = null;

      this.popupData = null;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePopupStore, import.meta.hot));
}

export default usePopupStore;
