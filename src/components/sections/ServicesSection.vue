<template>
  <section id="services" class="section-padding bg-surface-alt dark:bg-dark-surface-alt">
    <div class="container-premium mx-auto px-6">
      
      <div class="text-center max-w-3xl mx-auto mb-16 service-header">
        <div class="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">
          Nos services
        </div>
        <h2 class="text-4xl md:text-5xl font-display font-bold mb-6">Des solutions multimédia sur mesure</h2>
        <p class="text-lg text-secondary">Découvrez nos services d'installation professionnelle pour moderniser votre véhicule.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 services-grid">
        <div v-for="(service, index) in services" :key="index" class="card-premium group">
          <div class="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center text-primary mb-6 transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:shadow-glow group-hover:scale-110">
            <component :is="service.icon" class="w-7 h-7" />
          </div>
          <h3 class="text-xl font-bold mb-3">{{ service.title }}</h3>
          <p class="text-secondary text-sm leading-relaxed">{{ service.desc }}</p>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import IconApple from '@/components/icons/IconApple.vue'
import IconAndroid from '@/components/icons/IconAndroid.vue'
import IconWifi from '@/components/icons/IconWifi.vue'
import IconCamera from '@/components/icons/IconCamera.vue'
import IconSettings from '@/components/icons/IconSettings.vue'
import IconShopping from '@/components/icons/IconShopping.vue'

gsap.registerPlugin(ScrollTrigger)

const services = [
  { title: 'Installation Apple CarPlay', desc: "Profitez de l'interface Apple directement sur l'écran de votre véhicule. Navigation, musique, appels en toute sécurité.", icon: IconApple },
  { title: 'Installation Android Auto', desc: "Accédez à Google Maps, Spotify et vos applications préférées depuis votre tableau de bord.", icon: IconAndroid },
  { title: 'CarPlay sans fil', desc: "Connectez votre iPhone sans câble. Profitez de CarPlay en Wi-Fi pour plus de confort.", icon: IconWifi },
  { title: 'Caméra de recul', desc: "Améliorez la sécurité de votre véhicule avec une caméra de recul haute définition.", icon: IconCamera },
  { title: 'Activation d\'options', desc: "Déblocage et activation des options cachées de votre véhicule selon la marque et le modèle.", icon: IconSettings },
  { title: 'Vente de matériel', desc: "Écrans, boîtiers CarPlay, caméras et accessoires multimédia de qualité.", icon: IconShopping }
]

onMounted(() => {
  gsap.from('.service-header', {
    scrollTrigger: {
      trigger: '#services',
      start: 'top 80%',
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  })

  gsap.from('.services-grid .card-premium', {
    scrollTrigger: {
      trigger: '.services-grid',
      start: 'top 85%',
    },
    y: 40,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out'
  })
})
</script>
