import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Register, User } from '@/core/database/DbType.ts'
import UserService from '@/shared/api/UserService.ts'

export const useUserStore = defineStore('user', () => {
  const user = ref<User>();
  
  const register = (data: Register)=> {
    return UserService.register(data)
  }

  const login = (data: Register) => {
    return UserService.login(data)
  }
  
  
  return{
    user,
    login,
    register,
  }
})