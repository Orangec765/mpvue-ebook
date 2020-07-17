<template>
  <div>
    <DetailBook :book="book" />
    <DetailStat
      :readers="book.readers"
      :readerNum="book.readerNum"
      :rankNum="book.rankNum"
      :rankAvg="book.rankAvg"
    />
    <DetailBottom :is-in-shelf="isInShelf" @handleShelf="handleShelf" @readBook="readBook" />
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
import { getStorageSync, showToast } from '../../api/webchat'

import DetailBook from '../../components/detail/DetailBook'
import DetailStat from '../../components/detail/DetailStat'
import DetailRate from '../../components/detail/DetailRate'
import DetailContents from '../../components/detail/DetailContents'
import DetailBottom from '../../components/detail/DetailBottom'
export default {
  components: {
    DetailBottom,
    DetailContents,
    DetailRate,
    DetailStat,
    DetailBook
  },
  data() {
    return {
      book: {},
      contents: [],
      isInShelf: false
    }
  },

  methods: {
    // 加入书架
    handleShelf() {
      const openId = getStorageSync('openId')
      const { fileName } = this.$route.query
      if (!this.isInShelf) {
        bookShelfSave({ openId, fileName }).then(res => {
          this.getBookIsInShelf()
          showToast('加入成功')
        })
      } else {
        var vue = this
        mpvue.showModal({
          title: '提示',
          content: `是否确定将《${this.book.title}》移出书架？`,
          success(res) {
            if (res.confirm) {
              bookShelfremove({ openId, fileName }).then(vue.getBookIsInShelf)
            }
          }
        })
      }
    },
    readBook(href) {
      const query = {
        fileName: this.book.fileName,
        opf: this.book.opf
      }
      if (href) {
        const index = href.indexOf('/')
        if (index >= 0) {
          query.navigation = href.slice(index + 1)
        } else {
          query.navigation = href
        }
      }
      // console.log(href)
      if (this.book && this.book.fileName) {
        this.$router.push({
          path: '/pages/read/main',
          query
        })
      }
    },
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
    }
  },
  mounted() {
    this.getBookDetail()
    this.getBookIsInShelf()
    this.getBookContents()
  }
}
</script>

<style lang="scss" scoped></style>
