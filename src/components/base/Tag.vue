<template>
  <div class="tag-wrapper" @click="onClick">
    <div class="tap">{{text}}</div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ""
    }
  },
  methods: {
    onClick() {
      this.$emit("onClick");
    }
  }
};
</script>

<style lang="scss" scoped>
.tag-wrapper {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  padding: 6px 17px;
  background: #f7f7f9;
  border-radius: 16px;
  .tap {
    width: 100%;
    white-space: nowrap;
    font-size: 14px;
    overflow: hidden;
    color: #272e37;
    text-overflow: ellipsis;
  }
}
</style>
