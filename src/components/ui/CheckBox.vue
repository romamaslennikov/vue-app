/**
* @usage:
*
*   <CheckBox value="foo" v-model="selected" :error="false" />
*   <CheckBox value="foo" v-model="selected" :error="false" />
*
* data(){
*    return {
*      selected: [],
*    }
*  }
*/

<template>
  <span :class="[$style.c, { [$style.error]: error }]">
    <input :disabled="disabled" v-model="model" type="checkbox" :value="value" />
    <i class="icon icon__ch" />
  </span>
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

<style lang="sass" module>
.c
  position: relative
  display: inline-flex
  width: $size-custom
  min-width: $size-custom
  height: $size-custom
  vertical-align: middle
  cursor: pointer

  +media($port)
    width: rem(14px)
    min-width: rem(14px)
    height: rem(14px)

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
    color: transparent
    background: #B3DDCA
    font-size: rem(20px)

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
      color: $color-orange

</style>
