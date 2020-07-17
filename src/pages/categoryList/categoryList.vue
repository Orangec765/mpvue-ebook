<template>
  <div>
    <HomeBook
      :row="category.length/2"
      :col="2"
      :data="category"
      mode="category"
      :show-btn="false"
      :show-title="false"
      @onBookClick="onCategoryClick"
    />
  </div>
</template>

<script>
import HomeBook from '../../components/home/HomeBook'
import { categoryList } from '../../api'
export default {
  components: {
    HomeBook
  },
  data() {
    return {
      category: []
    }
  },
  methods: {
    // 分类详情
    onCategoryClick(category) {
      this.$router.push({
        path: '/pages/list/main',
        query: {
          text: category.category,
          key: 'categoryId',
          title: category.categoryText
        }
      })
    }
  },
  mounted() {
    categoryList().then(res => {
      this.category = res.data.data
      console.log(category)
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
