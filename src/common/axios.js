import * as _axios from 'axios'

const API_URL = '/'

let headersObj = {}

const axios = _axios.create({ baseURL: API_URL })

axios.interceptors.request.use(function(config) {
  config.headers = Object.assign(headersObj, config.headers)
  return config
})

axios.interceptors.response.use(
  response => response,
  error => {
    if ( error.response.status === 401 ) {
      console.log('TODO: logout user')
    }
    return Promise.reject(error)
  }
)

export  default axios
