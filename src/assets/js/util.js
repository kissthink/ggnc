function regInteger (str) {
  if (!str || str === '0' || str === 0) {
    return false
  }
  const reg = /^[1-9][0-9]*$/
  return reg.test(str)
}

export default {regInteger}
