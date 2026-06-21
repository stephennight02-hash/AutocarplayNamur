<template>
  <footer class="bg-gray-950 text-white py-16">
    <div class="container-premium px-6 mx-auto flex flex-col items-center text-center">
      <div class="font-display font-extrabold text-2xl tracking-tight mb-4">
        <span class="gradient-text">CarPlay</span> Namur
      </div>
      
      <p class="text-gray-400 text-sm max-w-md mb-8">
        Passionné par l'automobile et les technologies embarquées. Chaque installation est réalisée avec soin et minutie.
      </p>

      <div class="flex flex-wrap justify-center gap-6 mb-10 text-sm font-medium">
        <a href="#services" class="hover:text-primary transition-colors">Services</a>
        <a href="#realisations" class="hover:text-primary transition-colors">Réalisations</a>
        <a href="#contact" class="hover:text-primary transition-colors">Contact</a>
      </div>

      <a href="https://ig.me/m/autocarplay.namur" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 border border-gray-800 hover:border-gray-700 hover:bg-gray-800 transition-all duration-300 mb-12">
        <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      </a>

      <div class="w-full max-w-md h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mb-8"></div>
      
      <div class="text-xs text-gray-500">
        &copy; {{ new Date().getFullYear() }} CarPlay Namur. Tous droits réservés.<br>
        <span class="opacity-70 mt-2 block">Site web professionnel</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>
