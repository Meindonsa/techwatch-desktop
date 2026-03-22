import { isUrl } from '@/shared/service/Utils.ts'
import axios from 'axios'

const API_SECRET_TOKEN = import.meta.env.VITE_API_SECRET_TOKEN

const UseWatcher =()=>{
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
       console.log(err.response.data.error)
       //throw new Error(`Unable to detect: ${err.message}`)
     })
  }
  return {
    detect,
  }
}

export default UseWatcher