<template>
  <section id="realisations" class="section-padding bg-surface-alt dark:bg-dark-surface-alt">
    <div class="container-premium mx-auto px-6">
      
      <div class="text-center max-w-3xl mx-auto mb-12 gallery-header">
        <div class="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">
          Nos réalisations
        </div>
        <h2 class="text-4xl md:text-5xl font-display font-bold mb-6">Des installations qui parlent d'elles-mêmes</h2>
        <p class="text-lg text-secondary">Découvrez quelques-unes de nos installations récentes.</p>
      </div>

      <!-- Filters -->
      <div class="flex justify-center mb-12 gallery-filters">
        <div class="inline-flex bg-gray-200 dark:bg-gray-800 rounded-full p-1">
          <button 
            @click="activeFilter = 'all'" 
            class="px-6 py-2 rounded-full text-sm font-medium transition-all duration-300"
            :class="activeFilter === 'all' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'"
          >
            Toutes
          </button>
          <button 
            @click="activeFilter = 'before-after'" 
            class="px-6 py-2 rounded-full text-sm font-medium transition-all duration-300"
            :class="activeFilter === 'before-after' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'"
          >
            Avant / Après
          </button>
        </div>
      </div>

      <!-- Gallery Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gallery-grid">
        <div v-for="(item, index) in filteredItems" :key="index" 
             class="group relative rounded-2xl overflow-hidden aspect-4/3 cursor-pointer shadow-card transform transition-transform duration-500 hover:scale-[1.02] border border-gray-200 dark:border-gray-800"
             @click="openLightbox(item)">
             
          <!-- Placeholder Gradient Image -->
          <div class="absolute inset-0 bg-gradient-to-br transition-transform duration-700 group-hover:scale-110"
               :class="item.gradient">
            <div class="absolute inset-0 flex items-center justify-center opacity-30 text-white font-display text-4xl font-bold px-8 text-center mix-blend-overlay">
              {{ item.title }}
            </div>
          </div>
          
          <!-- Badge Before/After -->
          <div v-if="item.type === 'before-after'" class="absolute top-4 right-4 z-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur text-gray-900 dark:text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
            Avant / Après
          </div>

          <!-- Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-10">
            <h3 class="text-white font-bold text-xl mb-1">{{ item.title }}</h3>
            <p class="text-gray-300 text-sm mb-4">{{ item.desc }}</p>
            <div class="inline-flex items-center gap-2 text-white text-sm font-medium">
              <span class="w-8 h-8 rounded-full bg-primary/80 flex items-center justify-center backdrop-blur-sm">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </span>
              Voir les détails
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="lightboxOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm">
          <button @click="closeLightbox" class="absolute top-6 right-6 text-white/70 hover:text-white p-2 transition-colors z-50">
            <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <button @click="prevImage" class="absolute left-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-4 transition-colors z-50 hidden md:block">
            <svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button @click="nextImage" class="absolute right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-4 transition-colors z-50 hidden md:block">
            <svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div class="relative max-w-5xl w-full px-4" @click.stop>
            <div class="aspect-video bg-gradient-to-br rounded-2xl flex items-center justify-center relative overflow-hidden" :class="activeItem.gradient">
              <div class="text-white/50 font-display text-4xl md:text-5xl font-bold mix-blend-overlay px-4 text-center">
                Photos réelles à venir
              </div>
              
              <div v-if="activeItem.type === 'before-after'" class="absolute inset-x-0 bottom-0 flex justify-between p-6 bg-gradient-to-t from-black/80 to-transparent">
                <div class="text-white font-bold text-lg">Avant</div>
                <div class="text-white font-bold text-lg">Après</div>
              </div>
            </div>
            <div class="mt-6 text-center">
              <h3 class="text-2xl font-bold text-white mb-2">{{ activeItem.title }}</h3>
              <p class="text-gray-400">{{ activeItem.desc }}</p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const activeFilter = ref('all')
const lightboxOpen = ref(false)
const activeItemIndex = ref(0)

const items = [
  { title: 'BMW Série 3', desc: 'Installation CarPlay sans fil', type: 'after', gradient: 'from-blue-600 to-blue-800' },
  { title: 'Mercedes Classe C', desc: 'CarPlay + Caméra de recul', type: 'before-after', gradient: 'from-gray-700 to-gray-900' },
  { title: 'Audi A4', desc: 'Android Auto', type: 'after', gradient: 'from-indigo-600 to-indigo-800' },
  { title: 'Volkswagen Golf', desc: 'Activation options', type: 'before-after', gradient: 'from-emerald-600 to-emerald-800' },
  { title: 'Peugeot 308', desc: 'Installation CarPlay', type: 'after', gradient: 'from-violet-600 to-violet-800' },
  { title: 'Renault Mégane', desc: 'Caméra de recul HD', type: 'after', gradient: 'from-cyan-600 to-cyan-800' }
]

const filteredItems = computed(() => {
  if (activeFilter.value === 'all') return items
  return items.filter(item => item.type === activeFilter.value)
})

const activeItem = computed(() => {
  return filteredItems.value[activeItemIndex.value] || items[0]
})

const openLightbox = (item) => {
  activeItemIndex.value = filteredItems.value.indexOf(item)
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}

const nextImage = () => {
  activeItemIndex.value = (activeItemIndex.value + 1) % filteredItems.value.length
}

const prevImage = () => {
  activeItemIndex.value = (activeItemIndex.value - 1 + filteredItems.value.length) % filteredItems.value.length
}

const handleKeydown = (e) => {
  if (!lightboxOpen.value) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowRight') nextImage()
  if (e.key === 'ArrowLeft') prevImage()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  
  gsap.from('.gallery-header, .gallery-filters', {
    scrollTrigger: {
      trigger: '#realisations',
      start: 'top 80%',
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out'
  })

  gsap.from('.gallery-grid > div', {
    scrollTrigger: {
      trigger: '.gallery-grid',
      start: 'top 85%',
    },
    y: 40,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out'
  })
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.aspect-4\/3 {
  aspect-ratio: 4 / 3;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
