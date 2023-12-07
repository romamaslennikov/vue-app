import { getProfile, logOut } from '@/api/me';
import { setToken, removeToken } from '@/utils/auth';
import { acceptHMRUpdate, defineStore } from 'pinia';

export const useMeStore = defineStore('me', {
  persist: true,

  state: () => (
    {
      user: null,
    }
  ),

  actions: {
    setUser(o) {
      this.user = o;
    },

    setToken: (t) => {
      setToken(t);
    },

    removeToken: () => {
      removeToken();
    },

    async getProfile() {
      const { data = null } = await getProfile();

      if (data) {
        this.setUser(data);
      }
    },

    async logOut(local) {
      console.log('---', 'logOut');

      if (!local) {
        const spinner = document.getElementById('spinner');

        spinner?.classList.remove('-hide');

        await logOut();

        spinner?.classList.add('-hide');
      }

      this.setUser(null);

      this.removeToken();
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMeStore, import.meta.hot));
}

export default useMeStore;
