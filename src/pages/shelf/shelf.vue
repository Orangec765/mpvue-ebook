<template>
  <div>
    <ShelfUserInfo :userInfo="userInfo" :readDay="readDay" :num="shelfList.length" />
    <ShelfList :shelfList="shelfList"></ShelfList>
  </div>
</template>

<script>
import { shelfList, userDay } from '../../api'
import { getStorageSync } from '../../api/webchat'
import ShelfList from '../../components/shelf/ShelfList'
import ShelfUserInfo from '../../components/shelf/ShelfUserInfo'
export default {
  components: {
    ShelfList,
    ShelfUserInfo
  },
  data() {
    return {
      shelfList: [],
      userInfo: {},
      readDay: 0,
      num: ''
    }
  },
  methods: {
    // 获取用户天数
    getUserDay(openId) {
      userDay({ openId }).then(res => {
        const { data } = res.data
        this.readDay = data.day
      })
    },
    // 获取书架列表
    getShelfList(openId) {
      shelfList({ openId }).then(res => {
        this.shelfList = res.data.data
        this.shelfList.push({})
      })
    }
  },
  onShow() {
    const openId = getStorageSync('openId')
    // 获取用户信息
    this.userInfo = getStorageSync('userInfo')
    this.getUserDay(openId)
    this.getShelfList(openId)
  }
}
</script>

<style lang="scss" scoped></style>
