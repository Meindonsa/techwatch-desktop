import { defineStore } from 'pinia'
import { onBeforeMount, onMounted, ref } from 'vue'
import type { LoginResponse, Register, User } from '@/core/database/DbType.ts'
import UserService from '@/shared/api/UserService.ts'
import StorageService from '@/shared/service/StoageService.ts'

export const useUserStore = defineStore('user', () => {
  const user = ref<User| null>(null)
  const WATCHER = 'WHATCHER'

  const register = (data: Register) => {
    return UserService.register(data)
  }

  const login = (data: Register) => {
    return UserService.login(data)
  }

  const saveLogin = (data: LoginResponse) => {
    user.value = data.user
    StorageService.setItem(WATCHER, data)
  }

  const logout = () => {
    user.value = null;
    StorageService.remove(WATCHER)
  }

  const getMe: User | any = () => {
    user.value = StorageService.getItem(WATCHER)?.user
    return user.value
  }

  return {
    user,
    getMe,
    login,
    logout,
    register,
    saveLogin,
  }
})
