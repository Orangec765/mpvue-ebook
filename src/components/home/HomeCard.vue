<template>
  <div class="home-card">
    <div class="home-card-inner">
      <div class="user-info">
        <div class="avatar-wraper">
          <ImageView :src="avatar" round height="100%" mode="scaleToFill"></ImageView>
        </div>
        <div class="nickname">{{nickname}}</div>
        <div class="shelf-text">书架共有{{data.num}}本好书</div>
        <div class="round-item"></div>
        <div class="shelf-text">特别精选</div>
      </div>

      <div class="book-info">
        <div class="book-wrapper">
          <div
            class="book-img-wrapper"
            v-for="(item,index) in bookList"
            :key="index"
            @click="onBookClick"
          >
            <ImageView :src="item.cover"></ImageView>
          </div>
        </div>
        <div class="shelf-wrapper">
          <div class="shelf">书架</div>
          <van-icon class="arrow" size="11px" name="arrow" color="#828489"></van-icon>
        </div>
      </div>
      <div class="feedback-wrapper" @click="onFeedBackClick">
        <span>反馈</span>
      </div>
    </div>
    <van-dialog id="van-dialog"></van-dialog>
  </div>
</template>

<script>
import ImageView from "@/components/base/ImageView";
import DiaLog from "vant-weapp/dist/dialog/dialog";
export default {
  components: {
    ImageView
  },
  props: {
    data: Object,
    hasSign: {
      type: Boolean,
      default: false
    },
    signDay: {
      type: Number,
      default: 0
    }
  },
  computed: {
    avatar() {
      return (
        (this.data && this.data.userInfo && this.data.userInfo.avatarUrl) || ""
      );
    },
    nickname() {
      return (
        (this.data && this.data.userInfo && this.data.userInfo.nickName) || ""
      );
    },
    bookList() {
      return (this.data && this.data.bookList) || [];
    }
  },
  methods: {
    gotoShelf() {},
    onBookClick() {
      this.$emit("onClick");
    },
    sign() {},
    onFeedBackClick() {
      DiaLog.confirm({
        title: "反馈",
        message: "您是否确定提交反馈信息",
        confirmButtonText: "是",
        cancelButtonText: "否"
      })
        .then(() => {
          console.log("点击是");
        })
        .catch(() => {
          console.log("点击否");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.home-card {
  background: #505050;
  border-radius: 15px;
  margin: 22px 20px 0;
  position: relative;
  .home-card-inner {
    padding: 21.5px 17px 20px 20px;
    box-sizing: border-box;

    .user-info {
      display: flex;
      align-items: center;
      .avatar-wraper {
        width: 20px;
        height: 20px;
      }
      .nickname,
      .shelf-text {
        color: #fff;
        font-size: 12px;
      }
      .nickname {
        margin: 0 8.5px;
      }
      .shelf-text {
        opacity: 0.7;
      }
      .round-item {
        width: 4px;
        height: 4px;
        background: #a2a2a2;
        border-radius: 50%;
        margin: 0 8px;
      }
    }
    .book-info {
      display: flex;
      .book-wrapper {
        flex: 1;
        display: flex;

        margin-top: 20px;
        .book-img-wrapper {
          margin-right: 20px;
          width: 72px;
          height: 101px;
        }
      }
      .shelf-wrapper {
        display: flex;

        align-items: center;
        .shelf {
          width: 11px;
          color: #fff;
          opacity: 0.8;
          font-size: 11px;
          word-break: break-all;
          margin-right: 5px;
        }
      }
    }
    .feedback-wrapper {
      position: absolute;
      top: 0;
      margin-top: 19.5px;
      right: 0;
      z-index: 1;
      width: 44.5px;
      height: 23.5px;
      line-height: 23.5px;
      background: #707070;
      border-radius: 100px 0 0 100px;
      text-align: center;
      color: #fff;
      font-size: 11px;
    }
  }
}
</style>
