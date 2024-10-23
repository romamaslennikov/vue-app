<template lang="pug">
  component(
    :class="icon"
    :is="tag")
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: true,
  },

  tag: {
    type: String,
    default: 'span',
  },
});
</script>
