import * as axiosService from './axiosService.js'
import apiUrl from './apiUrl.js'

// 获取用户列表
function getUserList () {
  return axiosService.getAll(apiUrl.userList).then(res => {
    return res.data.userList
  })
}

// 禁用或启用用户
function switchUserEnable (user) {
  return axiosService.patch(apiUrl.userSwitch, user).then(res => {
    return res
  })
}

// 冻结或解冻余额
function switchAssetUser (user) {
  return axiosService.patch(apiUrl.userSwitchAsset, user).then(res => {
    return res
  })
}

// 获取用户信息
function getUserDetail (id) {
  return axiosService.get(apiUrl.userDetail, id).then(res => {
    return res.data.user
  })
}

// 充值余额
function topUpBalance (user, amount) {
  return axiosService.patch(apiUrl.userTopUpBalance, user, amount).then(res => {
    return res
  })
}

// 提现余额
function withdrawBalance (user, amount) {
  return axiosService.patch(apiUrl.userWithdrawBalance, user, amount).then(res => {
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

// 获取商品详情
function getGoodsDetail (id) {
  return axiosService.get(apiUrl.goodsDetail, id).then(res => {
    return res.data.commodity
  })
}

// 修改商品信息
function updateGoodsDetail (goods) {
  return axiosService.update(apiUrl.updateGoodsDetail, goods).then(res => {
    return res
  })
}

// 获取道具列表
function getPropsList () {
  return axiosService.getAll(apiUrl.propsList).then(res => {
    return res.data.propList
  })
}

// 获取道具信息
function getPropsDetail (id) {
  return axiosService.get(apiUrl.propsDetail, id).then(res => {
    return res.data.prop
  })
}

// 修改道具信息
function updatePropsDetail (props) {
  return axiosService.update(apiUrl.propsUpdate, props).then(res => {
    return res
  })
}

// 获取公告列表
function getNoticeList () {
  return axiosService.getAll(apiUrl.noticeListManagement).then(res => {
    return res.data.noticeList
  })
}

// 获取公告详情
function getNoticeDetail (id) {
  return axiosService.get(apiUrl.noticeDetail, id).then(res => {
    return res.data.notice
  })
}

// 发布公告
function releaseNotice (notice) {
  return axiosService.post(apiUrl.saveNotice, notice).then(res => {
    return res
  })
}

// 删除公告
function deleteNotice (notice) {
  return axiosService.del(apiUrl.deleteNotice, notice.id).then(res => {
    return res
  })
}

export default {
  getUserList,
  switchUserEnable,
  switchAssetUser,
  getUserDetail,
  topUpBalance,
  withdrawBalance,
  topUpBreedingEgg,
  withdrawBreedingEgg,
  topUpBreedingHens,
  WithdrawBreedingHens,
  topUpCommodityEgg,
  withdrawCommodityEgg,
  topUpCommodityChicken,
  withdrawCommodityChicken,
  getGoodsList,
  getGoodsDetail,
  updateGoodsDetail,
  getPropsList,
  getPropsDetail,
  updatePropsDetail,
  getNoticeList,
  getNoticeDetail,
  releaseNotice,
  deleteNotice
}
