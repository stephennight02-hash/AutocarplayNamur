<template>
  <section id="contact" class="section-padding bg-surface-alt dark:bg-dark-surface-alt overflow-hidden">
    <div class="container-premium mx-auto px-6">
      
      <div class="text-center max-w-3xl mx-auto mb-16 contact-header">
        <div class="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">
          Contact
        </div>
        <h2 class="text-4xl md:text-5xl font-display font-bold mb-6">Demandez votre devis gratuit</h2>
        <p class="text-lg text-secondary">Remplissez le formulaire ci-dessous et recevez votre devis personnalisé.</p>
      </div>

      <div class="max-w-3xl mx-auto relative contact-form-wrapper">
        <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-[24px] blur-3xl -z-10"></div>
        
        <div class="card-premium p-6 md:p-10 relative overflow-hidden">
          
          <!-- Success State -->
          <div v-if="isSuccess" class="absolute inset-0 bg-surface dark:bg-dark-surface z-20 flex flex-col items-center justify-center p-8 text-center animate-fade-in">
            <div class="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mb-6">
              <svg class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="text-3xl font-bold mb-4">Demande envoyée avec succès !</h3>
            <p class="text-secondary mb-8">Nous avons bien reçu votre demande et nous vous répondrons dans les plus brefs délais.</p>
            <button @click="resetForm" class="btn-secondary">
              Envoyer une autre demande
            </button>
          </div>

          <!-- Form -->
          <form @submit.prevent="submitForm" class="space-y-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold mb-2">Nom complet *</label>
                <input v-model="form.name" type="text" required class="input-premium" placeholder="Votre nom complet" />
              </div>
              <div>
                <label class="block text-sm font-semibold mb-2">Email *</label>
                <input v-model="form.email" type="email" required class="input-premium" placeholder="votre@email.com" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold mb-2 flex items-center gap-2">
                <svg class="w-4 h-4 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                Instagram (optionnel)
              </label>
              <input v-model="form.instagram" type="text" class="input-premium" placeholder="@votre_compte" />
            </div>

            <div class="grid md:grid-cols-3 gap-6">
              <div>
                <label class="block text-sm font-semibold mb-2">Marque *</label>
                <select v-model="form.brand" required class="input-premium appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2YjcyODAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSI2IDkgMTIgMTUgMTggOSI+PC9wb2x5bGluZT48L3N2Zz4=')] bg-no-repeat bg-[right_1rem_center] bg-[length:1.25em_1.25em]">
                  <option value="" disabled>Sélectionner...</option>
                  <option v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-semibold mb-2">Modèle *</label>
                <input v-model="form.model" type="text" required class="input-premium" placeholder="Ex: Série 3" />
              </div>
              <div>
                <label class="block text-sm font-semibold mb-2">Année *</label>
                <input v-model="form.year" type="number" min="1990" max="2026" required class="input-premium" placeholder="Ex: 2020" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold mb-2">Service souhaité *</label>
              <select v-model="form.service" required class="input-premium appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2YjcyODAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSI2IDkgMTIgMTggOSI+PC9wb2x5bGluZT48L3N2Zz4=')] bg-no-repeat bg-[right_1rem_center] bg-[length:1.25em_1.25em]">
                <option value="" disabled>Sélectionner...</option>
                <option v-for="service in services" :key="service" :value="service">{{ service }}</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-semibold mb-2">Photos (optionnel)</label>
              <div class="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-[14px] p-6 text-center hover:border-primary transition-colors cursor-pointer bg-surface-alt dark:bg-dark-surface-alt"
                   @click="$refs.fileInput.click()">
                <input ref="fileInput" type="file" multiple accept="image/*" class="hidden" @change="handleFileUpload" />
                <svg class="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p class="text-sm text-secondary">Glissez vos photos ici ou cliquez pour parcourir</p>
                <p class="text-xs text-gray-400 mt-1">Max 5 photos, 5MB max par photo</p>
              </div>
              <div v-if="files.length > 0" class="mt-3 flex gap-2 flex-wrap">
                <div v-for="(file, i) in files" :key="i" class="text-xs bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full flex items-center gap-2">
                  <span class="truncate max-w-[150px]">{{ file.name }}</span>
                  <button type="button" @click.stop="files.splice(i, 1)" class="text-gray-500 hover:text-red-500">&times;</button>
                </div>
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold mb-2">Message *</label>
              <textarea v-model="form.message" required rows="5" class="input-premium resize-none" placeholder="Décrivez votre projet ou posez vos questions..."></textarea>
            </div>

            <button type="submit" :disabled="requestsStore.loading" class="btn-primary w-full py-4 text-base mt-4">
              <span v-if="requestsStore.loading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              <span v-else class="flex items-center gap-2">
                Envoyer ma demande
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>
            
            <p class="text-xs text-center text-gray-500 mt-4">
              Vos données sont utilisées uniquement pour traiter votre demande. Aucun numéro de téléphone n'est requis.
            </p>
          </form>
        </div>

        <!-- Instagram Direct CTA -->
        <div class="mt-8 glass rounded-2xl p-6 relative overflow-hidden group">
          <div class="absolute top-0 left-0 w-1 h-full" style="background: linear-gradient(180deg, #833AB4, #FD1D1D, #F77737)"></div>
          <div class="flex flex-col md:flex-row items-center justify-between gap-6 pl-4">
            <div>
              <h3 class="text-xl font-bold mb-1">Vous préférez Instagram ?</h3>
              <p class="text-secondary text-sm">Envoyez-nous un message directement pour une réponse rapide.</p>
            </div>
            <a href="https://ig.me/m/autocarplay.namur" target="_blank" rel="noopener noreferrer" class="btn-secondary whitespace-nowrap !border-gray-300 dark:!border-gray-700 hover:!border-pink-500 hover:!bg-pink-500/10 hover:!text-pink-500 shrink-0">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              Discuter sur Instagram
            </a>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRequestsStore } from '@/stores/requests'

