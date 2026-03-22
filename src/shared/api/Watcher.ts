import { isUrl } from '@/shared/service/Utils.ts'
import api from '@/shared/api/axiosInstance.ts'

const UseWatcher = () => {
  const instance = api

  const detect = async (url: string) => {
    if (!isUrl(url)) throw new Error('URL is missing')
    return instance({ method: 'POST', url: `detect`, data: url })
  }
  return {
    detect,
  }
}

export default UseWatcher
