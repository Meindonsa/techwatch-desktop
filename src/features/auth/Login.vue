<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { LoginResponse, Register } from '@/core/database/DbType.ts'
import { useUserStore } from '@/core/stores/UserStore.ts'
import { hasInvalidString, isNull } from '@/shared/service/Utils.ts'
import { useRouter } from 'vue-router'
import MyTransition from '@/shared/components/MyTransition.vue'

const router = useRouter()
const userStore = useUserStore()
const loading = ref(false)
const loginForm = ref<Register>({
  username: '',
  password: '',
})

const errors = computed(() => {
  const data = loginForm.value as Register
  if (isNull(data.username) && isNull(data.password)) return {}
  return {
    username: data.username.trim().length == 0,
    password: data.password.trim().length == 0,
  }
})

const login = () => {
  loading.value = true
  const data = loginForm.value as Register
  if (hasInvalidString(data.password, data.username)) return
  userStore
    .login(data)
    .then((response: any) => {
      userStore.saveLogin(response.data as LoginResponse)
      router.push('/home')
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => (loading.value = false))
}

onMounted(() => {
  if (userStore.getMe()) router.push('/home')
})
</script>

<template>
  <div class="flex min-h-screen w-screen flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
        alt="Your Company"
        class="mx-auto h-10 w-auto"
      />
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
        Connecez-vous
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form v-on:submit.prevent="login" method="POST" class="space-y-6">
        <div class="mt-2">
          <label for="username" class="block text-sm/6 font-medium text-gray-100">Speudo</label>
          <input
            id="username"
            type="text"
            name="username"
            required
            v-model.trim.lazy="loginForm.username"
            autocomplete="Speudo"
            class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
          />
          <MyTransition>
            <span v-if="errors.username" class="text-[10px] font-bold text-red-500">
              Veuillez entre votre speudo
            </span>
          </MyTransition>
        </div>

        <div class="mt-2">
          <label for="password" class="block text-sm/6 font-medium text-gray-100">
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            name="password"
            required
            v-model.trim.lazy="loginForm.password"
            autocomplete="current-password"
            class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
          />
          <MyTransition>
            <span v-if="errors.password" class="text-[10px] font-bold text-red-500">
              Le mot de passe est obligatoir
            </span>
          </MyTransition>
        </div>
        <div class="flex items-center justify-end">
          <div class="text-sm">
            <a href="#" class="font-semibold text-indigo-400 hover:text-indigo-300">
              Mot de passe oublié ?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="hasInvalidString(loginForm.username, loginForm.password) || loading"
            class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 cursor-pointer disabled:bg-indigo-400 disabled:cursor-not-allowed"
          >
            Se connecter
          </button>
        </div>
        <div class="text-center text-white">
          Pas de compte ?
          <RouterLink to="/register" class="font-semibold text-indigo-400 hover:text-indigo-300">
            s'inscrire
          </RouterLink>
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6 text-gray-400">
        &copy Copyright {{ new Date().getFullYear() }}. Tous droits reservé. <br />
        Développé par
        <a
          href="https://meindonsa.vercel.app"
          target="_blank"
          class="font-semibold text-indigo-400 hover:text-indigo-300"
        >
          Boris Axel
        </a>
      </p>
    </div>
  </div>
</template>

<style scoped></style>
