<template>
  <div class="min-h-screen relative flex items-center justify-center p-6 overflow-hidden bg-gray-50 dark:bg-gray-950">
    <!-- Premium abstract background -->
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div class="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-500/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse" style="animation-duration: 8s;"></div>
      <div class="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-500/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-pulse" style="animation-duration: 10s;"></div>
    </div>

    <div class="w-full max-w-md relative z-10">
      <!-- Glassmorphism Card -->
      <div class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl p-10 rounded-[2.5rem] shadow-[0_8px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.4)] border border-white/50 dark:border-gray-700/50">
        
        <div class="text-center mb-10">
          <div class="w-20 h-20 mx-auto bg-gradient-to-br from-gray-900 to-gray-800 dark:from-white dark:to-gray-200 rounded-2xl flex items-center justify-center mb-6 shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
            <svg class="w-10 h-10 text-white dark:text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 class="font-display font-extrabold text-3xl tracking-tight mb-2 text-gray-900 dark:text-white">
            Espace <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Admin</span>
          </h1>
          <p class="text-gray-500 dark:text-gray-400 text-sm">Connectez-vous pour gérer vos demandes</p>
        </div>

        <form @submit.prevent="login" class="space-y-6">
          <div v-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 p-4 rounded-2xl text-sm flex items-center gap-3">
            <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>
            {{ error }}
          </div>

          <div class="space-y-1.5">
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Adresse email</label>
            <input v-model="email" type="email" required class="w-full px-5 py-4 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-900 dark:text-white placeholder-gray-400" placeholder="admin@carplaynamur.be" />
          </div>

          <div class="space-y-1.5">
            <div class="flex justify-between items-center ml-1">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">Mot de passe</label>
            </div>
            <input v-model="password" type="password" required class="w-full px-5 py-4 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-900 dark:text-white placeholder-gray-400" placeholder="••••••••" />
          </div>

          <button type="submit" class="w-full py-4 px-6 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center" :disabled="loading">
            <span v-if="loading" class="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
            <span v-else>Accéder au panel</span>
          </button>
        </form>
        
        <div class="mt-8 text-center">
          <router-link to="/" class="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
            <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7V3" /></svg>
            Retour au site
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const login = async () => {
  loading.value = true
  error.value = ''
  
  try {
    await authStore.login(email.value, password.value)
    router.push('/admin/dashboard')
  } catch (err) {
    error.value = authStore.error || "Une erreur est survenue"
  } finally {
    loading.value = false
  }
}
</script>
