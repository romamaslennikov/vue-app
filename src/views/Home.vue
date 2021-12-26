<template lang="pug">
  main.content
    .container
      CheckBox(value="foo" v-model="values" :error="!values.includes('foo')")

      CheckBox(value="bar" v-model="values" :error="false")

      CheckBox(value="baz" v-model="values" :error="false")

      p {{ values }}

      RadioBox(value="foo" v-model="value" :error="!value")

      RadioBox(value="bar" v-model="value" :error="!value")

      RadioBox(value="baz" v-model="value" :error="!value")

      p {{ value }}
</template>

<script>
export default {
  name: 'Home',

  data() {
    return {
      values: ['foo'],
      value: '',
    };
  },

  methods: {},

  mounted() {},

  components: {},
};
</script>

<style lang="sass"></style>
