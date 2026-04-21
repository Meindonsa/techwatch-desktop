import axios from 'axios'
import useToasterStore from '@/core/stores/UseToasterStore.ts'
import StorageService from '@/shared/service/StoageService.ts'

const WATCHER_URL = import.meta.env.VITE_BACK_URL
const API_SECRET_TOKEN = import.meta.env.VITE_API_SECRET_TOKEN

const api = axios.create({
  baseURL: WATCHER_URL,
  timeout: 30000,
})
api.interceptors.request.use(
  (config) => {
    config.headers.setContentType('application/json')
    config.headers['X-App-Token'] = `cs ${API_SECRET_TOKEN}`

    const userToken = StorageService.getItem('WHATCHER')?.token
    if (userToken) config.headers['Authorization'] = `Bearer ${userToken}`

    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const toasterStore = useToasterStore()
    toasterStore.error({ text: error.response.data.error })
    return Promise.reject(error)
  },
)

export default api
