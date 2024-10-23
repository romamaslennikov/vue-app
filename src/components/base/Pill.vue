<template lang="pug">
  .pill(:class="modifier")
    .pill__text {{ text }}
</template>

<script setup>
defineProps({
  modifier: {
    type: String,
    default: '',
  },

  text: {
    type: String,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.pill {
  display: inline-flex;
  padding: rem(8px) rem(15px);
  color: $color-blue;
  background: $color-white;
  border-radius: rem(61px);

  &__text {
    font-size: rem(20px);
    line-height: rem(24px);
    font-weight: 500;
  }
}
</style>
