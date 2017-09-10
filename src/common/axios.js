import * as _axios from 'axios'

let headers = {}

export const axios = _axios.create({})

axios.setHeaders = _headers => headers = _headers

axios.interceptors.request.use(function(config) {
  config.headers = Object.assign({
    // 'Content-Type': 'multipart/form-data'
  }, headers, config.headers)
  return config
})

axios.interceptors.response.use(
  response => response,
  error => {
    if ( error.response.status === 401 ) {
      console.warn('//TODO: logout user on HTTP status 401')
    }
    return Promise.reject(error)
  }
)
