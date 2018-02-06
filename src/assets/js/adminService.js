import * as axiosService from './axiosService.js'
import apiUrl from './apiUrl.js'

const secretKey = 'suancloud_chickenfarm'

// 获取用户列表
function getUserList () {
  return axiosService.getAll(apiUrl.userList).then(res => {
    return res.data.userList
  })
}

// 禁用或启用用户
function switchUserEnable (user) {
  return axiosService.patch(apiUrl.userSwitch, user).then(res => {
    return res.data.enable
  })
}

// 获取用户信息
function getUserDetail (id) {
  return axiosService.get(apiUrl.userDetail, id).then(res => {
    return res.data.user
  })
}

// 获取商品列表
function getGoodsList () {
  return axiosService.getAll(apiUrl.goodsList).then(res => {
    return res.data.commodityList
  })
}

export default {
  secretKey,
  getUserList,
  switchUserEnable,
  getUserDetail,
  getGoodsList
}
