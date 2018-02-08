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

export default {
  regAmount,
  regInteger
}
