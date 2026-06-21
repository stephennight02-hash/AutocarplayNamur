<template>
  <section class="py-16 bg-white dark:bg-dark-surface overflow-hidden">
    <div class="container-premium mx-auto px-6 mb-10 text-center">
      <div class="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-4">
        Compatibilité
      </div>
      <h2 class="text-3xl md:text-4xl font-display font-bold mb-4">Toutes marques automobiles</h2>
      <p class="text-secondary max-w-2xl mx-auto">Nous intervenons sur de nombreuses marques automobiles. Contactez-nous pour vérifier la compatibilité de votre véhicule.</p>
    </div>

    <!-- Infinite scrolling rows -->
    <div class="relative w-full overflow-hidden flex flex-col gap-4 brands-container">
      <div class="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-dark-surface to-transparent z-10 pointer-events-none"></div>
      <div class="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-dark-surface to-transparent z-10 pointer-events-none"></div>
      
      <!-- Row 1 -->
      <div class="flex marquee-content whitespace-nowrap w-max">
        <div class="flex items-center gap-8 px-4" v-for="n in 2" :key="'row1-'+n">
          <div v-for="brand in row1" :key="brand" class="px-8 py-4 rounded-full border border-gray-100 dark:border-gray-800/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm shadow-sm font-semibold text-gray-400 dark:text-gray-500 transition-colors duration-300 hover:text-primary hover:border-primary/20 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 cursor-default">
            {{ brand }}
          </div>
        </div>
      </div>
      
      <!-- Row 2 -->
      <div class="flex marquee-content-reverse whitespace-nowrap w-max">
        <div class="flex items-center gap-8 px-4" v-for="n in 2" :key="'row2-'+n">
          <div v-for="brand in row2" :key="brand" class="px-8 py-4 rounded-full border border-gray-100 dark:border-gray-800/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm shadow-sm font-semibold text-gray-400 dark:text-gray-500 transition-colors duration-300 hover:text-primary hover:border-primary/20 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 cursor-default">
            {{ brand }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const allBrands = ['BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Peugeot', 'Renault', 'Citroën', 'Ford', 'Toyota', 'Nissan', 'Hyundai', 'Kia', 'Opel', 'Skoda']
const row1 = allBrands.slice(0, 7)
const row2 = allBrands.slice(7)
</script>

<style scoped>
.marquee-content {
  animation: scroll 30s linear infinite;
}
.marquee-content-reverse {
  animation: scroll-reverse 30s linear infinite;
}
.brands-container:hover .marquee-content,
.brands-container:hover .marquee-content-reverse {
  animation-play-state: paused;
}

@keyframes scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes scroll-reverse {
  from { transform: translateX(-50%); }
  to { transform: translateX(0); }
}
</style>
