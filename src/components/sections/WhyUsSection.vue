<template>
  <section id="pourquoi" class="section-padding">
    <div class="container-premium mx-auto px-6">
      
      <div class="text-center max-w-3xl mx-auto mb-16 why-header">
        <div class="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">
          Pourquoi nous choisir
        </div>
        <h2 class="text-4xl md:text-5xl font-display font-bold mb-6">La qualité et le soin avant tout</h2>
        <p class="text-lg text-secondary">Chaque installation est réalisée avec soin et minutie.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 why-grid">
        <div v-for="(item, index) in items" :key="index" class="card-premium">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white mb-5 shadow-glow">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" v-html="item.iconPath"></svg>
          </div>
          <h3 class="text-lg font-bold mb-2">{{ item.title }}</h3>
          <p class="text-secondary text-sm">{{ item.desc }}</p>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const items = [
  { title: 'Installation soignée', desc: "Chaque câble, chaque connexion est réalisée avec précision.", iconPath: '<path d="M12 3l1.912 5.813a2 2 0 001.272 1.272L21 12l-5.816 1.916a2 2 0 00-1.272 1.272L12 21l-1.912-5.812a2 2 0 00-1.272-1.272L3 12l5.816-1.916a2 2 0 001.272-1.272L12 3z" />' },
  { title: 'Conseils personnalisés', desc: "Un accompagnement adapté à votre véhicule et vos besoins.", iconPath: '<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />' },
  { title: 'Prix compétitifs', desc: "Des tarifs justes et transparents, sans mauvaise surprise.", iconPath: '<path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />' },
  { title: 'Déplacement à domicile', desc: "Nous nous déplaçons directement chez vous pour plus de confort.", iconPath: '<path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />' },
  { title: 'Passion automobile', desc: "Passionné par l'automobile et les technologies embarquées.", iconPath: '<path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />' },
  { title: 'Service rapide', desc: "Installation réalisée dans les meilleurs délais.", iconPath: '<path d="M13 10V3L4 14h7v7l9-11h-7z" />' },
  { title: 'Compatibilité multimarques', desc: "Nous intervenons sur de nombreuses marques automobiles.", iconPath: '<circle cx="12" cy="12" r="10" /><path d="M12 2v20m-8.66-5h17.32M3.34 7h17.32" />' },
  { title: 'Accompagnement', desc: "De la demande de devis à l'installation, nous vous guidons.", iconPath: '<path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />' },
]

onMounted(() => {
  gsap.from('.why-header', {
    scrollTrigger: {
      trigger: '#pourquoi',
      start: 'top 80%',
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  })

  gsap.from('.why-grid .card-premium', {
    scrollTrigger: {
      trigger: '.why-grid',
      start: 'top 85%',
    },
    y: 30,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power2.out'
  })
})
</script>
