<template lang="pug">
  component(
    :class="[$style.r, { [$style.error]: error }, modifier]"
    :is="tag")
    input(
      :disabled="disabled"
      :id="id ? id : null"
      :value="value"
      type="radio"
      v-model="model")
    i
</template>

<script setup>
/*
 * @usage:
 * radio-box(value="foo" v-model="selected" :error="false")
 * radio-box(value="bar" v-model="selected" :error="false")
 *  */

defineProps({
  id: {
    type: String,
    default: '',
  },

  tag: {
    type: String,
    default: 'span',
  },

  modifier: {
    type: String,
    default: '',
  },

  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
  value: {
    type: [Boolean, Object, String, Number],
    default: false,
  },
});

const model = defineModel();
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
    background: $color-grey;
    border: rem(1px) solid transparent;
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
      background: $color-blue;

      // box-shadow: 0 0 0 rem(8px) inset;
    }
  }
}
</style>
