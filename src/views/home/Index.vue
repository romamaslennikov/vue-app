<template lang="pug">
  main.content
    .container {{ a }}
</template>

<script setup>
import { ref } from 'vue';

const a = ref('Home');
</script>
