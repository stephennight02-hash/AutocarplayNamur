<template>
  <div class="min-h-screen bg-surface-alt dark:bg-dark-surface-alt flex">
    <AdminSidebar />

    <main class="flex-1 p-8 md:p-12 lg:p-16 overflow-auto">
      <div class="max-w-6xl mx-auto">
        <header class="mb-12">
          <h1 class="text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">Gestion du contenu</h1>
          <p class="text-secondary text-lg">Modifiez les textes, images et paramètres du site.</p>
        </header>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <!-- Card 1 -->
          <div class="group bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 relative overflow-hidden">
            <div class="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6">
              <svg class="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Textes & Sections</h3>
            <p class="text-secondary mb-6 text-sm">Modifiez les titres, descriptions et textes de la page d'accueil.</p>
            <div class="flex items-center text-sm font-semibold text-blue-600 group-hover:translate-x-2 transition-transform">
              Bientôt disponible <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="group bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 relative overflow-hidden">
            <div class="w-14 h-14 bg-green-50 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mb-6">
              <svg class="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Galerie Avant/Après</h3>
            <p class="text-secondary mb-6 text-sm">Ajoutez de nouvelles photos de vos réalisations pour vos clients.</p>
            <div class="flex items-center text-sm font-semibold text-green-600 group-hover:translate-x-2 transition-transform">
              Bientôt disponible <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="group bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 relative overflow-hidden">
            <div class="w-14 h-14 bg-purple-50 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-6">
              <svg class="w-7 h-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Témoignages</h3>
            <p class="text-secondary mb-6 text-sm">Gérez les avis de vos clients et mettez-les en avant.</p>
            <div class="flex items-center text-sm font-semibold text-purple-600 group-hover:translate-x-2 transition-transform">
              Bientôt disponible <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
            </div>
          </div>

        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import AdminSidebar from '@/components/admin/AdminSidebar.vue'
</script>
