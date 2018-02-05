import axios from 'axios'

// api
export const USER_DETAIL = 'api/user/detail'
export const USER_LIST = 'api/user/list'
export const USER_SWITCH = 'api/user/switch'

// axios defaults config
axios.defaults.baseURL = 'http://172.168.1.2/'

// methods
function getAll (api) {
  let URL = `${api}`
  return axios.get(URL)
    .then(response => response.data)
    .catch(error => error.message)
}

function get (api, id) {
  let URL = `${api}/${id}`
  return axios.get(URL)
    .then(response => response.data)
    .catch(error => error.message)
}

function post (api, data) {
  return axios.post(api, JSON.stringify(data))
    .then(response => response.data)
    .catch(error => error.message)
}

function update (api, id, data) {
  let URL = `${api}/${id}`
  return axios.put(URL, JSON.stringify(data))
    .then(response => response.data)
    .catch(error => error.message)
}

function patch (api, id, data) {
  let URL = api + (id ? '/' + id : '')
  return axios.put(URL, JSON.stringify(data))
    .then(response => response.data)
    .catch(error => error.message)
}

function del (api, id) {
  let URL = `${api}/${id}`
  return axios.delete(URL)
    .then(response => response.data)
    .catch(error => error.message)
}

export { getAll, get, post, update, patch, del }
