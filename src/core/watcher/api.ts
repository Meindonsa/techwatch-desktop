import { isUrl } from '@/shared/service/Utils.ts'
import axios from 'axios'
import useToasterStore from '@/core/stores/UseToasterStore.ts'

const API_SECRET_TOKEN = import.meta.env.VITE_API_SECRET_TOKEN

const UseWatcher =()=>{
  const toasterStore = useToasterStore()
  const WATCHER_URL = 'https://techwatch-api-ac3l.vercel.app/'
  const instance = axios.create({
    baseURL: WATCHER_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_SECRET_TOKEN}`,
    },
  })

 const detect = (url: string)=> {
    if (!isUrl(url)) throw new Error('URL is missing')
   instance({ method: 'POST', url: `detect`, data: url, })
     .then((res) => {
       return res.data
     })
     .catch((err) => {
       toasterStore.error({ text: err.response.data.error })
     })
  }
  return {
    detect,
  }
}

export default UseWatcher