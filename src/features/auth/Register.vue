<script setup lang="ts">
import { hasInvalidString, isNull } from '@/shared/service/Utils.ts'
import { computed, onMounted, ref } from 'vue'
import type { Register } from '@/core/database/DbType.ts'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/core/stores/UserStore.ts'

const router = useRouter()
const userStore = useUserStore()
const success = ref(false)
const loading = ref(false)
const registerForm = ref<Register>({
  username: '',
  password: '',
})

const errors = computed(() => {
  const data = registerForm.value as Register
  if (isNull(data.username) && isNull(data.password)) return {}
  return {
    username: data.username.trim().length == 0,
    password: data.password.trim().length == 0,
  }
})

const register = () => {
  loading.value = true
  const data = registerForm.value as Register
  if (hasInvalidString(data.password, data.username)) return
  userStore
    .register(data)
    .then(() => {
        success.value = true
      setTimeout(()=>{
      router.push('/')
      }, 1500)
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
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">INSCRIPTION</h2>
    </div>

    <Transition>
      <div
        v-if="success"
        class="sm:mx-auto sm:w-full sm:max-w-sm mt-5 bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
      >
        <div>
          <span class="font-bold">Inscription réussie ! </span>
          <span class="text-sm"
            >Veuillez vous <RouterLink class="font-bold" to="/">connecter</RouterLink> .</span
          >
        </div>
      </div>
    </Transition>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form v-on:submit.prevent="register" method="POST" class="space-y-6">
        <div class="mt-2">
          <label for="username" class="block text-sm/6 font-medium text-gray-100">Speudo</label>
          <input
            id="username"
            type="text"
            name="username"
            required
            v-model.trim.lazy="registerForm.username"
            autocomplete="Speudo"
            class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
          />
          <Transition>
            <span v-if="errors.username" class="text-[10px] font-bold text-red-500">
              Veuillez entre votre speudo
            </span>
          </Transition>
        </div>

        <div class="mt-2 mb-10">
          <label for="password" class="block text-sm/6 font-medium text-gray-100">
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            name="password"
            required
            v-model.trim.lazy="registerForm.password"
            autocomplete="current-password"
            class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
          />
          <Transition>
            <span v-if="errors.password" class="text-[10px] font-bold text-red-500">
              Le mot de passe est obligatoir
            </span>
          </Transition>
        </div>

        <div>
          <button
            type="submit"
            :disabled="hasInvalidString(registerForm.username, registerForm.password) || loading"
            class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 cursor-pointer disabled:bg-indigo-400 disabled:cursor-not-allowed"
          >
            S'inscrire
          </button>
        </div>
        <div class="text-center text-white">
          <RouterLink to="/" class="font-semibold text-indigo-400 hover:text-indigo-300">
            <i class="bx bx-arrow-back"></i> Retour à la connexion
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

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
