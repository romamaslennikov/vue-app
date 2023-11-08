<template lang="pug">
.select.field__input-text(@click="show = !show")
  .select__placeholder(
    v-if="!model"
    :class="{'-active': model}") {{ placeholder }}

  .select__selected-option {{ options.filter((i) => i.value === model)[0]?.text }}

  .select__arr.icon.icon__arr-b

  .select__drop(
    v-click-outside="onClickOutside"
    v-if="show")
    .select__item(
      @click="model = option.value"
      :key="index"
      v-for="(option, index) in options") {{ option.text }}

</template>

<script>
import { computed, ref } from 'vue';
import { useAppStore } from '@/stores/app';

export default {
  name: 'VSelect',

  props: {
    placeholder: {
      type: String,
      required: true,
    },

    modelValue: {
      type: [Object, null, String, Number],
      required: true,
    },

    options: {
      type: Array,
      required: true,
    },
  },

  setup(props, { emit }) {
    // data
    const appStore = useAppStore();
    const show = ref(null);

    // computed
    const isPortrait = computed(() => appStore.isPortrait);
    const model = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit('update:modelValue', value);

        emit('change');
      },
    });

    // methods
    function onClickOutside() {
      show.value = null;
    }

    // hooks

    return {
      isPortrait,
      show,
      onClickOutside,
      model,
    };
  },

  components: {},
};
</script>

<style lang="sass" scoped>
.select
  width: 100%
  position: relative
  display: flex
  flex-flow: row nowrap
  justify-content: space-between
  align-items: center
  background: $color-white
  color: #633187
  font-size: rem(16px)
  padding: rem(8px) rem(18px)
  border-radius: rem(80px)
  cursor: pointer

  &.-error
    border-color: $color-red

  &__placeholder
    &.-active
      transform: translateY(-100%)

  &__item
    padding: rem(8px) rem(18px)
    cursor: pointer

    &:hover
      background: $color-orange
      color: $color-white

  &__drop
    overflow: hidden
    position: absolute
    top: 100%
    left: rem(-1px)
    right: rem(-1px)
    z-index: 100
    background: $color-white
    border: rem(1px) solid $color-white
    border-radius: rem(20px)

  &__arr
    cursor: pointer
    font-size: 0.75em
    margin-left: 0.75em
    position: relative

</style>
