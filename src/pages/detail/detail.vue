<template>
  <div>
    <DetailBottom :is-in-shelf="isInShelf" @handleShelf="handleShelf" />
    <DetailBook :book="book" />
    <DetailStat
      :readers="book.readers"
      :readerNum="book.readerNum"
      :rankNum="book.rankNum"
      :rankAvg="book.rankAvg"
    />
    <DetailRate :rateValue="book.rateValue" @onRateChange="onRateChange" />
    <DetailContents :contents="contents" @readBook="readBook" />
  </div>
</template>

<script>
import {
  bookDetail,
  bookRankSave,
  bookContents,
  bookIsInShelf,
  bookShelfSave,
  bookShelfremove
} from '../../api'
import { getStorageSync } from '../../api/webchat'
import DetailBottom from '../../components/detail/DetailBottom'
import DetailBook from '../../components/detail/DetailBook'
import DetailStat from '../../components/detail/DetailStat'
import DetailRate from '../../components/detail/DetailRate'

import DetailContents from '../../components/detail/DetailContents'
export default {
  components: {
    DetailBottom,
    DetailBook,
    DetailStat,
    DetailRate,
    DetailContents
  },
  data() {
    return {
      book: {},
      contents: [],
      isInShelf: false
    }
  },

  methods: {
    getBookContents() {
      const { fileName } = this.$route.query
      if (fileName) {
        bookContents({ fileName }).then(res => {
          this.contents = res.data.data
        })
      }
    },
    // 获取图书详情
    getBookDetail() {
      const openId = getStorageSync('openId')
      const { fileName } = this.$route.query
      if (fileName && openId) {
        bookDetail({ openId, fileName }).then(res => {
          this.book = res.data.data
        })
      }
    },
    // 获取图书分类
    getBookIsInShelf() {
      const openId = getStorageSync('openId')
      const { fileName } = this.$route.query
      if (fileName && openId) {
        bookIsInShelf({ openId, fileName }).then(res => {
          const { data } = res.data
          if (data.length === 0) {
            this.isInShelf = false
          } else {
            this.isInShelf = true
          }
          // this.book = res.data.data
        })
      }
    },
    onRateChange(val) {
      const openId = getStorageSync('openId')
      const { fileName } = this.$route.query
      bookRankSave({ openId, fileName, rank: val }).then(res => {
        this.getBookDetail()
      })
    },
    // 加入书架
    handleShelf() {
      const openId = getStorageSync('openId')
      const { fileName } = this.$route.query
      if (!this.isInShelf) {
        bookShelfSave({ openId, fileName }).then(this.getBookIsInShelf)
      } else {
        var vue = this
        mpvue.showModal({
          title: '提示',
          content: `是否确定将《${this.book.title}》移出书架？`,
          success(res) {
            if (res.confirm) {
              bookShelfremove({ openId, fileName }).then(vue.getBookIsInShelf)
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    },

    readBook(href) {
      console.log(href)
    }
  },
  mounted() {
    this.getBookDetail()
    this.getBookContents()
    this.getBookIsInShelf()
  }
}
</script>

<style lang="scss" scoped></style>
