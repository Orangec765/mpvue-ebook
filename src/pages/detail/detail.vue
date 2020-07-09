<template>
  <div>
    <DetailBook :book="book" />
    <DetailStat
      :readers="book.readers"
      :readerNum="book.readerNum"
      :rankNum="book.rankNum"
      :rankAvg="book.rankAvg"
    />
    <DetailRate :rateValue="book.rateValue" @onRateChange="onRateChange" />
    <DetailContents :contents="contents" @readBook="readBook" />
    <DetailBottom :isInShelf="isInShelf" @handleShelf="handleShelf" />
  </div>
</template>

<script>
import {
  bookDetail,
  bookRankSave,
  bookContents,
  bookIsInShelf,
  bookShelfSave
} from '../../api'
import { getStorageSync } from '../../api/webchat'
import DetailBook from '../../components/detail/DetailBook'
import DetailStat from '../../components/detail/DetailStat'
import DetailRate from '../../components/detail/DetailRate'
import DetailBottom from '../../components/detail/DetailBottom'
import DetailContents from '../../components/detail/DetailContents'
export default {
  components: {
    DetailBook,
    DetailStat,
    DetailRate,
    DetailContents,
    DetailBottom
  },
  data() {
    return {
      book: {},
      contents: [],
      isInShelf: false
    }
  },

  methods: {
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
    // 加入书架
    handleShelf() {
      console.log(1)
      const openId = getStorageSync('openId')
      const { fileName } = this.$route.query
      if (!this.isInShelf) {
        bookShelfSave({ openId, fileName }).then(res => {
          this.getBookIsInShelf()
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
    readBook(href) {
      console.log(href)
    },
    getBookContents() {
      const { fileName } = this.$route.query
      if (fileName) {
        bookContents({ fileName }).then(res => {
          this.contents = res.data.data
        })
      }
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
