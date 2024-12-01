<template lang="pug">
  modal(
    :class-name-container="'modal-alert__container'"
    :class-name-modal="'modal-alert'"
    :name="name")
    .modal-alert__title(v-if="slots.title")
      slot(name="title")

    .modal-alert__text(v-if="slots.text")
      slot(name="text")

    slot(
      name="btn"
      v-if="slots.btn")
</template>

<script setup>
import { useSlots } from 'vue';
import Modal from '@/plugins/modal/Modal.vue';

defineProps({
  name: {
    type: String,
    required: true,
  },
});

const slots = useSlots();
</script>

<style lang="scss">
.modal-alert {
  &__container {
    width: 600px;
  }

  &__title {
    font-weight: bold;
  }

  &__text {
    font-weight: 400;
  }
}
</style>
