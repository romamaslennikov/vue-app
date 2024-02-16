/**
* @usage:
*
*  radio-box(value="foo" v-model="selected" :error="false")
*  radio-box(value="bar" v-model="selected" :error="false")
*/

<template lang="pug">
  span(:class="[$style.r, { [$style.error]: error }]")
    input(
      :disabled="disabled"
      type="radio"
      v-model="model"
      :value="value")
    i
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'RadioBox',

  props: {
    disabled: { type: Boolean },
    error: { type: Boolean },
    modelValue: {
      type: [Array, Boolean, String],
      default: false,
    },
    value: {
      type: [Boolean, Object, String],
      default: false,
    },
  },

  setup(props, { emit }) {
    const model = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit('update:modelValue', value);
      },
    });

    return {
      model,
    };
  },
};
</script>

<style lang="sass" module>
.r
  position: relative
  display: inline-flex
  width: $size-custom
  min-width: $size-custom
  height: $size-custom
  vertical-align: middle
  cursor: pointer

  &.error
    i
      border-color: $color-red

  i
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    display: inline-flex
    flex-flow: row nowrap
    justify-content: center
    align-items: center
    line-height: 1
    border: rem(1px) solid #B3DDCA
    background: #B3DDCA
    color: transparent
    border-radius: 100%

  input
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    margin: 0
    z-index: 1
    cursor: pointer
    opacity: 0

    &:checked + i
      color: #B3DDCA
      background: $color-orange
      box-shadow: 0 0 0 rem(8px) inset

</style>
