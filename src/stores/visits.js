import { defineStore } from 'pinia'
import { ref } from 'vue'
import { db } from '@/firebase'
import { doc, setDoc, getDoc, increment, collection, getDocs, query, orderBy, limit } from 'firebase/firestore'

export const useVisitsStore = defineStore('visits', () => {
  const todayVisits = ref(0)
  const totalVisits = ref(0)

  // Call this when a user visits the homepage
  const recordVisit = async () => {
    try {
      const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD
      const visitRef = doc(db, 'visits', today)
      
      // We just increment the counter for today
      await setDoc(visitRef, {
        count: increment(1),
        date: today
      }, { merge: true })
      
      // Also increment total visits
      const totalRef = doc(db, 'visits', 'total')
      await setDoc(totalRef, {
        count: increment(1)
      }, { merge: true })
    } catch (e) {
      console.error("Failed to record visit", e)
    }
  }

  // Admin: Call this to fetch today's and total visits
  const fetchVisitsStats = async () => {
    try {
      const today = new Date().toISOString().split('T')[0]
      const todayDoc = await getDoc(doc(db, 'visits', today))
      if (todayDoc.exists()) {
        todayVisits.value = todayDoc.data().count || 0
      } else {
        todayVisits.value = 0
      }

      const totalDoc = await getDoc(doc(db, 'visits', 'total'))
      if (totalDoc.exists()) {
        totalVisits.value = totalDoc.data().count || 0
      } else {
        totalVisits.value = 0
      }
    } catch (e) {
      console.error("Failed to fetch visits stats", e)
    }
  }

  return { todayVisits, totalVisits, recordVisit, fetchVisitsStats }
})
