<template>
  <nav
    class="fixed top-0 w-full z-50 h-20 transition-all duration-500 flex items-center"
    :class="[
      isScrolled 
        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-md border-b border-gray-200 dark:border-gray-800' 
        : 'bg-transparent'
    ]"
  >
    <div class="container-premium mx-auto px-6 lg:px-8 flex items-center justify-between h-full">
      <router-link to="/" class="flex items-center gap-2">
        <span class="font-display font-extrabold text-xl tracking-tight text-gray-900 dark:text-white">
          <span class="gradient-text">CarPlay</span> Namur
        </span>
      </router-link>

      <div class="hidden md:flex items-center gap-8">
        <a 
          v-for="link in links" 
          :key="link.href" 
          :href="link.href"
          class="text-sm font-medium transition-colors duration-300"
          :class="[
            activeSection === link.id 
              ? 'text-primary' 
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
          ]"
        >
          {{ link.name }}
        </a>
      </div>

      <div class="hidden md:flex items-center">
        <a href="#contact" class="btn-primary py-2 px-6 text-sm">
          Demander un devis
        </a>
      </div>

      <button 
        class="md:hidden flex flex-col items-center justify-center gap-1.5 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        aria-label="Toggle menu"
      >
        <span class="w-5 h-0.5 bg-gray-900 dark:bg-white rounded transition-all duration-300" :class="{ 'rotate-45 translate-y-2': isMobileMenuOpen }"></span>
        <span class="w-5 h-0.5 bg-gray-900 dark:bg-white rounded transition-all duration-300" :class="{ 'opacity-0': isMobileMenuOpen }"></span>
        <span class="w-5 h-0.5 bg-gray-900 dark:bg-white rounded transition-all duration-300" :class="{ '-rotate-45 -translate-y-2': isMobileMenuOpen }"></span>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div 
      class="md:hidden fixed inset-x-0 top-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 transition-all duration-300 overflow-hidden"
      :class="isMobileMenuOpen ? 'max-h-screen border-t py-6' : 'max-h-0 py-0 border-transparent'"
    >
      <div class="container-premium mx-auto px-6 flex flex-col gap-6 text-center">
        <a 
          v-for="link in links" 
          :key="link.href" 
          :href="link.href"
          class="text-base font-medium"
          :class="[
            activeSection === link.id 
              ? 'text-primary' 
              : 'text-gray-900 dark:text-white'
          ]"
          @click="isMobileMenuOpen = false"
        >
          {{ link.name }}
        </a>
        <a href="#contact" class="btn-primary w-full py-3 text-sm mt-4" @click="isMobileMenuOpen = false">
          Demander un devis
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const activeSection = ref('')

const links = [
  { name: 'Accueil', href: '#', id: 'hero' },
  { name: 'Services', href: '#services', id: 'services' },
  { name: 'Réalisations', href: '#realisations', id: 'realisations' },
  { name: 'Zone d\'intervention', href: '#zone', id: 'zone' },
  { name: 'Pourquoi nous', href: '#pourquoi', id: 'pourquoi' },
  { name: 'Contact', href: '#contact', id: 'contact' },
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  
  // Intersection Observer for active sections
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id || 'hero'
      }
    })
  }, { threshold: 0.3, rootMargin: '-100px 0px -100px 0px' })

  setTimeout(() => {
    document.querySelectorAll('section[id], header[id="hero"]').forEach((el) => {
      observer.observe(el)
    })
  }, 500)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
