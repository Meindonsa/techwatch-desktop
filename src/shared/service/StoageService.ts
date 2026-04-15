import { SecurityStorage } from '@meindonsa/security-storage'

const securityStorage = new SecurityStorage()
const StorageService = {

  setItem(key:string, data: any) {
    securityStorage.setItem(key, data);
  },

  getItem(key: string) {
    return securityStorage.getItem(key);
  },

  remove(key: string) {
    securityStorage.removeItem(key);
  },

  clear() {
    securityStorage.clear();
  }
}

export default StorageService;