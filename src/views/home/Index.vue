<template lang="pug">
  main.content
    .container
      p portrait: {{ isPortrait }}

      button(
        @click="showModal"
        type="button")
        | Show modal

      div {{ result }}

      button(
        @click="showModalAlert"
        type="button")
        | Show modal-alert

      modal(name="myModal")
        | Some important content here
        |
        p
          a(
            @click.prevent="$modal.cancel('myModal')"
            href="#") cancel myModal
        |
        |
        p
          a(
            @click.prevent="showModalAlert"
            href="#") show modal-alert

      hamburger

      modal-alert(name="modal-alert")
        template(#title) title

        template(#text) text

        template(#btn)
          v-button(
            @click="$modal.accept('modal-alert')"
            text="btn")

      slide-toggle
        template(#heading) heading d

        template(#content) content
</template>

<script setup>
import { ref, inject } from 'vue';
import useIsPortrait from '@/utils/useIsPortrait';
import ModalAlert from '@/components/modal-alert/ModalAlert.vue';
import SlideToggle from '@/components/base/slide-toogle/SlideToggle.vue';

const $modal = inject('$modal');
const result = ref('');
const { isPortrait } = useIsPortrait();

async function showModal() {
  result.value = '';

  try {
    const res = await $modal.show('myModal');

    console.log(res);

    result.value = 'Modal accepted';
  } catch (e) {
    console.log(e);

    result.value = 'Modal cancelled';
  }
}

async function showModalAlert() {
  try {
    await $modal.show('modal-alert');
  } catch (e) {
    console.log(e);
  }
}
</script>
