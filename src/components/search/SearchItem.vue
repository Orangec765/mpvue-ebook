<template>
  <div class="search-item-wrapper" @click="onClick">
    <div class="search-item-icon">
      <div class="icon-wrapper">
        <van-icon :name="icon" color="rgba(0,0,0,.5)" :style="{width:'20px',height:'20px'}" />
      </div>
    </div>
    <div class="search-item-info">
      <div class="search-item-text">{{title}}</div>
      <div class="search-item-sub-title">{{subTitle}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    subTitle: String,
    icon: String
  },
  methods: {
    onClick() {
      this.$emit("onClick");
    }
  }
};
</script>

<style lang="scss" scoped>
.search-item-wrapper {
  padding: 15px;
  height: 36.5px;
  display: flex;
  align-items: center;
  .search-item-icon {
    .icon-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #f7f7f9;
    }
  }
  .search-item-info {
    margin-left: 10px;
    width: 85%;
    .search-item-text {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #333;
      font-size: 14px;
      line-height: 20px;
    }
    .search-item-sub-title {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: rgba(0, 0, 0, 0.45);
      font-size: 12px;
      line-height: 16.5px;
    }
  }
}
</style>
