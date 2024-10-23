<template lang="pug">
  .field
    .field__input-wrapper
      input.field__input(
        :autocomplete="autocomplete"
        :class="[{ field__input_error: errors?.length }, modifier, { field__input_pr: iconAfter }, { field__input_pl: iconBefore }]"
        :id="id || null"
        :maxlength="maxlength"
        :name="name"
        :placeholder="placeholder"
        :type="type"
        @blur="$emit('blur', model)"
        @change="$emit('change', model)"
        @focus="$emit('focus', model)"
        @input="$emit('input', model)"
        v-model="model"
        value="")

      font-icon.field__icon(
        :icon="iconAfter"
        v-if="iconAfter")

    .field__error(v-if="errors?.length")
      template(v-if="Array.isArray(errors)")
        div(
          :key="index"
          v-for="(error, index) in errors") {{ typograf(error) }}

      template(v-else) {{ typograf(errors) }}
</template>

<script setup>
import { typograf } from '@/utils/format';

defineProps({
  iconBefore: {
    type: String,
    default: '',
  },

  iconAfter: {
    type: String,
    default: '',
  },

  modifier: {
    type: String,
    default: '',
  },

  autocomplete: {
    type: String,
    default: '',
  },

  id: {
    type: String,
    default: '',
  },

  errors: {
    type: [Array, String],
    default: '',
  },

  name: {
    type: String,
    default: '',
  },

  type: {
    type: String,
    default: 'text',
  },

  placeholder: {
    type: String,
    default: '',
  },

  maxlength: {
    type: [String, Number],
    default: '',
  },
});

defineEmits(['change', 'input', 'focus', 'blur']);

const model = defineModel();
</script>

<style scoped lang="scss">
.field {
  display: flex;
  width: 100%;
  flex-flow: column nowrap;
  gap: rem(5px);

  &__icon {
    position: absolute;
    top: 50%;
    right: rem(10px);
    display: inline-grid;
    place-items: center center;
    width: rem(22px);
    height: rem(22px);
    font-size: rem(15px);
    color: $color-white;
    background: $color-blue;
    border-radius: 100%;
    transform: translateY(-50%);
    line-height: 1;
  }

  &__input-wrapper {
    position: relative;
    display: flex;
  }

  &__error {
    font-size: rem(12px);
    color: $color-red;
    line-height: 1.2;
  }

  &__input {
    padding: rem(8px) rem(16px);
    font-size: rem(16px);
    border: 1px solid rgba(177, 183, 196, 0.85);
    border-radius: rem(8px);
    box-shadow: 0 1px 2px 1px rgba(38, 39, 40, 0.2) inset;
    flex: 1;
    line-height: 1.4;

    @include placeholder {
      color: $color-grey;
      opacity: 1;
    }

    &_error {
      border-color: $color-red !important;
    }

    &_grey {
      padding: rem(10px);
      background: rgba(241, 241, 241, 1);
      border-color: rgba(241, 241, 241, 1);
      box-shadow: none;
    }

    &_pr {
      padding-right: 2.5rem;
    }

    &_pl {
      padding-left: 2.5rem;
    }
  }
}
</style>
