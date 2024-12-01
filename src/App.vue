<template lang="pug">
  router-view(v-slot="{ Component }")
    keep-alive
      component(:is="Component")
</template>

<script setup>
function handleLoad() {
  if (window.PRERENDER_INJECTED) {
    setTimeout(() => {
      document.dispatchEvent(new Event('custom-render-trigger'));
    }, 3000);
  } else {
    const spinner = document.getElementById('spinner');

    spinner?.classList.add('-hide');
  }
}

window.addEventListener('load', handleLoad);
</script>
