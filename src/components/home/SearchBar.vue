<template>
  <div class="search-bar">
    <div class="search-bar-wrapper" @click="onSearchBarClick">
      <van-icon class="search" name="search" color="#ADB4BE" />
      <input
        type="text"
        class="search--bar-input"
        :placeholder="hotSearch==''?'搜索':hotSearch"
        :focus="focus"
        :disabled="disabled"
        :maxlength="limit"
        v-model="searchWord"
        @input="onChange"
        confirm-type="search"
        @confirm="onConfirm"
        placeholder-style="color:#adb4be;font-size: 15px"
      />
      <van-icon
        v-if="searchWord.length>0"
        class="clear"
        tag="a"
        color="#ccc"
        @click="onClearClick"
        name="clear"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "search-bar",
  props: {
    focus: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 50
    },
    hotSearch: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      searchWord: ""
    };
  },
  methods: {
    onSearchBarClick() {
      this.$emit("onClick");
    },
    onClearClick() {
      this.searchWord = "";
      this.$emit("onClear");
    },
    onChange(e) {
      const { value } = e.mp.detail;
      this.$emit("onChange", value);
    },
    onConfirm(e) {
      const { value } = e.mp.detail;
      this.$emit("onConfirm", value);
    },
    setValue(v) {
      this.searchWord = v;
    },
    getValue() {
      return this.searchWord;
    }
  }
};
</script>
<style lang="scss" scoped>
.search-bar {
  padding: 15px 15.5px;
  .search-bar-wrapper {
    background: #f5f7f9;
    border-radius: 20px;
    height: 40px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    align-self: center;
    padding: 12px 17px;
    .search--bar-input {
      flex: 1;
      margin: 0 8px;
      color: #333;
      font-size: 15px;
    }
    .search,
    .clear {
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
}
</style>