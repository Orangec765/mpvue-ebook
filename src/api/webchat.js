import { getOpenId } from './index'

// 用户授权判断
export function getSetting (auth, onSuccess, onFail) {
  mpvue.getSetting({
    success (res) {
      console.log(res)
      if (res.authSetting[`scope.${auth}`]) {
        onSuccess(res)
      } else {
        onFail(res)
      }
    },
    fail (res) {
      console.log(res) //直接抛出异常
    },
  })
}

// 获取微信授权用户信息
export function getUserInfo (onSuccess, onFail) {
  mpvue.getUserInfo({
    success (res) {
      console.log(res)
      const { userInfo } = res
      if (userInfo) {
        onSuccess(userInfo)
      } else {
        onFail(res)
      }
    },
    fail (res) {
      console.log(res) //直接抛出异常
    },
  })
}
// 本地缓存key
export function setStorageSync (key, data) {
  return mpvue.setStorageSync(key, data)
}

//
export function getStorageSync (key) {
  return mpvue.getStorageSync(key)
}

// 获取openId
export function getUserOpenId (callback) {
  mpvue.login({
    success (res) {
      if (res.code) {
        console.log(res, '1')
        const { code } = res
        getOpenId(code)
          .then((response) => {
            const {
              data: {
                data: { openid },
              },
            } = response
            setStorageSync('openId', openid)
            callback && callback(openid)
          })
          .catch((err) => {
            console.log(err) //直接抛出异常
          })
      } else {
        console.log(res) //直接抛出异常
      }
    },
    fail (res) {
      console.log(res) //直接抛出异常
    },
  })
}

// 显示loading
export function showLoading (title) {
  mpvue.showLoading({
    title,
    mask: true,
  })
}
// 隐藏loading
export function hideLoading () {
  mpvue.hideLoading()
}

// 显示toast
export function showToast (title) {
  mpvue.showToast({
    title,
    duration: 2000,
  })
}

export function setNavigationBarTitle (title) {
  mpvue.setNavigationBarTitle({ title })
}


