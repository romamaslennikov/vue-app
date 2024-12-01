<template lang="pug">
  .select.field__input(
    :class="{ '-show': show }"
    @click="onClick"
    v-click-outside="onClickOutside")
    .select__placeholder(
      :class="{ select__placeholder_active: model?.length }"
      v-if="placeholder || model?.length")
      | {{ model?.length ? model.map((i) => i.text).join(', ') : placeholder }}

    .select__arr.icon.icon__arr-b2

    .select__drop(
      @click.stop
      v-if="show")
      label.select__item(
        :key="index"
        v-for="(option, index) in options"
        v-show="options.length")
        CheckBox.select__checkbox(
          :error="false"
          :value="option"
          @change="$emit('change', option)"
          v-model="model")
        div {{ option.text }}

      .select__item(v-if="!options.length") Данных нет
</template>

<script setup>
import { ref } from 'vue';

const show = ref(false);
const model = defineModel();
defineEmits(['change']);
defineProps({
  placeholder: {
    type: String,
    default: '',
  },

  options: {
    type: Array,
    required: true,
  },
});
function onClickOutside() {
  show.value = false;
}
function onClick() {
  show.value = !show.value;
}
</script>

<style lang="sass" scoped>
.select
  width: 100%
  position: relative
  display: flex
  flex-flow: row nowrap
  justify-content: space-between
  align-items: center
  cursor: pointer

  &__checkbox
    width: rem(25px)
    height: rem(25px)

  &.-show
    border-radius: rem(6px) rem(6px) 0 0

  &.-error
    border-color: $color-red

  &__placeholder
    opacity: 0.5
    text-align: left
    &_active
      opacity: 1

  &__item
    padding: rem(18px) rem(30px)
    cursor: pointer
    text-align: left
    border-bottom: rem(1px) solid $color-grey
    display: flex
    flex-flow: row nowrap
    align-items: center
    gap: rem(10px)
    &:last-child
      border-bottom: 0
    &:hover
      color: $color-white

  &__drop
    position: absolute
    top: 100%
    left: rem(-1px)
    right: rem(-1px)
    z-index: 100
    border-radius: 0 0 rem(6px) rem(6px)
    background-color: $color-black
    border: rem(1px) solid $color-grey
    line-height: 133%
    color: rgba(255, 255, 255, .5)
    font-size: rem(18px)
    max-height: 30vh
    overflow: auto
    +scrollbars(rem(6px), $color-white, rem(6px), $color-black)

  &__arr
    cursor: pointer
    font-size: 0.75em
    margin-left: 0.75em
    position: relative

    .-show &
      scale: 1 -1
</style>
