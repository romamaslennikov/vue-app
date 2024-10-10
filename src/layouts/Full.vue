<template lang="pug">
  router-view(v-slot="{ Component }")
    transition(
      mode="out-in"
      name="fade")
      keep-alive
        component(:is="Component")
</template>

<script setup></script>
