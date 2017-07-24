import * as _axios from 'axios'

const API_URL = 'http://localhost:8080'

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
);

['get', 'post', 'put', 'delete'].forEach(action => {
  const fn = axios[action].bind(axios)
  axios[action] = function(a, b) {
    let args = arguments
    let message = ''

    if ( typeof a === 'string' && typeof b === 'string' ) {
      message = `${arguments[0]  }...`
      args = Array.from(arguments).slice(1)
    }
    console.log('ajax call to ', message)
    return fn.apply(axios, args).then(data => {
      console.log('loaded ', message)
      return data
    }).catch(err => {
      console.log('failed ', message)
      console.error('Unhandled API error happened in axios:', err)
      return Promise.reject(err)
    })
  }
})

export  default axios
