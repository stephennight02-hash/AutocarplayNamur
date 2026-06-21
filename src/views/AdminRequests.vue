<template>
  <div class="min-h-screen bg-surface-alt dark:bg-dark-surface-alt flex">
    <AdminSidebar />

    <main class="flex-1 p-8 md:p-16 overflow-auto">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-4xl font-display font-bold mb-12">Demandes de devis</h1>
        
        <div class="card-premium overflow-hidden !p-0">
          <div v-if="requestsStore.loading" class="p-16 text-center text-secondary">
            Chargement des demandes...
          </div>
          <div v-else-if="requestsStore.requests.length === 0" class="p-16 text-center text-secondary">
            Aucune demande pour le moment.
          </div>
          <div v-else class="overflow-x-auto">
            <table class="w-full text-left">
              <thead class="bg-gray-50 dark:bg-gray-800/50 text-sm text-secondary border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th class="px-8 py-6 font-semibold">Date</th>
                  <th class="px-8 py-6 font-semibold">Client</th>
                  <th class="px-8 py-6 font-semibold">Véhicule</th>
                  <th class="px-8 py-6 font-semibold">Service</th>
                  <th class="px-8 py-6 font-semibold">Statut</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
                <tr v-for="req in requestsStore.requests" :key="req.id" class="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                  <td class="px-8 py-6 text-sm text-gray-500">{{ new Date(req.createdAt?.toDate()).toLocaleDateString() }}</td>
                  <td class="px-8 py-6">
                    <div class="font-bold text-gray-900 dark:text-white mb-1">{{ req.name }}</div>
                    <div class="text-sm text-secondary">{{ req.email }}</div>
                  </td>
                  <td class="px-8 py-6 text-sm">
                    <span class="font-medium text-gray-900 dark:text-white">{{ req.brand }} {{ req.model }}</span> 
                    <span class="text-secondary ml-1">({{ req.year }})</span>
                  </td>
                  <td class="px-8 py-6 text-sm font-medium">{{ req.service }}</td>
                  <td class="px-8 py-6">
                    <select 
                      :value="req.status" 
                      @change="e => requestsStore.updateRequestStatus(req.id, e.target.value)"
                      class="text-sm font-bold px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none cursor-pointer transition-all hover:shadow-sm"
                      :class="{
                        'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200': req.status === 'pending',
                        'text-green-600 bg-green-50 dark:bg-green-900/20 border-green-200': req.status === 'completed',
                        'text-blue-600 bg-blue-50 dark:bg-blue-900/20 border-blue-200': req.status === 'contacted'
                      }"
                    >
                      <option value="pending">En attente</option>
                      <option value="contacted">Contacté</option>
                      <option value="completed">Terminé</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
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
