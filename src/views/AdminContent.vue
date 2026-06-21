<template>
  <div class="min-h-screen bg-surface-alt dark:bg-dark-surface-alt flex">
    <AdminSidebar />

    <main class="flex-1 p-8 md:p-16 overflow-auto">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-4xl font-display font-bold mb-12">Gestion du contenu</h1>
        
        <div class="card-premium p-16 text-center">
          <div class="w-20 h-20 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
            <svg class="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <h2 class="text-2xl font-bold mb-4">Section en construction</h2>
          <p class="text-secondary max-w-md mx-auto">Cette section vous permettra bientôt de modifier les textes, les images et les témoignages de votre site directement depuis cette interface.</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import AdminSidebar from '@/components/admin/AdminSidebar.vue'
</script>
