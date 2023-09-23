/**
 * @usage:
 *
 *   import useToAnchor from '@/utils/toAnchor';
 *   const { toAnchor } = useToAnchor();
 *   onMounted(() => {
 *       setTimeout(() => {
 *         toAnchor();
 *       }, 1000);
 *     });
 */

import { useRouter, useRoute } from 'vue-router';

export default function useToAnchor() {
  const router = useRouter();
  const route = useRoute();

  async function toAnchor() {
    const { hash = '' } = route;

    if (hash) {
      await router.push(hash);
    }
  }

  return {
    toAnchor,
  };
}