gsap.registerPlugin(ScrollTrigger)

const requestsStore = useRequestsStore()

const brands = ['BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Peugeot', 'Renault', 'Citroën', 'Ford', 'Toyota', 'Nissan', 'Hyundai', 'Kia', 'Opel', 'Skoda', 'Autre']
const services = ['Installation Apple CarPlay', 'Installation Android Auto', 'CarPlay sans fil', 'Caméra de recul', 'Activation d\'options', 'Vente de matériel']

const form = reactive({
  name: '',
  email: '',
  instagram: '',
  brand: '',
  model: '',
  year: '',
  service: '',
  message: ''
})

const files = ref([])
const isSuccess = ref(false)
const fileInput = ref(null)

const handleFileUpload = (e) => {
  const selectedFiles = Array.from(e.target.files)
  if (files.value.length + selectedFiles.length > 5) {
    alert('Maximum 5 photos.')
    return
  }
  selectedFiles.forEach(file => {
    if (file.size > 5 * 1024 * 1024) {
      alert(`Le fichier ${file.name} dépasse 5MB.`)
    } else {
      files.value.push(file)
    }
  })
  e.target.value = ''
}

const submitForm = async () => {
  const success = await requestsStore.submitRequest(form, files.value)
  if (success) {
    isSuccess.value = true
  } else {
    alert('Une erreur est survenue lors de l\'envoi.')
  }
}

const resetForm = () => {
  Object.keys(form).forEach(key => form[key] = '')
  files.value = []
  isSuccess.value = false
}

onMounted(() => {
  gsap.from('.contact-header', {
    scrollTrigger: {
      trigger: '#contact',
      start: 'top 80%',
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  })

  gsap.from('.contact-form-wrapper', {
    scrollTrigger: {
      trigger: '.contact-form-wrapper',
      start: 'top 85%',
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
    delay: 0.2
  })
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>
