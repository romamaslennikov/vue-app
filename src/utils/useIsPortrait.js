import { onMounted, onUnmounted, ref } from 'vue';

export default function useIsPortrait() {
  const isPortrait = ref(false);

  function update() {
    isPortrait.value = window.matchMedia('(orientation: portrait)').matches;
  }

  update();

  onMounted(() => window.addEventListener('resize', update));

  onUnmounted(() => window.removeEventListener('resize', update));

  return {
    isPortrait,
  };
}
