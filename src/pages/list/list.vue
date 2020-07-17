<template>
  <div>
    <SearchTable :data="data" />
  </div>
</template>

<script>
import SearchTable from '../../components/search/SearchTable'
import { searchList } from '../../api'
import { setNavigationBarTitle, showToast } from '../../api/webchat'
export default {
  components: {
    SearchTable
  },
  data() {
    return {
      data: [],
      page: 1
    }
  },
  methods: {
    // 获取图书列表
    getSearchList() {
      const { key, text } = this.$route.query
      const parmas = {}
      if (key && text) {
        parmas[key] = text
      }
      parmas.page = this.page
      searchList(parmas).then(res => {
        const { data } = res.data
        if (data.length > 0) {
          this.data.push(...data)
        } else {
          showToast('没有更多数据了.')
        }
      })
    }
  },
  // 页面到底部的周期函数
  onReachBottom() {
    this.page++
    this.getSearchList()
  },
  mounted() {
    this.page = 1
    const { title } = this.$route.query
    this.getSearchList()
    setNavigationBarTitle(title)
  }
}
</script>

<style lang="scss" scoped>
</style>
