import * as axiosService from './axiosService.js'
import apiUrl from './apiUrl.js'

// 获取用户信息
function getUserInfo (id) {
  return axiosService.get(apiUrl.userInfo, id).then(res => {
    return res.data.user
  })
}

// 注册用户
function registerUser (user) {
  return axiosService.post(apiUrl.userRegister, user).then(res => {
    return res
  })
}

export default {
  getUserInfo,
  registerUser
}
