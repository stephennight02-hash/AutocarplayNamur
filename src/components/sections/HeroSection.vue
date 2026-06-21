<template>
  <header id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
    <!-- Animated background mesh -->
    <div class="absolute inset-0 z-0 opacity-40 dark:opacity-20 pointer-events-none mix-blend-multiply dark:mix-blend-screen"
         style="background: radial-gradient(circle at 20% 30%, rgba(0, 113, 227, 0.4) 0%, transparent 50%),
                    radial-gradient(circle at 80% 70%, rgba(41, 151, 255, 0.4) 0%, transparent 50%);
              filter: blur(60px);">
    </div>

    <div class="container-premium mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
      <!-- Text Content -->
      <div class="hero-content flex flex-col items-start text-left">
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight mb-6 leading-tight">
          Installation <span class="gradient-text">CarPlay</span> professionnelle à domicile.
        </h1>
        
        <p class="hero-subtitle text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mb-10 leading-relaxed">
          Modernisez votre véhicule avec Apple CarPlay, Android Auto et des solutions multimédia professionnelles à Namur et ses alentours.
        </p>
        
        <div class="hero-buttons flex flex-wrap gap-4 mb-20">
          <a href="#contact" class="btn-primary py-3.5 px-8 text-base shadow-glow">
            Demander un devis
          </a>
          <a href="#realisations" class="btn-secondary py-3.5 px-8 text-base bg-white dark:bg-transparent">
            Voir les réalisations
          </a>
        </div>
        
        <!-- Trust Badges -->
        <div class="hero-badges flex flex-wrap gap-y-3 gap-x-6 text-sm font-medium text-gray-700 dark:text-gray-300">
          <div v-for="(badge, index) in badges" :key="index" class="flex items-center gap-2">
            <div class="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-primary">
              <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            {{ badge }}
          </div>
        </div>
      </div>

      <!-- Image Mockup -->
      <div class="hero-mockup hidden lg:flex justify-center relative perspective-1000">
        <!-- Floating orbs behind mockup -->
        <div class="absolute w-[120%] h-[120%] bg-gradient-to-tr from-primary/30 to-purple-500/30 rounded-full blur-[80px] animate-pulse" style="animation-duration: 6s; z-index: -1;"></div>
        
        <div class="relative w-full max-w-[600px] aspect-[16/10] rounded-[2rem] bg-gray-900 shadow-2xl border-[6px] border-gray-800/80 overflow-hidden transform-gpu z-10 flex items-center justify-center group">
          <!-- Real image placeholder -->
          <img src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=1200&auto=format&fit=crop" alt="Apple CarPlay Installation" class="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <a href="#services" class="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 hover:text-primary transition-colors animate-bounce">
      <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </a>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const mockupRef = ref(null)

const badges = [
  'Déplacement à domicile',
  'Intervention rapide',
  'Toutes marques',
  'Prix compétitifs',
  'Devis gratuit'
]

const handleMouseMove = (e) => {
  if (!mockupRef.value) return
  const { left, top, width, height } = mockupRef.value.getBoundingClientRect()
  const x = (e.clientX - left - width / 2) / 25
  const y = (e.clientY - top - height / 2) / 25
  
  gsap.to(mockupRef.value, {
    rotateY: x,
    rotateX: -y,
    duration: 0.5,
    ease: "power2.out"
  })
}

const handleMouseLeave = () => {
  if (!mockupRef.value) return
  gsap.to(mockupRef.value, {
    rotateY: 0,
    rotateX: 0,
    duration: 1,
    ease: "elastic.out(1, 0.3)"
  })
}

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  
  tl.fromTo('h1', 
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, delay: 0.2 }
  )
  .fromTo('.hero-subtitle',
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8 },
    '-=0.6'
  )
  .fromTo('.hero-buttons',
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8 },
    '-=0.6'
  )
  .fromTo('.hero-badges > div',
    { y: 15, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
    '-=0.4'
  )
  .fromTo('.hero-mockup',
    { x: 50, opacity: 0, rotateY: -15, scale: 0.9 },
    { x: 0, opacity: 1, rotateY: -5, scale: 1, duration: 1.5, ease: 'power2.out' },
    '-=1.5'
  )
  
  // Floating animation for mockup
  gsap.to('.hero-mockup', {
    y: -15,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  })
})
</script>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}
</style>
