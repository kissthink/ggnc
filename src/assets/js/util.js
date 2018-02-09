function regAmount (str) {
  if (!str) {
    return false
  }
  const reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
  return reg.test(str)
}

function regInteger (str) {
  if (!str || str === '0' || str === 0) {
    return false
  }
  const reg = /^[1-9][0-9]*$/
  return reg.test(str)
}

function regMobile (str) {
  if (!str) {
    return false
  }
  const reg = /^(?=\d{11}$)^1(?:3\d|4[57]|5[^4\D]|66|7[^249\D]|8\d|9[89])\d{8}$/
  return reg.test(str)
}

function regPassword (str) {
  if (!str) {
    return
  }
  return str.length >= 6 && str.length <= 20
}

export default {
  regAmount,
  regInteger,
  regMobile,
  regPassword
}
