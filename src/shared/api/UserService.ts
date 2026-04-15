import api from '@/shared/api/axiosInstance.ts'
import type { Register } from '@/core/database/DbType.ts'
const axios = api

const UserService = {

  async login(data: Register) {
    return axios({method: 'POST', url: 'auth/login', data})
  },

  async register(data: Register) {
    return axios({method: 'POST', url: 'users', data})
  }
}

export default UserService;