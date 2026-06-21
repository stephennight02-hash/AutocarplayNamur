<template>
  <div :class="{ dark: isDark }" class="min-h-screen">
    <router-view />
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isDark = ref(false)

const isAdmin = computed(() => route.path.startsWith('/admin'))

onMounted(() => {
  // Auto dark mode detection
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
  isDark.value = darkQuery.matches

  darkQuery.addEventListener('change', (e) => {
    isDark.value = e.matches
  })
})
</script>
