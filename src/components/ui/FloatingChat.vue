<template>
  <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end">
    
    <!-- Chat Window -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform scale-95 opacity-0 translate-y-4"
      enter-to-class="transform scale-100 opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform scale-100 opacity-100 translate-y-0"
      leave-to-class="transform scale-95 opacity-0 translate-y-4"
    >
      <div v-if="isOpen" class="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 w-80 sm:w-96 mb-4 overflow-hidden">
        
        <!-- Header -->
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white relative">
          <button @click="isOpen = false" class="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-colors">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-inner">
              <span class="text-2xl">👋</span>
            </div>
            <div>
              <h3 class="font-bold text-lg leading-tight">Besoin d'aide ?</h3>
              <p class="text-white/80 text-sm">Nous répondons rapidement</p>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="p-6">
          <div class="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 mb-6 relative">
            <div class="absolute -top-2 left-6 w-4 h-4 bg-gray-50 dark:bg-gray-800 transform rotate-45"></div>
            <p class="text-gray-700 dark:text-gray-300 text-sm font-medium">
              Bonjour ! Pour une réponse quasi-immédiate ou pour nous envoyer des photos de votre véhicule, nous vous recommandons fortement de passer par Instagram.
            </p>
          </div>

          <div class="space-y-3">
            <a href="https://ig.me/m/autocarplay.namur" target="_blank" class="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-bold py-3.5 px-4 rounded-xl hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 transform hover:-translate-y-0.5">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" />
              </svg>
              Discuter sur Instagram
            </a>
            
            <button @click="scrollToContact" class="w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold py-3.5 px-4 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              Laisser un message ici
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- FAB Button -->
    <button 
      @click="isOpen = !isOpen"
      class="group relative w-16 h-16 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/50 hover:scale-105 transition-all duration-300"
    >
      <!-- Notification Badge -->
      <span v-if="!isOpen" class="absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-white rounded-full"></span>
      
      <!-- Icon -->
      <svg v-if="!isOpen" class="w-8 h-8 text-white group-hover:-rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
      <svg v-else class="w-8 h-8 text-white rotate-90 group-hover:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isOpen = ref(false)

// Optional: Open automatically after a delay to grab attention
onMounted(() => {
  setTimeout(() => {
    if (!localStorage.getItem('chat_seen')) {
      isOpen.value = true
      localStorage.setItem('chat_seen', 'true')
    }
  }, 10000) // Opens after 10 seconds
})

const scrollToContact = () => {
  isOpen.value = false
  const contactSection = document.getElementById('contact')
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>
