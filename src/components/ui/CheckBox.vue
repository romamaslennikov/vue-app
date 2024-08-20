/** * @usage: check-box(value="foo" v-model="selected" :error="false") data(){ return { selected:
[], } } */

<template lang="pug">
  span(:class="[$style.c, { [$style.error]: error }]")
    input(
      :disabled="disabled"
      :value="value"
      type="checkbox"
      v-model="model")
    i.icon.icon_ch
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'CheckBox',

  props: {
    disabled: { type: Boolean },
    error: { type: Boolean },
    modelValue: {
      type: [Array, Boolean],
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
.c {
  position: relative;
  display: inline-flex;
  width: $control-size;
  min-width: $control-size;
  height: $control-size;
  vertical-align: middle;
  cursor: pointer;

  @include media($port) {
    width: rem(14px);
    min-width: rem(14px);
    height: rem(14px);
  }

  i {
    position: absolute;
    inset: 0;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: rem(20px);
    color: transparent;
    background: #b3ddca;
    border: rem(1px) solid #b3ddca;
    flex-flow: row nowrap;
    line-height: 1;

    .error & {
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
      color: $color-orange;
    }
  }
}
</style>
