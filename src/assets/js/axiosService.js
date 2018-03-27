import axios from 'axios'

let USER_TOKEN = localStorage.getItem('USER_TOKEN')

// axios defaults config
axios.defaults.baseURL = 'http://172.168.1.2:80/'
// axios.defaults.baseURL = 'http://192.168.99.100:8080/'
// axios.defaults.baseURL = 'http://api.test.ggnc2018.com:8080/'
axios.defaults.headers.common['Authorization'] = USER_TOKEN

// methods
function getAll (url, queryParams = {}) {
  return axios.get(url, queryParams)
    .then(response => response.data)
    .catch(error => handleError(error))
}

function get (url, id) {
  let URL = `${url}/${id}`
  return axios.get(URL)
    .then(response => response.data)
    .catch(error => handleError(error))
}

function post (url, data) {
  return axios.post(url, data)
    .then(response => response.data)
    .catch(error => handleError(error))
}

function update (url, queryParams) {
  let URL = queryParams.id ? `${url}/${queryParams.id}` : `${url}`
  return axios({
    method: 'put',
    url: URL,
    data: queryParams
  })
    .then(response => response.data)
    .catch(error => handleError(error))
}

function patch (url, data, queryParams = undefined) {
  let URL = url + (data.id ? '/' + data.id : '')
  if (!queryParams) {
    return axios({
      method: 'patch',
      url: URL
    })
      .then(response => response.data)
      .catch(error => handleError(error))
  }
  return axios({
    method: 'patch',
    url: URL,
    data: queryParams
  })
    .then(response => response.data)
    .catch(error => handleError(error))
}

function del (url, id) {
  let URL = `${url}/${id}`
  return axios.delete(URL)
    .then(response => response.data)
    .catch(error => handleError(error))
}

function uploadPic (url, file) {
  let param = new FormData()
  param.append('file', file, file.name)

  let config = {
    headers: {'Content-Type': 'multipart/form-data'}
  }
  return axios.post(url, param, config)
    .then(response => response.data)
    .catch(error => handleError(error))
}

function handleError (error) {
  if (error.response.status === 403) {
    localStorage.removeItem('USER_TOKEN')
  }
}

export { getAll, get, post, update, patch, del, uploadPic }
