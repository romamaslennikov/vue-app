/**
* @usage:
*
*   CheckBox(value="foo" v-model="selected" :error="false")
*   CheckBox(value="bar" v-model="selected" :error="false")
*   CheckBox(value="baz" v-model="selected" :error="false")
*
* data(){
*    return {
*      selected: [],
*    }
*  }
*/

<!--suppress ALL -->
<template lang="pug">
  span(:class="[$style.c, {[$style.error]: error}]")
    input(
      type="checkbox"
      :checked="isChecked"
      :value="value"
      @change="updateInput")
    i.icon.i_ch
</template>

<script>
export default {
  name: 'CheckBox',

  model: {
    prop: 'modelValue',
    event: 'change',
  },

  props: {
    error: { type: Boolean },
    value: { type: String },
    modelValue: { default: '' },
    trueValue: { default: true },
    falseValue: { default: false },
  },

  computed: {
    isChecked() {
      if (this.modelValue instanceof Array) {
        return this.modelValue.includes(this.value);
      }
      // Note that `true-value` and `false-value` are camelCase in the JS
      return this.modelValue === this.trueValue;
    },
  },

  methods: {
    updateInput(event) {
      const isChecked = event.target.checked;
      if (this.modelValue instanceof Array) {
        const newValue = [...this.modelValue];
        if (isChecked) {
          newValue.push(this.value);
        } else {
          newValue.splice(newValue.indexOf(this.value), 1);
        }
        this.$emit('change', newValue);
      } else {
        this.$emit('change', isChecked ? this.trueValue : this.falseValue);
      }
    },
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
    border: rem(1px) solid $color-black
    color: transparent

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
      color: $color-black

</style>
