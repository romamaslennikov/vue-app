<template lang="pug">
  component.btn(
    :class="[{ btn_pending: pending }, modifier]"
    :disabled="tag === 'button' ? disabled : null"
    :href="tag === 'a' ? href : null"
    :is="tag"
    :to="tag === 'router-link' ? to : null"
    :type="tag === 'button' ? type : null")
    font-icon.btn__icon(
      :icon="iconBefore"
      v-if="iconBefore")
    span(v-html="typograf(text)")
    font-icon.btn__icon(
      :icon="iconAfter"
      v-if="iconAfter")
    spinner(v-if="pending")
</template>

<script setup>
import { typograf } from '@/utils/format';

defineProps({
  href: {
    type: String,
    default: '',
  },

  to: {
    type: String,
    default: '',
  },

  modifier: {
    type: String,
    default: '',
  },

  iconBefore: {
    type: String,
    default: '',
  },

  iconAfter: {
    type: String,
    default: '',
  },

  disabled: {
    type: Boolean,
    default: false,
  },

  pending: {
    type: Boolean,
    default: false,
  },

  tag: {
    type: String,
    default: 'button',
  },

  type: {
    type: String,
    default: 'button',
  },

  text: {
    type: String,
    default: '',
  },
});
</script>

<style scoped lang="scss">
.btn {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: rem(8px) rem(16px);
  font-size: rem(16px);
  font-family: $family-alt;
  text-align: center;
  text-decoration: none;
  color: $color-grey;
  background: $color-blue;
  border: rem(1px) solid transparent;
  border-radius: rem(8px);
  cursor: pointer;
  text-transform: uppercase;
  flex-flow: row nowrap;
  gap: rem(8px);
  line-height: 1.35;
  font-weight: 400;
  letter-spacing: 0.07em;

  &__icon {
    font-size: rem(24px);
    line-height: 1;
  }

  &_outline {
    color: $color-blue;
    background: transparent;
    border-color: $color-blue;
  }

  &_pending {
    color: transparent;
    pointer-events: none;
  }

  &:hover {
    opacity: 0.75;
  }

  &:active {
    transform: scale(0.95);
  }
}
</style>
