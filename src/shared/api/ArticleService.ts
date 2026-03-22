import api from '@/shared/api/axiosInstance.ts'
import type { AxiosResponse } from 'axios'

export const ArticleService = {
  async retrieveArticles(req: any): Promise<AxiosResponse> {
   // const request: PaginatedRequest = req
    //return articleApi.retrieveArticles(request)
    return new Promise<AxiosResponse>((resolve, reject) => {})
  },

  async retrieveArticle(fid: string): Promise<AxiosResponse> {
    return new Promise<AxiosResponse>((resolve, reject) => {})
  },
}
