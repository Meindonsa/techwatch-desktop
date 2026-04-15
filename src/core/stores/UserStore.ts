import { defineStore } from 'pinia'
import { onBeforeMount, onMounted, ref } from 'vue'
import type { Register, User } from '@/core/database/DbType.ts'
import UserService from '@/shared/api/UserService.ts'
import StorageService from '@/shared/service/StoageService.ts'

export const useUserStore = defineStore('user', () => {
  const user = ref<User>()
  const WATCHER = 'WHATCHER'

  const register = (data: Register) => {
    return UserService.register(data)
  }

  const login = (data: Register) => {
    return UserService.login(data)
  }

  const saveLogin = (data: any) => {
    user.value = data.user
    StorageService.setItem(WATCHER, data)
  }

  const getMe = ()=> {
    user.value = StorageService.getItem(WATCHER)?.user
    return user.value
  }

  return {
    user,
    getMe,
    login,
    register,
    saveLogin,
  }
})
