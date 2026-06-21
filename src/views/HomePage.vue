<template>
  <div class="overflow-hidden">
    <NavBar />
    <main>
      <HeroSection />
      <ServicesSection />
      <WhyUsSection />
      <HowItWorksSection />
      <BrandsSection />
      <GallerySection />
      <AreaSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
    <FooterSection />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useVisitsStore } from '@/stores/visits'

import NavBar from '@/components/layout/NavBar.vue'
import FooterSection from '@/components/layout/FooterSection.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import ServicesSection from '@/components/sections/ServicesSection.vue'
import WhyUsSection from '@/components/sections/WhyUsSection.vue'
import HowItWorksSection from '@/components/sections/HowItWorksSection.vue'
import BrandsSection from '@/components/sections/BrandsSection.vue'
import GallerySection from '@/components/sections/GallerySection.vue'
import AreaSection from '@/components/sections/AreaSection.vue'
import TestimonialsSection from '@/components/sections/TestimonialsSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'

onMounted(() => {
  const visitsStore = useVisitsStore()
  // Record a visit (silently fails if firebase config is missing)
  visitsStore.recordVisit()
})
</script>
