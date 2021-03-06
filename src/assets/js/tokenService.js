import Vue from 'vue'

// 解析token
function decodeToken () {
  const secretKey = 'suancloud_chickenfarm'
  if (!localStorage.getItem('USER_TOKEN')) { return false }
  const token = localStorage.getItem('USER_TOKEN').split(' ')[1]
  return Vue.$jwt.decode(token, secretKey)
}

// 验证token是否过期
function isOverdue () {
  let currentTime = new Date().getTime()
  if (!decodeToken()) { return true }
  let tokenTime = decodeToken().exp
  return currentTime > tokenTime * 1000
}

export default {
  decodeToken,
  isOverdue
}
