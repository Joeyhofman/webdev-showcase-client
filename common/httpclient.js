import axios from 'axios'
import { config } from '@/config/appconfig'

class HttpClient {
  constructor() {
    this.BASE_URL = config.apiUrl.replace(/\/$/, '')
  }

  _buildConfig(headers = {}) {
    const token = sessionStorage.getItem('token')
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        ...headers.headers,
      },
      ...headers,
    }
  }

  async get(path, headers) {
    const requestConfig = this._buildConfig(headers)
    try {
      const res = await axios.get(`${this.BASE_URL}/${path}`, requestConfig)
      return res.data
    } catch (errorResponse) {
      if (errorResponse.status === 400) {
        return errorResponse.data
      }
    }
  }

  async post(path, body, headers) {
    const requestConfig = this._buildConfig(headers)
    try {
      const res = await axios.post(`${this.BASE_URL}/${path}`, body, requestConfig)
      return res.data
    } catch (errorResponse) {
      if (errorResponse.status === 400) {
        return errorResponse.data
      }
    }
  }

  async put(path, body, headers) {
    const requestConfig = this._buildConfig(headers)
    try {
      const res = await axios.put(`${this.BASE_URL}/${path}`, body, requestConfig)
      return res.data
    } catch (errorResponse) {
      if (errorResponse.status === 400) {
        return errorResponse.data
      }
    }
  }

  async delete(path, headers) {
    const requestConfig = this._buildConfig(headers)
    try {
      const res = await axios.delete(`${this.BASE_URL}/${path}`, requestConfig)
      return res.data
    } catch (errorResponse) {
      if (errorResponse.status === 400) {
        return errorResponse.data
      }
    }
  }
}

export {
  HttpClient,
}