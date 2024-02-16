/**
* @usage:
* VSelect(
* :search="true"
* :fetch-search="true"
* @fetch-search="search($event)"
* prop-value="id"
* prop-text="name"
* :class="{ '-error': v.cityId.$error }"
* v-model="form.cityId"
* :placeholder="'Выберите город'"
* :options="cities || []")
*/

<template lang="pug">
  .select.field__input(
    :class="{ '-show': show }"
    @click="onClick")
    .select__placeholder(
      v-if="!model && !focus"
      :class="{ '-active': model }") {{ placeholder }}

    .select__selected-option(
      v-if="!focus")
      | {{ options.filter((i) => i[propValue] === model)[0]?.[propText] }}

    input.select__input(
      v-else
      v-model="term"
      placeholder="Поиск..."
      ref="input"
      type="text"
      @blur="focus = false"
      @input="onInput($event)")

    .select__arr.icon.icon__arr-b2(v-if="!pending")
      v-loading.select__pending(v-if="search && fetchSearch && pending")

      .select__drop(
        v-click-outside="onClickOutside"
        v-if="show")
        .select__item(
          @click.stop="model = option[propValue]; show = false"
          :key="index"
          v-for="(option, index) in filtered") {{ option[propText] }}

        .select__item(v-if="!filtered.length") Данных нет

</template>

<script>
import { computed, ref, nextTick } from 'vue';
import { useAppStore } from '@/stores/app';

export default {
  name: 'VSelect',

  emits: ['fetchSearch', 'update:modelValue', 'change'],

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

    propValue: {
      type: String,
      default: 'value',
    },

    propText: {
      type: String,
      default: 'text',
    },

    search: {
      type: Boolean,
      default: false,
    },

    fetchSearch: {
      type: Boolean,
      default: false,
    },

    pending: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { emit }) {
    // data
    const appStore = useAppStore();
    const show = ref(null);
    const input = ref(null);
    const focus = ref(false);
    const term = ref('');

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
    const filtered = computed(() => {
      if (!props.search || props.fetchSearch) {
        return props.options;
      }

      return props.options.filter((i) => i[props.propText]
        .toLowerCase()
        .includes(term.value.toLowerCase()));
    });

    // methods
    function onClickOutside() {
      show.value = null;
    }

    function onClick() {
      show.value = !show.value;

      if (props.search) {
        focus.value = true;

        nextTick(() => {
          input.value.focus();
        });
      }
    }

    function onInput(e) {
      if (props.fetchSearch) {
        emit('fetchSearch', e);
      } else {
        console.log('простой поиск');
      }
    }

    // hooks

    return {
      filtered,
      onInput,
      onClick,
      input,
      isPortrait,
      show,
      onClickOutside,
      model,
      emit,
      focus,
      term,
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
  cursor: pointer

  &.-show
    border-radius: rem(6px) rem(6px) 0 0

  &.-error
    border-color: $color-red

  &__pending
    left: auto
    right: 0.6rem

  &__input
    width: 100%
    background: transparent
    border: 0
    color: inherit
    padding: 0

  &__placeholder
    &.-active
      transform: translateY(-100%)

  &__item
    padding: rem(18px) rem(30px)
    cursor: pointer
    text-align: left
    border-bottom: rem(1px) solid $color-grey
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
