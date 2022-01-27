<template lang="pug">
  .select(v-click-outside="onClickOutside")
    .select-head(@click="showDrop")
      input.input-text(
      :class="{'-pr': isSearch}"
        @input="search(selected)"
          @blur="cancel"
      v-model="selected"
        :readonly="!isSearch" type="text" maxlength="" :placeholder="placeholder")

      i.select-arr.-x.icon.i_x(
      @click.stop="cancel"
      v-if="remove && selected")

      i.select-arr.icon.i_chevron-down(:class="{'-active': show}")

    transition(name="slide-bottom-min")
      .select-drop.scrollbar-styled(v-if="show")
        .select-option(
        :key="index"
          @click="select(item, index)"
        v-for="(item, index) in (isSearch ? searchList : list)")
          template(v-if="propName") {{item[propName]}}

          template(v-else-if="obj") {{item}}

          template(v-else) {{item.text}}

</template>

<script>
export default {
  props: ['list', 'placeholder', 'first', 'propName', 'obj', 'remove', 'isSearch', 'empty'],
  name: 'Select',
  data() {
    return {
      ready: false,
      show: false,
      selected: this.first ? this.first : null,
      fullList: this.list,
      searchList: [],
    };
  },
  watch: {
    first(val) {
      this.selected = val;
    },

    empty(val) {
      if (!val) {
        this.selected = null;
      }
    },
  },
  methods: {
    showDrop() {
      this.show = !this.show;

      if (this.isSearch) {
        this.searchList = this.list;

        this.fullList = this.list;
      }
    },

    cancel() {
      this.selected = null;

      this.$emit('select', null);

      setTimeout(() => {
        this.searchList = this.list;
      }, 1000);
    },

    search(val) {
      if (val) {
        if (this.obj) {
          this.searchList = this.fullList.filter((item) => item.toLowerCase()
            .indexOf(val.toLowerCase()) > -1);
        } else {
          this.searchList = this.fullList.filter((item) => item.name.toLowerCase()
            .indexOf(val.toLowerCase()) > -1);
        }
      } else {
        this.searchList = this.fullList;
      }

      this.show = true;
    },

    onClickOutside() {
      this.close();
    },

    close() {
      this.show = false;
    },

    select(i, id) {
      this.close();

      if (this.propName) {
        this.selected = i[this.propName];
      } else if (this.obj) {
        this.selected = i;
      } else {
        this.selected = i.text;
      }

      if (this.obj) {
        this.$emit('select', id);
      } else {
        this.$emit('select', i);
      }

      if (this.isSearch) {
        setTimeout(() => {
          this.searchList = this.list;
        }, 1000);
      }
    },
  },
  mounted() {
    if (this.isSearch) {
      this.searchList = this.list;
    }
  },
  components: {},
};
</script>

<style lang="sass" scoped>
.select
  position: relative

  &.-disabled
    pointer-events: none

  &.-error
    animation: bounce-x $transition .25s

    .input-text
      border-color: $color-red

  .select-head
    cursor: pointer

  .select-option
    cursor: pointer
    margin-bottom: rem(5px)
    background: #F8F9FC
    padding: rem(5px) rem(8px)

    &:last-child
      margin-bottom: 0

    &:hover
      background: #DDE4F3

  .select-drop
    background-color: $color-white
    padding: rem(8px)
    position: absolute
    margin-top: rem(1px)
    top: 100%
    left: 0
    min-width: 100%
    z-index: 10000
    max-height: 30vh
    overflow: auto
    box-shadow: 0 2px 6px rgba(167, 175, 206, 0.7)
    text-align: left
    line-height: 1.2

    +scrollbars(6px, $color-red, 5px, $color-white)

  input
    cursor: pointer

    &:read-only
      pointer-events: none

  .select-arr
    position: absolute
    top: 50%
    right: rem(12px)
    transform: translateY(-45%)
    line-height: 1
    color: $color-red
    transition: all $transition ease-out

    &.-x
      transition: none
      transform: translateY(-45%) translateX(-150%) scale(0.8)
      color: $color-red

    &.-active
      transform: translateY(-45%) rotate(-180deg)

</style>
