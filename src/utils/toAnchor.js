/**
 * @usage:
 *
 *   import useToAnchor from '@/utils/toAnchor';
 *   const { toAnchor } = useToAnchor();
 *   onMounted(() => {
 *      toAnchor();
 *  });
 */

import { useRouter, useRoute } from 'vue-router';

export default function useToAnchor() {
  const router = useRouter();
  const route = useRoute();

  async function toAnchor() {
    const { hash, fullPath } = route;

    if (hash) {
      setTimeout(() => {
        router.push(fullPath);
      }, 1000);
    }
  }

  return {
    toAnchor,
  };
}
