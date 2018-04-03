// 将时间戳转换为年月日
function transformTime (value) {
  if (!value) return
  let date = new Date(+value)
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

// 将时间戳转换为年月日-时分秒
function tansfromToTime (value) {
  if (!value) return
  let date = new Date(+value)
  let minutes = date.getMinutes().toString().padStart(2, '0')
  let seconds = date.getSeconds().toString().padStart(2, '0')
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() +
         ' ' + date.getHours() + ':' + minutes + ':' + seconds
}

// 转换买卖类型
function transformBusinessType (value) {
  if (!value) return
  let businessType = ''
  switch (value) {
    case 'supply' :
      businessType = '出售'
      break
    case 'demand' :
      businessType = '买入'
      break
    default :
      businessType = '未知'
  }
  return businessType
}

// 转换订单交易状态
function transformOrderStatus (value) {
  let status = ''
  switch (+value) {
    case 0:
      status = '交易中'
      break
    case 1:
      status = '已完成'
      break
    case 2:
      status = '已过期'
      break
  }
  return status
}

// 转换充值提现状态
function transformBillStatus (value) {
  let status = ''
  switch (value) {
    case 0:
      status = '待匹配'
      break
    case 1:
      status = '已匹配'
      break
    case 2:
      status = '已付款'
      break
    case 3:
      status = '成功'
      break
    case 4:
      status = '失败'
      break
  }
  return status
}

// 转换提现状态
function transformWithrawBillStatus (value) {
  let status = ''
  switch (value) {
    case 0:
      status = '待匹配'
      break
    case 1:
      status = '待确认'
      break
    case 2:
      status = '成功'
      break
  }
  return status
}

// 转换支付方式
function transformPayMethod (val) {
  let parMethod = ''
  switch (val) {
    case 0:
      parMethod = '支付宝'
      break
    case 1:
      parMethod = '微信'
      break
  }
  return parMethod
}

// 转换订单匹配状态
function transformMatchOrderType (val) {
  let type = ''
  switch (val) {
    case 0:
      type = '待付款'
      break
    case 1:
      type = '已付款'
      break
    case 2:
      type = '充值成功'
      break
  }
  return type
}

let transform = {
  'transformTime': transformTime,
  'businessType': transformBusinessType,
  'orderStatus': transformOrderStatus,
  'tansfromToTime': tansfromToTime,
  'transformBillStatus': transformBillStatus,
  'transformWithrawBillStatus': transformWithrawBillStatus,
  'transformPayMethod': transformPayMethod,
  'transformMatchOrderType': transformMatchOrderType
}

export default transform
