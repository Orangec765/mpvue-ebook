<template>
  <div>
    <div class="home" v-if="isAuth">
      <search-bar :disabled="true" @onClick="onSearchBarClick" :hotSearch="hotSearch"></search-bar>
      <HomeCard :data="homeCard" @onClick="onHomeBookClick" />
      <HomeBanner
        img="http://www.youbaobao.xyz/book/res/bg.jpg"
        title="mpvue2.0实战多端小程序上线了"
        subTitle="立即体验"
        @onClick="onBannerClick"
      />
      <div :style="{ marginTop: '23px' }">
        <HomBook
          title="为你推荐"
          :row="1"
          :col="3"
          :data="recommend"
          mode="col"
          btn-text="换一批"
          @onBookClick="onHomeBookClick"
          @onMoreClick="recommendChange('recommend')"
        />
      </div>
      <div :style="{ marginTop: '23px' }">
        <HomBook
          title="免费阅读"
          :row="2"
          :col="2"
          :data="freeRead"
          mode="row"
          btn-text="换一批"
          @onBookClick="onBookClick"
          @onMoreClick="recommendChange('freeRead')"
        />
      </div>
      <div :style="{ marginTop: '23px' }">
        <HomBook
          title="当前最热"
          :row="1"
          :col="4"
          :data="hotBook"
          mode="col"
          btn-text="换一批"
          @onBookClick="onHomeBookClick"
          @onMoreClick="recommendChange('hotBook')"
        />
      </div>
      <div :style="{ marginTop: '23px' }">
        <HomBook
          title="分类"
          :row="2"
          :col="2"
          :data="category"
          mode="category"
          btn-text="查看全部"
          @onBookClick="onCategoryMoreClick"
          @onMoreClick="onMoreClick"
        />
      </div>
    </div>
    <Auth v-if="!isAuth" @getUserInfo="init" />
  </div>
</template>
<script>
import SearchBar from '@/components/home/SearchBar'
import ImageView from '@/components/base/ImageView'
import HomeCard from '@/components/home/HomeCard'
import HomeBanner from '@/components/home/HomeBanner'
import HomBook from '@/components/home/HomeBook'
import Auth from '@/components/base/Auth'
import { getHomeData, recommend, freeRead, hotBook, register } from '@/api'
import {
  getSetting,
  getUserInfo,
  setStorageSync,
  getStorageSync,
  getUserOpenId,
  showLoading,
  hideLoading
} from '@/api/webchat'
export default {
  data() {
    return {
      isAuth: true,
      homeCard: {},
      hotSearch: '', //热门搜索
      banner: {}, //banner图
      recommend: [], //为你推荐
      freeRead: [], //免费阅读
      hotBook: [], //热门图书
      category: [] //分类
    }
  },
  components: {
    SearchBar,
    ImageView,
    HomeCard,
    HomeBanner,
    HomBook,
    Auth
  },

  methods: {
    recommendChange(key) {
      switch (key) {
        case 'recommend':
          recommend().then(res => {
            this.recommend = res.data.data
          })
          break
        case 'freeRead':
          freeRead().then(res => {
            this.freeRead = res.data.data
          })
          break
        case 'hotBook':
          hotBook().then(res => {
            this.hotBook = res.data.data
          })
          break
        default:
          break
      }
    },

    onSearchBarClick() {
      // 跳到搜索页
      this.$router.push({
        path: '/pages/search/main',
        query: {
          hotSearch: this.hotSearch
        }
      })
    },
    onBannerClick() {
      console.log('banner')
    },
    onCategoryMoreClick() {},
    onMoreClick() {
      console.log('onMoreClick')
    },
    onHomeBookClick(book) {
      this.$router.push({
        path: '/pages/detail/main',
        query: {
          fileName: book.fileName
        }
      })
    },
    getHomeData(openId, userInfo) {
      getHomeData({
        openId
      })
        .then(res => {
          const {
            data: {
              hotSearch: { keyword },
              shelf,
              banner,
              freeRead,
              hotBook,
              category,
              recommend,
              shelfCount
            }
          } = res.data
          // console.log(keyword, shelf, banner, freeRead, hotBook, category);
          this.hotSearch = keyword
          this.banner = banner
          this.freeRead = freeRead
          this.recommend = recommend
          this.hotBook = hotBook
          this.category = category
          this.homeCard = {
            bookList: shelf,
            num: shelfCount,
            userInfo
          }
          hideLoading()
        })
        .catch(err => {
          hideLoading()
          console.log('捕获异常', err)
        })
    },
    getUserInfo() {
      const onOpenIdComplete = (openId, userInfo) => {
        this.getHomeData(openId, userInfo)
        register(openId, userInfo)
      }
      getUserInfo(
        userInfo => {
          setStorageSync('userInfo', userInfo)
          const openId = getStorageSync('openId')
          if (!openId || openId.length === 0) {
            // 请求openId
            getUserOpenId(openId => onOpenIdComplete(openId, userInfo))
          } else {
            //得到openId
            onOpenIdComplete(openId, userInfo)
          }
        },
        () => {
          console.log('failed....') //获取用户信息，抛出异常
        }
      )
    },
    getSetting() {
      getSetting(
        'userInfo',
        () => {
          this.isAuth = true
          showLoading('正在加载')
          this.getUserInfo()
        },
        () => {
          this.isAuth = false
        }
      )
    },
    init() {
      this.getSetting()
    }
  },
  mounted() {
    // this.getHomeData();
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.home-book {
  margin-top: 23px;
}
.msg {
  font-size: 30px;
  color: red;
}
</style>
