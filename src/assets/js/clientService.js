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

// 放鸡到养鸡场
function saveHennery (hennery) {
  return axiosService.post(apiUrl.hennerySave, hennery).then(res => {
    return res
  })
}

// 获取在养鸡列表
function getInHenneryList () {
  return axiosService.getAll(apiUrl.inHennery).then(res => {
    return res.data.henneries
  })
}

// 喂养一批鸡
function feedHennery (henneryId) {
  return axiosService.get(apiUrl.feedHennery, henneryId).then(res => {
    return res
  })
}

// 喂养全部鸡
function feedAllHennery () {
  return axiosService.getAll(apiUrl.feedAllHennery).then(res => {
    return res
  })
}

// 使用急救包
function aidkitHennery (henneryId) {
  return axiosService.get(apiUrl.aidkitHennery, henneryId).then(res => {
    return res
  })
}

// 获取粮仓信息
function getUserGranary () {
  return axiosService.getAll(apiUrl.userGranary).then(res => {
    return res.data.granary
  })
}

// 获取鸡粮详情
function getGrainDetail () {
  return axiosService.getAll(apiUrl.grainDetail).then(res => {
    return res.data.grain
  })
}

// 获取急救包详情
function getAidkitDetail () {
  return axiosService.getAll(apiUrl.aidkitDetail).then(res => {
    return res.data.aidKit
  })
}

// 购买鸡粮
function buyGrain (number) {
  return axiosService.post(apiUrl.buyGrain, number).then(res => {
    return res
  })
}

// 购买急救包
function buyAidKit (number) {
  return axiosService.post(apiUrl.buyAidKit, number).then(res => {
    return res
  })
}

// 获取收获列表
function getHarvestList () {
  return axiosService.getAll(apiUrl.henneryList).then(res => {
    return res.data.history
  })
}

// 用户盈利明细
function getUserProfit () {
  return axiosService.getAll(apiUrl.userProfit).then(res => {
    return res.data.userProfit
  })
}

// 获取首页图片列表
function getIndexImgs () {
  return axiosService.getAll(apiUrl.home).then(res => {
    return res.data.homeList
  })
}

// 用户转账
function userTransfer (transferObj) {
  return axiosService.post(apiUrl.userTransfer, transferObj).then(res => {
    return res
  })
}

// 获取用户转账记录
function getTransferRecord () {
  return axiosService.getAll(apiUrl.transferRecord).then(res => {
    return res.data.transferRecord
  })
}

// 获取用户充值记录
function getUserTopUpRecord () {
  return axiosService.getAll(apiUrl.userTopUpRecord).then(res => {
    return res.data.list
  })
}

// 获取用户提现记录
function getUserWithDrawRecord () {
  return axiosService.getAll(apiUrl.userWithDrawRecord).then(res => {
    return res.data.list
  })
}

// 用户充值
function userTopUp (topUpObj) {
  return axiosService.post(apiUrl.userTopUp, topUpObj).then(res => {
    return res
  })
}

// 确认用户充值
function userTopUped (id) {
  return axiosService.patch(apiUrl.userTopUp, id).then(res => {
    return res
  })
}

// 用户提现
function userWithDraw (withDrawObj) {
  return axiosService.post(apiUrl.userWithDraw, withDrawObj).then(res => {
    return res
  })
}

// 银票转余额
function taelConvertBalance (obj) {
  return axiosService.post(apiUrl.taelConvertBalance, obj).then(res => {
    return res
  })
}

// 确认收款
function confirmWithdraw (data) {
  return axiosService.patch(apiUrl.confirmWithdraw, data).then(res => {
    return res
  })
}

// 获取收款码
function getWithdrawCode (id) {
  return axiosService.get(apiUrl.getWithdrawCode, id).then(res => {
    return res.data.match
  })
}

// 上传付款凭证
function uploadCredential (file) {
  return axiosService.uploadPic(apiUrl.uploadCredential, file).then(res => {
    return res
  })
}

// 提交凭证
function saveCredential (data, params) {
  return axiosService.patch(apiUrl.saveCredential, data, params).then(res => {
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
  changePassword,
  saveHennery,
  getInHenneryList,
  feedHennery,
  feedAllHennery,
  getUserGranary,
  buyGrain,
  buyAidKit,
  getHarvestList,
  getGrainDetail,
  getAidkitDetail,
  getUserProfit,
  getIndexImgs,
  userTransfer,
  getTransferRecord,
  getUserTopUpRecord,
  getUserWithDrawRecord,
  userTopUp,
  userWithDraw,
  taelConvertBalance,
  confirmWithdraw,
  getWithdrawCode,
  uploadCredential,
  saveCredential,
  aidkitHennery,
  userTopUped
}
