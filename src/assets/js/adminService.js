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

// 冻结或解冻余额
function switchAssetUser (user) {
  return axiosService.patch(apiUrl.userSwitchAsset, user).then(res => {
    return res.data.blocked
  })
}

// 获取用户信息
function getUserDetail (id) {
  return axiosService.get(apiUrl.userDetail, id).then(res => {
    return res.data.user
  })
}

// 充值余额
function topUpBalance (user) {
  return axiosService.patch(apiUrl.userTopUpBalance, user).then(res => {
    return res
  })
}

// 充值种蛋
function topUpBreedingEgg (user, eggOfNum) {
  return axiosService.patch(apiUrl.userTopUpBreedingEgg, user, eggOfNum).then(res => {
    return res
  })
}

// 提现种蛋
function withdrawBreedingEgg (user, eggOfNum) {
  return axiosService.patch(apiUrl.userWithdrawBreedingEgg, user, eggOfNum).then(res => {
    return res
  })
}

// 充值种鸡
function topUpBreedingHens (user, chickenOfNum) {
  return axiosService.patch(apiUrl.userTopUpBreedingHens, user, chickenOfNum).then(res => {
    return res
  })
}

// 提现种鸡
function WithdrawBreedingHens (user, chickenOfNum) {
  return axiosService.patch(apiUrl.userWithdrawBreedingHens, user, chickenOfNum).then(res => {
    return res
  })
}

// 充值商品蛋
function topUpCommodityEgg (user, eggOfNum) {
  return axiosService.patch(apiUrl.userTopUpCommodityEgg, user, eggOfNum).then(res => {
    return res
  })
}

// 提现商品蛋
function withdrawCommodityEgg (user, eggOfNum) {
  return axiosService.patch(apiUrl.userWithdrawCommodityEgg, user, eggOfNum).then(res => {
    return res
  })
}

// 充值商品鸡
function topUpCommodityChicken (user, chickenOfNum) {
  return axiosService.patch(apiUrl.userTopUpCommodityChicken, user, chickenOfNum).then(res => {
    return res
  })
}

// 提现商品鸡
function withdrawCommodityChicken (user, chickenOfNum) {
  return axiosService.patch(apiUrl.userWithdrawCommodityChicken, user, chickenOfNum).then(res => {
    return res
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
  switchAssetUser,
  getUserDetail,
  topUpBalance,
  topUpBreedingEgg,
  withdrawBreedingEgg,
  topUpBreedingHens,
  WithdrawBreedingHens,
  topUpCommodityEgg,
  withdrawCommodityEgg,
  topUpCommodityChicken,
  withdrawCommodityChicken,
  getGoodsList
}
