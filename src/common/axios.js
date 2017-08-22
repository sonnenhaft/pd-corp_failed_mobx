import * as _axios from 'axios'

let headers = {}

const axios = _axios.create({})

axios.setHeaders = _headers => headers = _headers

axios.interceptors.request.use(function(config) {
  config.headers = Object.assign({}, headers, config.headers)
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
