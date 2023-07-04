import { signUp, signIn } from '@/api/login';
import { getProfile, logOut } from '@/api/me';
import { setToken, removeToken } from '@/utils/auth';
import router from '@/router';
import { acceptHMRUpdate, defineStore } from 'pinia';

export const useMeStore = defineStore('me', {
  persist: true,

  state: () => (
    {
      user: null,
    }
  ),

  // getters: {},

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
      try {
        const res = await getProfile();

        if (res.error === 0) {
          this.setUser(res.data);
        }

        return (res.data);
      } catch (e) {
        return (e);
      }
    },

    signUp(data) {
      return (async () => signUp(data))();
    },

    signIn(data) {
      return (async () => signIn(data))();
    },

    async logOut(local) {
      console.log('---', 'logOut');

      if (!local) {
        const spinner = document.getElementById('spinner');

        spinner?.classList.remove('-hide');

        await logOut();

        spinner?.classList.add('-hide');
      }

      await router.push('/sign-in');

      this.setUser(null);

      this.removeToken();
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMeStore, import.meta.hot));
}

export default useMeStore;
