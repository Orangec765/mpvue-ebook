<template>
  <div>
    <SearchBar
      :hot-search="hotSearchKeyWord"
      :focus="searchFocus"
      @onChange="onChange"
      @onClear="onClear"
      @onConfirm="onConfirm"
      ref="searchBar"
    />
    <TagGroup
      :value="hotSearchArray"
      header-text="热门搜索"
      btn-text="换一批"
      @onBtnClick="changeHotSearch"
      @onTagClick="showBookDetail"
      v-if="hotSearch.length > 0 && !showList"
    />
    <TagGroup
      v-if="historySearch.length > 0 && !showList"
      :value="historySearch"
      header-text="历史搜索"
      btn-text="清空"
      @onBtnClick="clearHistorySearch"
      @onTagClick="searchKeyWord"
    />
    <SearchList v-if="showList" :data="searchList" />
  </div>
</template>

<script>
import { search, hotSarch } from "@/api";
import { getStorageSync, setStorageSync, showToast } from "@/api/webchat";
import SearchList from "@/components/search/SearchList";
import TagGroup from "@/components/base/TagGroup";
import SearchBar from "@/components/home/SearchBar";
import SearchTable from "@/components/search/SearchTable";
const KEY_HISTORY_SEARCH = "historySearch";
export default {
  components: {
    SearchBar,
    SearchList,
    TagGroup,
    SearchTable,
  },
  computed: {
    showList() {
      const keys = Object.keys(this.searchList);
      return keys.length > 0;
    },
    hotSearchArray() {
      let _hotSearch = [];
      this.hotSearch.forEach((o) => _hotSearch.push(o.title));
      return _hotSearch;
    },
  },
  data() {
    return {
      hotSearchKeyWord: "",
      hotSearch: [],
      historySearch: [],
      searchList: {},
      searchFocus: true,
      openId: "",
      page: 1,
    };
  },

  methods: {
    onConfirm(keyword) {
      console.log("on");
      // 判断是否有搜索关键字

      if (!keyword || keyword.trim().length === 0) {
        // 如果没有则获取热门搜索词，通过热门搜索词发送请求
        keyword = this.hotSearchKeyWord;
        this.$refs.searchBar.setValue(keyword);
      } else {
        // 如果有就用关键字搜索
      }
      this.onSearch(keyword);
      // 将搜索结果写入历史搜索
      // historySearch
      if (!this.historySearch.includes(keyword)) {
        this.historySearch.push(keyword);
        setStorageSync(KEY_HISTORY_SEARCH, this.historySearch);
      }

      // 将搜索框失去焦点
      this.searchFocus = false;
    },
    onClear() {
      this.searchList = {};
    },
    onChange(keyword) {
      if (!keyword || keyword.trim().length === 0) {
        this.searchList = {};
        return;
      }
      this.page = 1;
      this.onSearch(keyword);
    },
    // 搜索
    onSearch(keyword) {
      const openId = getStorageSync("openId");
      search({
        keyword,
        openId: this.openId,
        page: this.page,
      }).then((res) => {
        this.searchList = res.data.data;
      });
    },
    // 清空历史搜索
    clearHistorySearch() {
      this.historySearch = [];
      setStorageSync(KEY_HISTORY_SEARCH, []);
    },
    // 根据历史关键字搜索
    searchKeyWord(text) {
      this.$refs.searchBar.setValue(text);
      this.onSearch(text);
    },
    // 显示图书详情
    showBookDetail() {
      console.log("show");
    },
    // 换一批热门搜索
    changeHotSearch() {
      hotSarch().then((res) => {
        this.hotSearch = res.data.data;
      });
    },
  },
  mounted() {
    this.page = 1;
    this.openId = getStorageSync("openId");
    hotSarch().then((res) => {
      this.hotSearch = res.data.data;
    });
    this.hotSearchKeyWord = this.$route.query.hotSearch;
    this.historySearch = getStorageSync(KEY_HISTORY_SEARCH) || [];
  },
  onPageScroll() {
    if (this.searchFocus) {
      this.searchFocus = false;
    }
  },
  onReachBottom() {
    if (this.showList) {
      this.page++;
      const searchWord = this.$refs.searchBar.getValue();
      search({
        keyword: searchWord,
        openId: this.openId,
        page: this.page,
      }).then((res) => {
        const { book } = res.data.data;
        if (book && book.length > 0) {
          this.searchList.book.push(...book);
        } else {
          showToast("没有更多数据了");
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped></style>
