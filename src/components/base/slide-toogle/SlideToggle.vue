<template lang="pug">
  span(@click="slideToggle")
    slot(name="heading")

  div(
    :class="$style.slide"
    :style="open ? 'height: auto' : null"):   slot(name="content")
</template>

<script setup>
/*
 * @usage:
 * slide-toggle(:open="false")
 *  template(#heading) heading
 *  template(#content) content
 * */
defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});

function slideToggle(e) {
  const { currentTarget } = e;

  const { nextSibling } = currentTarget;

  const { scrollHeight } = nextSibling;

  const { height } = nextSibling.style;

  currentTarget.classList.toggle('-active');

  currentTarget.parentNode?.classList.toggle('-active');

  if (!height) {
    nextSibling.style.height = `${scrollHeight}px`;

    nextSibling.ontransitionend = () => {
      nextSibling.style.height = 'auto';
    };
  } else {
    nextSibling.ontransitionend = null;

    nextSibling.style.height = `${scrollHeight}px`;

    setTimeout(() => {
      nextSibling.removeAttribute('style');
    });
  }
}
</script>

<style lang="scss" module>
.slide {
  position: relative;
  overflow: hidden;
  height: 0;
  transition: all $transition ease-out;
}
</style>
