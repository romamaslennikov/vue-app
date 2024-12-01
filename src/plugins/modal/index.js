import { reactive } from 'vue';
import Modal from './Modal.vue';

const body = document.querySelector('body');

const current = reactive({
  name: [],
  resolve: null,
  reject: null,
});

function toggleName(name) {
  if (name) {
    const i = current.name.indexOf(name);

    if (i > -1) {
      current.name.splice(i, 1);
    }
  } else {
    current.name = [];
  }

  if (!current.name.length) {
    body.style.overflow = '';
  }
}

const api = {
  active() {
    return current.name;
  },

  show(name) {
    current.name.push(name);

    body.style.overflow = 'hidden';

    return new Promise((resolve = () => {}, reject = () => {}) => {
      current.resolve = resolve;
      current.reject = reject;
    });
  },

  accept(name) {
    current.resolve();

    toggleName(name);
  },

  cancel(name) {
    current.reject();

    toggleName(name);
  },
};

const plugin = {
  install(App) {
    // Register global component
    App.component('Modal', Modal);

    // Provide API
    App.provide('$modal', api);
  },
};

export default plugin;
