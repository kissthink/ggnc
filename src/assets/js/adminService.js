import * as axiosService from './axiosService.js'
import apiUrl from './apiUrl.js'

function getUserList () {
  return axiosService.getAll(apiUrl.userList).then(res => {
    return res.data.userList
  })
}

function switchUserEnable (user) {
  return axiosService.patch(apiUrl.userSwitch, user).then(res => {
    return res.data.enable
  })
}

export default { getUserList, switchUserEnable }
