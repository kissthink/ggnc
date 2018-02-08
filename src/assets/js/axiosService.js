import axios from 'axios'

let USER_TOKEN = localStorage.getItem('USER_TOKEN')

// axios defaults config
axios.defaults.baseURL = 'http://172.168.1.2/'
axios.defaults.headers.common['Authorization'] = USER_TOKEN

// methods
function getAll (url) {
  return axios.get(url)
    .then(response => response.data)
    .catch(error => error.message)
}

function get (url, id) {
  let URL = `${url}/${id}`
  return axios.get(URL)
    .then(response => response.data)
    .catch(error => error.message)
}

function post (url, data) {
  return axios.post(url, JSON.stringify(data))
    .then(response => response.data)
    .catch(error => error.message)
}

function update (url, queryParams) {
  let URL = `${url}/${queryParams.id}`
  return axios({
    method: 'put',
    url: URL,
    data: queryParams
  })
    .then(response => response.data)
    .catch(error => error.message)
}

function patch (url, data, queryParams = undefined) {
  let URL = url + (data.id ? '/' + data.id : '')
  if (!queryParams) {
    return axios({
      method: 'patch',
      url: URL
    })
      .then(response => response.data)
      .catch(error => error.message)
  }
  return axios({
    method: 'patch',
    url: URL,
    data: queryParams
  })
    .then(response => response.data)
    .catch(error => error.message)
}

function del (url, id) {
  let URL = `${url}/${id}`
  return axios.delete(URL)
    .then(response => response.data)
    .catch(error => error.message)
}

export { getAll, get, post, update, patch, del }
