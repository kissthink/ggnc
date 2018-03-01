// 将时间戳转换为年月日
function transformTime (value) {
  if (!value) return
  let date = new Date(+value)
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
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
  switch (value) {
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

export default {
  transformTime,
  transformBusinessType,
  transformOrderStatus
}
