<template>
  <section class="section-padding bg-surface-alt dark:bg-dark-surface-alt overflow-hidden">
    <div class="container-premium mx-auto px-6">
      
      <div class="text-center max-w-3xl mx-auto mb-20 how-header">
        <div class="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">
          Comment ça fonctionne
        </div>
        <h2 class="text-4xl md:text-5xl font-display font-bold mb-6">Simple, rapide et professionnel</h2>
        <p class="text-lg text-secondary">En seulement 4 étapes, modernisez votre véhicule.</p>
      </div>

      <div class="relative max-w-4xl mx-auto how-timeline">
        <!-- Vertical Line -->
        <div class="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800 -translate-x-1/2">
          <div class="absolute top-0 left-0 w-full bg-gradient-to-b from-primary to-primary-light origin-top progress-line h-full scale-y-0"></div>
        </div>

        <!-- Steps -->
        <div class="space-y-12">
          <div v-for="(step, index) in steps" :key="index" class="relative flex flex-col md:flex-row items-start md:items-center justify-between step-item">
            
            <!-- Mobile layout: left line, circle, content right -->
            <!-- Desktop layout: alternating -->
            
            <div class="hidden md:block w-[45%] text-right pr-12" :class="{ 'md:invisible': index % 2 !== 0 }">
              <div v-if="index % 2 === 0" class="card-premium inline-block w-full text-left">
                <div class="flex items-center gap-4 mb-3">
                  <div class="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-primary">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" v-html="step.iconPath"></svg>
                  </div>
                  <h3 class="text-xl font-bold">{{ step.title }}</h3>
                </div>
                <p class="text-secondary">{{ step.desc }}</p>
              </div>
            </div>

            <!-- Center Circle -->
            <div class="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-light text-white font-bold text-lg shadow-glow z-10 shrink-0">
              {{ index + 1 }}
            </div>

            <div class="w-full md:w-[45%] pl-20 md:pl-12" :class="{ 'md:invisible': index % 2 === 0 }">
              <div v-if="index % 2 !== 0 || true" class="card-premium w-full text-left" :class="{ 'md:hidden': index % 2 === 0 }">
                <div class="flex items-center gap-4 mb-3">
                  <div class="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-primary">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" v-html="step.iconPath"></svg>
                  </div>
                  <h3 class="text-xl font-bold">{{ step.title }}</h3>
                </div>
                <p class="text-secondary">{{ step.desc }}</p>
              </div>
            </div>

          </div>
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

const steps = [
  { title: 'Demande de devis', desc: "Remplissez notre formulaire en décrivant votre véhicule et le service souhaité.", iconPath: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />' },
  { title: 'Vérification de la compatibilité', desc: "Nous vérifions la compatibilité de votre véhicule et vous envoyons un devis détaillé.", iconPath: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />' },
  { title: 'Prise de rendez-vous', desc: "Nous convenons ensemble d'une date et d'un lieu pour l'installation.", iconPath: '<path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />' },
  { title: 'Installation professionnelle', desc: "Installation soignée, test complet et démonstration de votre nouveau système.", iconPath: '<path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />' },
]

onMounted(() => {
  gsap.from('.how-header', {
    scrollTrigger: {
      trigger: '.how-header',
      start: 'top 80%',
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  })

  // Timeline progress line
  gsap.to('.progress-line', {
    scrollTrigger: {
      trigger: '.how-timeline',
      start: 'top 50%',
      end: 'bottom 50%',
      scrub: 1,
    },
    scaleY: 1,
    ease: 'none'
  })

  // Fade in steps
  const stepItems = gsap.utils.toArray('.step-item')
  stepItems.forEach((step, i) => {
    gsap.from(step, {
      scrollTrigger: {
        trigger: step,
        start: 'top 70%',
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    })
  })
})
</script>
