import api from '@/shared/api/axiosInstance.ts'
import type { AxiosResponse } from 'axios'

const axios = api
export const ArticleService = {

  retrieveArticles(username: string): Promise<AxiosResponse> {
    return axios({ method: 'GET', url: `articles/${username}/articles` })
  },

  async retrieveFeedArticles(username: string, feedId: number): Promise<AxiosResponse> {
    return new Promise<AxiosResponse>((resolve, reject) => {})
  },
}
