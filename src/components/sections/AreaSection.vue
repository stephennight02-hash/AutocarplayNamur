<template>
  <section id="zone" class="section-padding overflow-hidden">
    <div class="container-premium mx-auto px-6">
      <div class="text-center max-w-3xl mx-auto mb-16 area-header">
        <div class="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">
          Zone d'intervention
        </div>
        <h2 class="text-4xl md:text-5xl font-display font-bold mb-6">Namur et ses alentours</h2>
        <p class="text-lg text-secondary">Nous intervenons à Namur et dans un rayon d'environ 30 minutes.</p>
      </div>

      <div class="grid lg:grid-cols-3 gap-8 items-start">
        <!-- Map -->
        <div class="lg:col-span-2 card-premium p-1 md:p-2 h-[400px] md:h-[500px] map-container">
          <div id="leaflet-map" class="w-full h-full rounded-[18px] z-10 relative bg-gray-100 dark:bg-gray-800"></div>
        </div>

        <!-- Info Cards -->
        <div class="flex flex-col gap-6 area-cards">
          <div class="card-premium">
            <div class="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-primary mb-4">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 class="font-bold text-xl mb-2">Intervention à domicile</h3>
            <p class="text-secondary text-sm">Nous nous déplaçons directement chez vous pour réaliser l'installation dans des conditions optimales.</p>
          </div>

          <div class="card-premium">
            <div class="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-primary mb-4">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="font-bold text-xl mb-2">Rayon de 30 minutes</h3>
            <p class="text-secondary text-sm">Namur et toutes les communes environnantes dans un rayon d'environ 30 minutes de trajet.</p>
          </div>
          
          <p class="text-sm text-secondary italic px-4">
            * Des frais de déplacement peuvent être appliqués selon la distance.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let map = null

const initMap = () => {
  const isDark = document.documentElement.classList.contains('dark') || 
                 window.matchMedia('(prefers-color-scheme: dark)').matches

  map = L.map('leaflet-map', {
    zoomControl: false,
    scrollWheelZoom: false
  }).setView([50.4669, 4.8675], 10)

  L.control.zoom({ position: 'bottomright' }).addTo(map)

  const tileUrl = isDark 
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    
  L.tileLayer(tileUrl, {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

  L.circle([50.4669, 4.8675], {
    color: '#0071e3',
    fillColor: '#0071e3',
    fillOpacity: 0.1,
    weight: 2,
    radius: 25000
  }).addTo(map)

  const pulseIcon = L.divIcon({
    className: 'custom-div-icon',
    html: '<div class="w-4 h-4 bg-blue-600 rounded-full shadow-[0_0_0_4px_rgba(0,113,227,0.3)] relative"><div class="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-75"></div></div>',
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  })

  L.marker([50.4669, 4.8675], { icon: pulseIcon }).addTo(map)
}

onMounted(() => {
  setTimeout(initMap, 100)

  gsap.from('.area-header', {
    scrollTrigger: {
      trigger: '#zone',
      start: 'top 80%',
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  })

  gsap.from('.map-container', {
    scrollTrigger: {
      trigger: '.map-container',
      start: 'top 85%',
    },
    x: -40,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out'
  })

  gsap.from('.area-cards .card-premium', {
    scrollTrigger: {
      trigger: '.map-container',
      start: 'top 80%',
    },
    x: 40,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2,
    ease: 'power2.out'
  })
})

onUnmounted(() => {
  if (map) {
    map.remove()
  }
})
</script>

<style>
.leaflet-container {
  font-family: var(--font-sans) !important;
  z-index: 10;
}
.leaflet-control-zoom {
  border: none !important;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
  border-radius: 8px !important;
  overflow: hidden;
}
.leaflet-control-zoom a {
  color: #1d1d1f !important;
  border-bottom-color: #f5f5f7 !important;
}
.dark .leaflet-control-zoom a {
  background-color: #1c1c1e !important;
  color: #f5f5f7 !important;
  border-bottom-color: #2c2c2e !important;
}
.dark .leaflet-control-zoom a:hover {
  background-color: #2c2c2e !important;
}
</style>
