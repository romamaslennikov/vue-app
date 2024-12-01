import { onMounted, ref } from 'vue';

const mobileNav = ref(false);

function showMobileNav(b) {
  mobileNav.value = !!b;
}

function hideMobileNav() {
  mobileNav.value = false;
}

export default function useMobileNav() {
  onMounted(() => window.addEventListener('resize', hideMobileNav));

  return {
    mobileNav,
    showMobileNav,
    hideMobileNav,
  };
}
