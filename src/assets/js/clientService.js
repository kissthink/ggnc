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

// 上传收款码
function uploadPic (file) {
  return axiosService.uploadPic(apiUrl.uplocdWithdrawCode, file).then(res => {
    return res
  })
}

// 保存用户实名认证信息
function saveUserInfo (info) {
  return axiosService.post(apiUrl.userInfoSave, info).then(res => {
    return res
  })
}

// 我的订单
function getOrderList (id) {
  return axiosService.get(apiUrl.orderList, id).then(res => {
    return res.data.orders
  })
}

// 创建订单
function createOrder (order) {
  return axiosService.post(apiUrl.orderSave, order).then(res => {
    return res
  })
}

// 市场需求
function orderDemand () {
  return axiosService.getAll(apiUrl.orderDemand).then(res => {
    return res.data.demand
  })
}

// 市场供应
function orderSupply () {
  return axiosService.getAll(apiUrl.orderSupply).then(res => {
    return res.data.supply
  })
}

export default {
  getUserInfo,
  registerUser,
  uploadPic,
  saveUserInfo,
  getOrderList,
  createOrder,
  orderDemand,
  orderSupply
}
