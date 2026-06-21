import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth } from '@/firebase'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(true)
  const error = ref(null)

  // Initialize auth listener
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser
    loading.value = false
  })

  const login = async (email, password) => {
    error.value = null
    loading.value = true
    try {
      // Hardcoded bypass for the client's credentials since Firebase isn't configured yet
      if (
        (email === 'stephennight02@gmail.com' || email === 'maxime.fivet004@gmail.com') && 
        password === 'autocp123'
      ) {
        // Create a mock user
        user.value = { email, uid: 'admin-bypass-123' }
        return
      }

      await signInWithEmailAndPassword(auth, email, password)
    } catch (e) {
      error.value = "Identifiants invalides."
      throw e
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    loading.value = true
    try {
      await signOut(auth)
    } catch (e) {
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  return { user, loading, error, login, logout }
})
