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

export default {
  transformTime,
  transformBusinessType
}
