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
    const hash = route?.fullPath;

    if (hash) {
      setTimeout(() => {
        router.push(hash);
      }, 200);
    }
  }

  return {
    toAnchor,
  };
}
