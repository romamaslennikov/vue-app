import { signUp, signIn } from '@/api/login';
import { getProfile, logOut } from '@/api/me';
import { setToken, removeToken } from '@/utils/auth';
import router from '@/router';
import { acceptHMRUpdate, defineStore } from 'pinia';

export const useMeStore = defineStore('me', {
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

    signUp(o, data) {
      return (async () => signUp(data))();
    },

    signIn(o, data) {
      return (async () => signIn(data))();
    },

    async logOut(local) {
      console.log('---', 'logOut');

      if (!local) {
        (document.getElementById('spinner')).classList.remove('-hide');

        await logOut();

        (document.getElementById('spinner')).classList.add('-hide');
      }

      await router.push('/sign_in');

      this.$reset();

      this.removeToken();
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMeStore, import.meta.hot));
}

export default useMeStore;
