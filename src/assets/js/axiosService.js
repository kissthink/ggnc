import axios from 'axios'

// axios defaults config
axios.defaults.baseURL = 'http://172.168.1.2/'
axios.defaults.headers.common['Authorization'] = ''

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

function update (url, data) {
  let URL = `${url}/${data.id}`
  return axios.put(URL, JSON.stringify(data))
    .then(response => response.data)
    .catch(error => error.message)
}

function patch (url, data) {
  let URL = url + (data.id ? '/' + data.id : '')
  return axios.patch(URL, JSON.stringify(data))
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
