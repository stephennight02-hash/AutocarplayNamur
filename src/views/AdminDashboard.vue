<template>
  <div class="min-h-screen bg-surface-alt dark:bg-dark-surface-alt flex">
    <AdminSidebar />

    <main class="flex-1 p-8 md:p-16 overflow-auto">
      <div class="max-w-6xl mx-auto">
        <div class="flex justify-between items-end mb-12">
          <div>
            <h1 class="text-4xl font-display font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p class="text-secondary mt-2">Bienvenue sur votre espace d'administration.</p>
          </div>
          <button 
            v-if="requestsStore.requests.length === 0" 
            @click="seedData" 
            :disabled="isSeeding"
            class="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-semibold hover:shadow-md transition-all flex items-center gap-2"
          >
            <span v-if="isSeeding" class="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
            <svg v-else class="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
            Générer données de test
          </button>
        </div>
        
        <!-- Stats Grid -->
        <div class="grid md:grid-cols-3 gap-8 mb-12">
          <div class="card-premium p-8 relative overflow-hidden group">
            <div class="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg class="w-16 h-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            </div>
            <h3 class="text-secondary text-sm font-semibold tracking-wide uppercase mb-4">Visiteurs aujourd'hui</h3>
            <p class="text-5xl font-display font-bold text-gray-900 dark:text-white">{{ visitsStore.todayVisits }}</p>
            <p class="text-xs text-green-500 font-medium mt-2 flex items-center gap-1">
              <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              Donnée réelle
            </p>
          </div>
          
          <div class="card-premium p-8 relative overflow-hidden group">
            <div class="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg class="w-16 h-16 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 class="text-secondary text-sm font-semibold tracking-wide uppercase mb-4">Demandes en attente</h3>
            <p class="text-5xl font-display font-bold text-gray-900 dark:text-white">{{ pendingRequests }}</p>
            <p class="text-xs text-secondary font-medium mt-2">Sur {{ totalRequests }} demandes totales</p>
          </div>

          <div class="card-premium p-8 relative overflow-hidden group">
            <div class="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg class="w-16 h-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 class="text-secondary text-sm font-semibold tracking-wide uppercase mb-4">Demandes traitées</h3>
            <p class="text-5xl font-display font-bold text-gray-900 dark:text-white">{{ completedRequests }}</p>
            <p class="text-xs text-secondary font-medium mt-2">Statut "Terminé"</p>
          </div>
        </div>

        <!-- Recent Requests Preview -->
        <h2 class="text-2xl font-display font-bold mb-6">Dernières demandes</h2>
        <div class="card-premium p-0 overflow-hidden">
          <div v-if="requestsStore.loading" class="p-8 text-center text-secondary">Chargement...</div>
          <div v-else-if="recentRequests.length === 0" class="p-8 text-center text-secondary">Aucune demande récente.</div>
          <div v-else class="divide-y divide-gray-100 dark:divide-gray-800">
            <div v-for="req in recentRequests" :key="req.id" class="p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
              <div>
                <p class="font-bold text-gray-900 dark:text-white">{{ req.name }}</p>
                <p class="text-sm text-secondary">{{ req.brand }} {{ req.model }} — {{ req.service }}</p>
              </div>
              <div class="text-right">
                <span 
                  class="text-xs font-bold px-3 py-1 rounded-full inline-block mb-1"
                  :class="{
                    'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20': req.status === 'pending',
                    'text-green-600 bg-green-50 dark:bg-green-900/20': req.status === 'completed',
                    'text-blue-600 bg-blue-50 dark:bg-blue-900/20': req.status === 'contacted'
                  }"
                >
                  {{ req.status === 'pending' ? 'En attente' : req.status === 'completed' ? 'Terminé' : 'Contacté' }}
                </span>
                <p class="text-xs text-secondary">{{ new Date(req.createdAt?.toDate()).toLocaleDateString() }}</p>
              </div>
            </div>
            <div class="p-4 bg-gray-50 dark:bg-gray-800/50 text-center">
              <router-link to="/admin/requests" class="text-sm font-semibold text-primary hover:text-primary-dark transition-colors">
                Voir toutes les demandes →
              </router-link>
            </div>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import AdminSidebar from '@/components/admin/AdminSidebar.vue'
import { useRequestsStore } from '@/stores/requests'
import { useVisitsStore } from '@/stores/visits'

const requestsStore = useRequestsStore()
const visitsStore = useVisitsStore()
const isSeeding = ref(false)

onMounted(async () => {
  await Promise.all([
    requestsStore.fetchRequests(),
    visitsStore.fetchVisitsStats()
  ])
})

const seedData = async () => {
  isSeeding.value = true
  await requestsStore.seedTestData()
  isSeeding.value = false
}

const totalRequests = computed(() => requestsStore.requests.length)
const pendingRequests = computed(() => requestsStore.requests.filter(r => r.status === 'pending').length)
const completedRequests = computed(() => requestsStore.requests.filter(r => r.status === 'completed').length)
const recentRequests = computed(() => requestsStore.requests.slice(0, 3))
</script>
