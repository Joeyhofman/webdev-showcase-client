import axios from 'axios'
import { config } from '@/config/appconfig'

const apiBaseUrl = config.apiUrl.replace(/\/$/, '')

const apiClient = axios.create({
  baseURL: apiBaseUrl,
})

function bearerConfig() {
  const token = sessionStorage.getItem('token')
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  }
}

export { apiClient, apiBaseUrl, bearerConfig }
