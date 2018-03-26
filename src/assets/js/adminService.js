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

// 获取余额充值日志列表
function getBalanceTopUpLog (page) {
  return axiosService.get(apiUrl.balanceTopUpOperationLog, page).then(res => {
    return res
  })
}

// 获取余额提现日志列表
function getBalanceWithdrawLog (page) {
  return axiosService.get(apiUrl.balanceWithdrawOperationLog, page).then(res => {
    return res
  })
}

// 获取种蛋充值日志列表
function getBreedingEggTopUpLog (page) {
  return axiosService.get(apiUrl.breedingEggTopUpOperationLog, page).then(res => {
    return res
  })
}

// 获取种蛋提现日志列表
function getBreedingEggWithdrawLog (page) {
  return axiosService.get(apiUrl.breedingEggWithdrawOperationLog, page).then(res => {
    return res
  })
}

// 获取种鸡充值日志列表
function getBreedingHensTopUpLog (page) {
  return axiosService.get(apiUrl.breedingHensTopUpOperationLog, page).then(res => {
    return res
  })
}

// 获取种鸡提现日志列表
function getBreedingHensWithdrawLog (page) {
  return axiosService.get(apiUrl.breedingHensWithdrawOperationLog, page).then(res => {
    return res
  })
}

// 获取商品蛋充值日志列表
function getCommodityEggTopUpLog (page) {
  return axiosService.get(apiUrl.commodityEggTopUpOperationLog, page).then(res => {
    return res
  })
}

// 获取商品蛋提现日志列表
function getCommodityEggWithdrawLog (page) {
  return axiosService.get(apiUrl.commodityEggWithdrawOperationLog, page).then(res => {
    return res
  })
}

// 获取商品鸡充值日志列表
function getCommodityChickenTopUpLog (page) {
  return axiosService.get(apiUrl.commodityChickenTopUpOperationLog, page).then(res => {
    return res
  })
}

// 获取商品鸡提现日志列表
function getCommodityChickenWithdrawLog (page) {
  return axiosService.get(apiUrl.commodityChickenWithdrawOperationLog, page).then(res => {
    return res
  })
}

// 获取平台收益
function getPlatformProfit () {
  return axiosService.getAll(apiUrl.platfromProfit).then(res => {
    return res.data.profit
  })
}

// 获取首页图片列表
function getIndexImgs () {
  return axiosService.getAll(apiUrl.home).then(res => {
    return res.data.homeList
  })
}

// 上传首页图片
function uploadIndexImage (file) {
  return axiosService.uploadPic(apiUrl.uploadIndexImage, file).then(res => {
    return res
  })
}

// 保存首页图片信息
function saveIndexImage (imgObj) {
  return axiosService.post(apiUrl.handleSaveInexImage, imgObj).then(res => {
    return res
  })
}

// 删除首页图片信息
function delIndexImage (id) {
  return axiosService.del(apiUrl.handleSaveInexImage, id).then(res => {
    return res
  })
}

// 获取图片详情
function getIndexImageDetail (id) {
  return axiosService.get(apiUrl.handleSaveInexImage, id).then(res => {
    return res.data.homes
  })
}

// 修改图片信息
function changeIndexImageDetail (imgObj) {
  return axiosService.update(apiUrl.handleSaveInexImage, imgObj).then(res => {
    return res
  })
}

// 获取充值列表
function getMathTopUpList (type) {
  let params = { params: type }
  return axiosService.getAll(apiUrl.mathTopUp, params).then(res => {
    return res.data.list
  })
}

// 获取提现列表
function getMathWithdrawList (type) {
  let params = { params: type }
  return axiosService.getAll(apiUrl.mathWithdraw, params).then(res => {
    return res.data.list
  })
}

// 匹配订单
function matchOrder (matchObj) {
  return axiosService.post(apiUrl.match, matchObj).then(res => {
    return res
  })
}

// 平台匹配
function adminMatch (matchObj) {
  return axiosService.post(apiUrl.adminMatch, matchObj).then(res => {
    return res
  })
}

// 获取已匹配订单列表
function getMatchedList () {
  return axiosService.getAll(apiUrl.match).then(res => {
    return res.data.list
  })
}

// 完成充值
function topUpPass (order) {
  return axiosService.patch(apiUrl.topUpPass, order).then(res => {
    return res
  })
}

// 完成订单
function completeMatch (order) {
  return axiosService.patch(apiUrl.completeMatch, order).then(res => {
    return res
  })
}

// 获取后台系统配置
function getAdminConfig () {
  return axiosService.getAll(apiUrl.adminConfig).then(res => {
    return res
  })
}

// 修改后台系统配置
function updateAdminConfig (config) {
  return axiosService.update(apiUrl.adminConfig, config).then(res => {
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
  deleteNotice,
  getBalanceTopUpLog,
  getBalanceWithdrawLog,
  getBreedingEggTopUpLog,
  getBreedingEggWithdrawLog,
  getBreedingHensTopUpLog,
  getBreedingHensWithdrawLog,
  getCommodityEggTopUpLog,
  getCommodityEggWithdrawLog,
  getCommodityChickenTopUpLog,
  getCommodityChickenWithdrawLog,
  getPlatformProfit,
  getIndexImgs,
  uploadIndexImage,
  saveIndexImage,
  delIndexImage,
  getIndexImageDetail,
  changeIndexImageDetail,
  getMathTopUpList,
  getMathWithdrawList,
  matchOrder,
  adminMatch,
  getMatchedList,
  topUpPass,
  completeMatch,
  getAdminConfig,
  updateAdminConfig
}
