<template>
  <div class="search-list-wrapper">
    <SearchItem
      icon="apps-o"
      :title="category"
      :sub-title="category"
      @onClick="showList(category.title,'category')"
      v-if="category"
    />
    <SearchItem
      icon="contact"
      :title="author"
      :sub-title="author"
      @onClick="showList(author.title,'author')"
      v-if="author"
    />
    <SearchItem
      icon="newspaper-o"
      :title="publisher"
      :sub-title="publisher"
      @onClick="showList(publisher.title,'publisher')"
      v-if="publisher"
    />
    <SearchTable :data="data.book" @onClick="onBookClick" />
  </div>
</template>

<script>
import SearchItem from "./SearchItem";
import SearchTable from "./SearchTable";
export default {
  components: {
    SearchItem,
    SearchTable
  },
  computed: {
    category() {
      if (this.data && this.data.category && this.data.category.length > 0) {
        return this.data.category[0].categoryText;
      } else {
        return null;
      }
    },
    author() {
      if (this.data && this.data.author && this.data.author.length > 0) {
        return this.data.author[0].author;
      } else {
        return null;
      }
    },
    publisher() {
      if (this.data && this.data.publisher && this.data.publisher.length > 0) {
        return this.data.publisher[0].publisher;
      } else {
        return null;
      }
    }
  },
  props: {
    data: Object
  },
  methods: {
    showList(text, key) {
      console.log(text, key);
    },
    onBookClick(book) {
      console.log(book);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
