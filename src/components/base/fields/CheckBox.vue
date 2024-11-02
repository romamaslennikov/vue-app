<template lang="pug">
  component(
    :class="[$style.c, { [$style.error]: error }, modifier]"
    :is="tag")
    input(
      :disabled="disabled"
      :id="id ? id : null"
      :value="value"
      type="checkbox"
      v-model="model")
    font-icon(
      :icon="icon"
      :tag="'i'")
</template>

<script setup>
/*
 * @usage: check-box(id="id" value="foo" v-model="selected" :error="false")
 * const selected = ref([]);
 *  */
defineProps({
  tag: {
    type: String,
    default: 'span',
  },

  modifier: {
    type: String,
    default: '',
  },

  icon: {
    type: String,
    default: 'icon-font-ch',
  },

  id: {
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
.error {
  i {
    border-color: $color-red !important;
  }
}

.c {
  position: relative;
  display: inline-flex;
  width: $control-size;
  min-width: $control-size;
  height: $control-size;
  vertical-align: middle;
  cursor: pointer;
  align-self: flex-start;

  i {
    position: absolute;
    inset: 0;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: rem(24px);
    line-height: 1;
    color: transparent;
    background: $color-grey;
    border: rem(1px) solid transparent;
    flex-flow: row nowrap;
    border-radius: rem(4px);
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
      color: $color-white;
      background: $color-blue;
    }
  }
}
</style>
