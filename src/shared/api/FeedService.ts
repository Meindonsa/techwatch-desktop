import api from '@/shared/api/axiosInstance.ts'
import type { Register } from '@/core/database/DbType.ts'

const axios = api
const FeedService = {

  async subscribe(username: string, url: string): Promise<Register> {
    const data = { url: url }
    return axios({ method: 'POST', url: `feeds/${username}`, data })
  },

  async unsubscribe(username: string, feed_id: number): Promise<Register> {
    return axios({ method: 'DELETE', url: `feeds/${feed_id}/users/${username}` })
  },

  async retrieveFeeds(username: string): Promise<Register> {
    return axios({ method: 'GET', url: `feeds/by-username/${username}` })
  },
}

export default FeedService;