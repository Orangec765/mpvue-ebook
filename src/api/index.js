import { get, post } from '@/utils/request'
import { APP_ID, APP_SECRET } from '@/utils/const'
// 公共API
const API_URL = 'https://test.youbaobao.xyz:18081'
// 首页数据
export function getHomeData (parmas) {
  return get(`${API_URL}/book/home/v2`, parmas)
}

// 为你推荐
export function recommend () {
  return get(`${API_URL}/book/home/recommend/v2`)
}

// 免费阅读
export function freeRead () {
  return get(`${API_URL}/book/home/freeRead/v2`)
}

// 当前最热
export function hotBook () {
  return get(`${API_URL}/book/home/hotBook/v2`)
}

// 获取openId
export function getOpenId (code) {
  return get(`${API_URL}/openId/get`, {
    appId: APP_ID,
    code,
    secret: APP_SECRET,
  })
}

// 注册用户信息主要是对用户的操作做一个记录
export function register (openId, userinfo) {
  return post(`${API_URL}/user/register`, {
    openId,
    platform: mpvuePlatform,
    ...userinfo,
  })
}

// 搜索
export function search (parmas) {
  return get(`${API_URL}/book/search`, parmas)
}

// 热门搜索
export function hotSarch () {
  return get(`${API_URL}/book/hot-search`)
}

// 图书详情
export function bookDetail (parmas) {
  return get(`${API_URL}/book/detail`, parmas)
}

// 图书评分
export function bookRankSave (parmas) {
  return get(`${API_URL}/book/rank/save`, parmas)
}

// 获取图书目录
export function bookContents (parmas) {
  return get(`${API_URL}/book/contents`, parmas)
}

// 获取图书目录
export function bookIsInShelf (parmas) {
  return get(`${API_URL}/book/shelf/get`, parmas)
}

// 加入书架
export function bookShelfSave (parmas) {
  return get(`${API_URL}/book/shelf/save`, {
    shelf: JSON.stringify(parmas)
  })
}

// 移出书架
export function bookShelfremove (parmas) {
  return get(`${API_URL}/book/shelf/remove`, {
    shelf: JSON.stringify(parmas)
  })
}

