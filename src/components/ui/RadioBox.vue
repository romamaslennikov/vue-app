/** * @usage: radio-box(value="foo" v-model="selected" :error="false") radio-box(value="bar"
v-model="selected" :error="false") */

<template lang="pug">
  span(:class="[$style.r, { [$style.error]: error }]")
    input(
      :disabled="disabled"
      :value="value"
      type="radio"
      v-model="model")
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

<style lang="scss" module>
.r {
  position: relative;
  display: inline-flex;
  width: $control-size;
  min-width: $control-size;
  height: $control-size;
  vertical-align: middle;
  cursor: pointer;

  i {
    position: absolute;
    inset: 0;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: transparent;
    background: #b3ddca;
    border: rem(1px) solid #b3ddca;
    border-radius: 100%;
    flex-flow: row nowrap;
    line-height: 1;
  }

  &.error {
    i {
      border-color: $color-red;
    }
  }

  input {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    margin: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;

    &:checked + i {
      color: #b3ddca;
      background: $color-orange;
      box-shadow: 0 0 0 rem(8px) inset;
    }
  }
}
</style>
