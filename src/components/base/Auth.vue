<template>
  <div class="auth-wrapper">
    <div class="auth">
      <div class="auth-info">
        <div class="auth-img">
          <ImageView
            src="https://www.youbaobao.xyz/mpvue-res/logo.jpg"
            round
            height="100%"
            mode="scaleToFill"
          />
        </div>
        <div class="sub-title">登录小慕读书</div>
        <div class="title">全场好书免费读</div>
      </div>

      <button class="auth-btn" @getuserinfo="getUserInfo" open-type="getUserInfo">授权登录</button>
    </div>
  </div>
</template>

<script>
import ImageView from "./ImageView";
export default {
  components: {
    ImageView
  },
  methods: {
    getUserInfo() {
      this.$emit("getUserInfo");
    }
  }
};
</script>

<style lang="scss" scoped>
.auth-wrapper {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  background: #999;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  .auth {
    width: 270px;
    height: 240px;
    background: #f5f5f5;
    border-radius: 18px;
    position: relative;
    .auth-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 22.5px;
      .auth-img {
        width: 74px;
        height: 74px;
      }
      .sub-title {
        font-size: 13px;
        color: #999;
        line-height: 18.5px;
        margin-top: 18px;
      }
      .title {
        font-size: 16.5px;
        color: #333;
        font-weight: 400;
        line-height: 22.5px;
        margin-top: 3.5px;
      }
    }
    .auth-btn {
      background-image: linear-gradient(90deg, #1ea3f5 0%, #0f87fc 100%);
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      border-radius: 0 0 18px 18px;
      font-size: 15px;
      height: 49px;
      line-height: 49px;
      color: #ffffff;
    }
  }
}
</style>
