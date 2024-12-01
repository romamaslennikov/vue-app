<template lang="pug">
  .tag(:class="[modifier]")
    font-icon.tag__icon(
      :icon="icon"
      v-if="icon")

    .tag__text(v-if="text") {{ text }}
</template>

<script setup>
defineProps({
  modifier: {
    type: String,
    default: '',
  },

  icon: {
    type: String,
    default: '',
  },

  text: {
    type: String,
    default: '',
  },
});
</script>

<style scoped lang="scss">
.tag {
  display: inline-flex;
  align-items: center;
  padding: rem(3px);
  color: $color-white;
  background: $color-blue;
  border-radius: rem(61px);
  flex-flow: row nowrap;
  gap: rem(4px);

  &_large {
    padding: rem(8px);
    border-radius: rem(161px);
    gap: rem(14px);
  }

  &__text {
    overflow: hidden;
    padding-right: rem(5px);
    font-size: rem(10px);
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 600;

    .tag_large & {
      padding-right: rem(16px);
      font-size: rem(26px);
    }
  }

  &__icon {
    display: inline-grid;
    place-items: center center;
    width: rem(24px);
    height: rem(24px);
    font-size: rem(14px);
    color: $color-blue;
    background: $color-white;
    border-radius: 100%;
    line-height: 1;

    .tag_large & {
      width: rem(63px);
      height: rem(63px);
      font-size: rem(24px);
    }
  }
}
</style>
