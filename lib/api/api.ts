import axios, { AxiosInstance } from 'axios'
import { getCookie, setCookie } from 'cookies-next'

const processBuild =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_DEV_API_URL

const API: AxiosInstance = axios.create({
  baseURL: `${(processBuild || '').replace(/\/$/, '')}/api/v1`,
  timeout: 60000,
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
    // "Access-Control-Allow-Origin:": "*"
  }
})

const refreshTokens = async () => {
  const payload = {
    access_token: getCookie('accessToken'),
    refresh_token: getCookie('refreshToken')
  }

  let urlRole = localStorage?.getItem('Role') || getCookie('Role') || ''

  if (urlRole === 'Brand' || urlRole === 'brand') {
    urlRole = '/brand'
  } else {
    urlRole = '/rights_holder'
  }

  const { data } = await API.post(`${urlRole}/refresh_token/`, payload)

  setCookie('refreshToken', data.id_token)
  setCookie('accessToken', data.access_token)
  localStorage.setItem('User', JSON.stringify(data))

  return data.access_token
}

API.interceptors.request.use(
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

API.interceptors.response.use(
  function (response) {
    return response
  },
  async function (error) {
    const originalRequest = error.config

    // If it's a request to refresh tokens, don't retry to avoid infinite loop
    if (originalRequest.url.includes('/refresh_token/')) {
      return Promise.reject(error)
    }

    // If the error is not a 401 or the request has already been retried, reject
    if (error.response.status !== 401 || originalRequest.retry) {
      return Promise.reject(error)
    }

    try {
      const accessToken = await refreshTokens()

      // Update the original request with new access token
      originalRequest.headers['Authorization'] = 'Bearer ' + accessToken
      originalRequest.retry = true

      return API(originalRequest)
    } catch (err) {
      // If refreshing tokens fails, reject the promise
      return Promise.reject(err)
    }
  }
)

export default API
