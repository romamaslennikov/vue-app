/**
* @usage:
*
*   RadioBox(value="foo" v-model="selected" :error="false")
*   RadioBox(value="bar" v-model="selected" :error="false")
*   RadioBox(value="baz" v-model="selected" :error="false")
*
* data(){
*    return {
*      selected: '',
*    }
*  }
*/

<template lang="pug">
  span(:class="[$style.r, {[$style.error]: error}]")
    input(
      type="radio"
      :checked="isChecked"
      :value="value"
      @change="$emit('change', $event.target.value)")
    i.icon.i_ch
</template>

<script>
export default {
  name: 'RadioBox',

  model: {
    prop: 'modelValue',
    event: 'change',
  },

  props: {
    error: { type: Boolean },
    modelValue: { default: '' },
    value: { type: String, default: undefined },
  },

  computed: {
    isChecked() {
      return this.modelValue === this.value;
    },
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
  margin-right: $margin-right
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
      color: $color-black

</style>
