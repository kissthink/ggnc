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

// 添蛋到孵化房
function hatchEggs (eggs) {
  return axiosService.post(apiUrl.hatchSave, eggs).then(res => {
    return res
  })
}

// 获取孵化房列表
function getHatchList (userId) {
  return axiosService.get(apiUrl.hatchList, userId).then(res => {
    return res.data.hatchRooms
  })
}

// 获取孵化房列表
function getInviterHatchList (userId) {
  return axiosService.get(apiUrl.inviterHatchList, userId).then(res => {
    return res.data.hatchRooms
  })
}

// 签到加温
function signInForSelf (user) {
  return axiosService.patch(apiUrl.signInForSelf, user).then(res => {
    return res
  })
}

// 帮师傅签到加温
function signInForInviter (user) {
  return axiosService.patch(apiUrl.signInForInviter, user).then(res => {
    return res
  })
}

// 孵化记录
function getHatched (userId) {
  return axiosService.get(apiUrl.hatched, userId).then(res => {
    return res.data.hatched
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

// 获取公告列表
function getNoticeList () {
  return axiosService.getAll(apiUrl.noticeList).then(res => {
    return res.data.noticeList
  })
}

// 修改密码
function changePassword (userPassword) {
  return axiosService.post(apiUrl.changePassword, userPassword).then(res => {
    return res
  })
}

export default {
  getUserInfo,
  registerUser,
  uploadPic,
  saveUserInfo,
  getOrderList,
  createOrder,
  hatchEggs,
  getHatchList,
  getInviterHatchList,
  signInForSelf,
  signInForInviter,
  getHatched,
  orderDemand,
  orderSupply,
  getNoticeList,
  changePassword
}
