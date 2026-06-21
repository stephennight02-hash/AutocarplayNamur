<template>
  <aside class="w-72 bg-white dark:bg-dark-surface border-r border-gray-100 dark:border-gray-800 p-8 hidden md:flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] dark:shadow-[4px_0_24px_rgba(0,0,0,0.2)] z-10 relative">
    <!-- Brand -->
    <div class="mb-12">
      <router-link to="/" class="block group">
        <h1 class="font-display font-extrabold text-2xl tracking-tight transition-transform group-hover:scale-105 origin-left">
          <span class="gradient-text">CarPlay</span> <span class="text-gray-900 dark:text-white">Namur</span>
        </h1>
        <p class="text-xs text-secondary mt-1 flex items-center gap-1 font-medium">
          <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
          Système Admin
        </p>
      </router-link>
    </div>

    <!-- Navigation -->
    <nav class="space-y-4 flex-1 mt-6">
      <router-link 
        to="/admin/dashboard" 
        class="flex items-center gap-5 px-6 py-4 rounded-3xl font-bold transition-all duration-300 relative group"
        :class="isActive('/admin/dashboard') ? 'text-primary bg-blue-50/80 dark:bg-primary/10 shadow-sm' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white'"
      >
        <div v-if="isActive('/admin/dashboard')" class="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-primary rounded-r-full shadow-lg shadow-blue-500/50"></div>
        <svg class="w-6 h-6 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        Vue d'ensemble
      </router-link>

      <router-link 
        to="/admin/requests" 
        class="flex items-center justify-between px-6 py-4 rounded-3xl font-bold transition-all duration-300 relative group"
        :class="isActive('/admin/requests') ? 'text-primary bg-blue-50/80 dark:bg-primary/10 shadow-sm' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white'"
      >
        <div class="flex items-center gap-5">
          <div v-if="isActive('/admin/requests')" class="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-primary rounded-r-full shadow-lg shadow-blue-500/50"></div>
          <svg class="w-6 h-6 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          Demandes
        </div>
        <span v-if="pendingCount > 0" class="bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-full shadow-md shadow-red-500/30">{{ pendingCount }}</span>
      </router-link>

      <router-link 
        to="/admin/content" 
        class="flex items-center gap-5 px-6 py-4 rounded-3xl font-bold transition-all duration-300 relative group"
        :class="isActive('/admin/content') ? 'text-primary bg-blue-50/80 dark:bg-primary/10 shadow-sm' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white'"
      >
        <div v-if="isActive('/admin/content')" class="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-primary rounded-r-full shadow-lg shadow-blue-500/50"></div>
        <svg class="w-6 h-6 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M11 5H6a2 2 0 00-2-2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        Contenu
      </router-link>
    </nav>

    <!-- User Profile & Logout -->
    <div class="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
      <div class="flex items-center gap-4 mb-6 px-2">
        <div class="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
          <span v-if="authStore.user?.email">{{ authStore.user.email.charAt(0).toUpperCase() }}</span>
          <span v-else>A</span>
        </div>
        <div class="flex-1 overflow-hidden">
          <p class="text-sm font-bold text-gray-900 dark:text-white truncate">{{ authStore.user?.email || 'Administrateur' }}</p>
          <p class="text-xs text-secondary">Connecté</p>
        </div>
      </div>
      
      <button @click="logout" class="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 font-semibold transition-colors duration-300">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Déconnexion
      </button>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useRequestsStore } from '@/stores/requests'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const requestsStore = useRequestsStore()

const isActive = (path) => route.path === path

const pendingCount = computed(() => {
  return requestsStore.requests.filter(req => req.status === 'pending').length
})

const logout = async () => {
  if (authStore.user?.uid === 'admin-bypass-123') {
    authStore.user = null
    router.push('/admin/login')
  } else {
    await authStore.logout()
    router.push('/admin/login')
  }
}
</script>
