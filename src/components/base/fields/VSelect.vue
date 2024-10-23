<template lang="pug">
  .select(
    :class="{ '-show': show }"
    @click="onClick")
    .select__placeholder(
      :class="{ '-active': model }"
      v-if="model === null && !focus") {{ placeholder }}

    input-text(
      :errors="[]"
      :icon-after="'icon-font-arr-b'"
      :modifier="'field__input_grey'"
      @blur="focus = false"
      @input="onInput($event)"
      ref="input"
      v-model="term")

    .select__selected-option(v-if="!focus")
      | {{ options?.filter((i) => i[propValue] === model)[0]?.[propText] }}

    // .select__arr.icon.icon_arr-b2(v-if="!pending")

    v-loading.select__pending(v-if="search && fetchSearch && pending")

    .select__drop(
      v-click-outside="onClickOutside"
      v-if="show")
      .select__item(
        :key="index"
        @click.stop="model = option[propValue]; show = false"
        v-for="(option, index) in filtered") {{ option[propText] }}

      .select__item(v-if="!filtered.length") Данных нет
</template>

<script>
/*
 * @usage: VSelect(:search="true" :fetch-search="true" @fetch-search="search($event)" prop-value="id" prop-text="name" :class="{ '-error': v.cityId.$error }" v-model="form.cityId" :placeholder="'Выберите город'" :options="cities || []")
 *  */
import { computed, ref, nextTick } from 'vue';
import { useAppStore } from '@/stores/app';
import InputText from '@/components/base/fields/InputText.vue';

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

      return props.options.filter((i) =>
        i[props.propText].toLowerCase().includes(term.value.toLowerCase()),
      );
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

  components: {
    InputText,
  },
};
</script>

<style lang="scss" scoped>
.select {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-flow: row nowrap;
  cursor: pointer;

  &__selected-option {
    position: absolute;
    inset: 0;
    display: grid;
    align-items: center;
    overflow: hidden;
    padding: rem(10px);
    text-overflow: ellipsis;
    white-space: nowrap;
    grid-template-columns: 1fr;
  }

  &.-show {
    border-radius: rem(6px) rem(6px) 0 0;
  }

  &.-error {
    border-color: $color-red;
  }

  &__pending {
    right: 0.6rem;
    left: auto;
  }

  &__placeholder {
    &.-active {
      transform: translateY(-100%);
    }
  }

  &__item {
    padding: rem(10px) rem(20px);
    cursor: pointer;
    text-align: left;
    border-bottom: rem(1px) solid $color-grey;

    &:last-child {
      border-bottom: 0;
    }

    &:hover {
      color: $color-blue;
    }
  }

  &__drop {
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    z-index: 100;
    overflow: auto;
    padding-top: rem(10px);
    padding-bottom: rem(10px);
    margin-top: rem(1px);
    max-height: 30vh;
    font-size: rem(16px);
    background: rgba(241, 241, 241, 1);
    border-radius: rem(10px);
    line-height: 133%;

    @include scrollbars(rem(6px), $color-white, rem(6px), $color-black);
  }
}
</style>
