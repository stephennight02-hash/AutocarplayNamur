<template>
  <div class="min-h-screen bg-surface-alt dark:bg-dark-surface-alt flex">
    <AdminSidebar />

    <main class="flex-1 p-8 md:p-12 lg:p-16 overflow-auto">
      <div class="max-w-6xl mx-auto">
        
        <header class="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 class="text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">Demandes de devis</h1>
            <p class="text-secondary text-lg">Gérez les demandes de vos clients en un clin d'œil.</p>
          </div>
          <div class="bg-white dark:bg-gray-900 p-2 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-2">
            <span class="px-4 py-2 text-sm font-semibold text-gray-500">Total: {{ requestsStore.requests.length }}</span>
          </div>
        </header>
        
        <div v-if="requestsStore.loading" class="flex flex-col items-center justify-center p-24 text-secondary">
          <div class="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4"></div>
          <p class="text-lg font-medium">Chargement des demandes...</p>
        </div>
        
        <div v-else-if="requestsStore.requests.length === 0" class="card-premium p-24 flex flex-col items-center justify-center text-center">
          <div class="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
            <svg class="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Aucune demande</h3>
          <p class="text-secondary">Les nouvelles demandes apparaîtront ici.</p>
        </div>
        
        <div v-else class="space-y-6">
          <div v-for="req in requestsStore.requests" :key="req.id" class="group bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-6 md:items-center justify-between">
            
            <div class="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
              <!-- Client Info -->
              <div>
                <div class="text-sm font-semibold text-blue-600 mb-1 flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  Client
                </div>
                <div class="font-bold text-xl text-gray-900 dark:text-white mb-1">{{ req.name }}</div>
                <div class="text-secondary">{{ req.email }}</div>
                <div class="text-secondary font-medium mt-1">{{ req.phone || 'Pas de numéro' }}</div>
              </div>
              
              <!-- Vehicle Info -->
              <div>
                <div class="text-sm font-semibold text-blue-600 mb-1 flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  Projet
                </div>
                <div class="font-bold text-gray-900 dark:text-white text-lg mb-1">{{ req.brand }} {{ req.model }} <span class="text-gray-400 font-normal">({{ req.year }})</span></div>
                <div class="inline-flex px-3 py-1 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300">{{ req.service }}</div>
              </div>

              <!-- Message -->
              <div class="relative">
                <div class="text-sm font-semibold text-blue-600 mb-1 flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                  Message
                </div>
                <p class="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl italic">
                  "{{ req.message || 'Aucun message.' }}"
                </p>
                <div class="text-xs text-gray-400 mt-2 font-medium">
                  Reçu le {{ new Date(req.createdAt?.toDate()).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) }}
                </div>
              </div>
            </div>

            <!-- Status Actions -->
            <div class="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-4 md:pl-8 md:border-l border-gray-100 dark:border-gray-800 shrink-0">
              <span class="text-xs font-bold uppercase tracking-wider text-gray-400">Statut</span>
              <select 
                :value="req.status" 
                @change="e => requestsStore.updateRequestStatus(req.id, e.target.value)"
                class="text-sm font-bold px-5 py-3 rounded-2xl border-2 focus:outline-none cursor-pointer transition-all appearance-none text-center min-w-[140px]"
                :class="{
                  'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-100 dark:border-yellow-900 hover:border-yellow-300': req.status === 'pending',
                  'text-green-600 bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-900 hover:border-green-300': req.status === 'completed',
                  'text-blue-600 bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900 hover:border-blue-300': req.status === 'contacted'
                }"
              >
                <option value="pending">⏳ En attente</option>
                <option value="contacted">📞 Contacté</option>
                <option value="completed">✅ Terminé</option>
              </select>
            </div>

          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import AdminSidebar from '@/components/admin/AdminSidebar.vue'
import { useRequestsStore } from '@/stores/requests'

const requestsStore = useRequestsStore()

onMounted(() => {
  requestsStore.fetchRequests()
})
</script>
