import axios, { AxiosInstance } from 'axios'
import { getCookie, setCookie } from 'cookies-next'

const processBuild = 'https://dev-backend.monetiseur.io'

console.log(processBuild)

const API_DEV: AxiosInstance = axios.create({
  baseURL: `${(processBuild || '').replace(/\/$/, '')}/api/v1`,
  timeout: 60000,
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
    // "Access-Control-Allow-Origin:": "*"
  }
})

API_DEV.interceptors.request.use(
  function (config) {
    const token = getCookie('id_token')

    if (!token) {
      return config
    }

    config.headers['Authorization'] = `Bearer ${token}`

    return config
  },

  function (error) {
    return Promise.reject(error)
  }
)

API_DEV.interceptors.response.use(
  function (response) {
    return response
  },
  async function (error) {
    const payload = {
      access_token: getCookie('accessToken'),
      refresh_token: getCookie('refreshToken')
    }

    if (!getCookie('id_token') || error.response.status !== 401 || error.config.retry) {
      return Promise.reject(error)
    }

    let urlRole = localStorage?.getItem('Role') || getCookie('Role') || ''

    if (urlRole === 'Brand' || 'brand') {
      urlRole = '/brand'
    } else {
      urlRole = '/rights_holder'
    }

    const { data } = await API_DEV.post(`${urlRole}/refresh_token/`, payload)

    setCookie('refreshToken', data.id_token)
    setCookie('accessToken', data.access_token)
    localStorage.setItem('User', JSON.stringify(data))

    const newRequest = {
      ...error.config,
      retry: true
    }

    return API_DEV(newRequest)
  }
)

export default API_DEV
