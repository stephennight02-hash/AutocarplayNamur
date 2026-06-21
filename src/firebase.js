import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: "AIzaSyBXz44eewV33LeEI2gKNCQAiIvrN9WmTCI",
  authDomain: "autocarplaynamur.firebaseapp.com",
  projectId: "autocarplaynamur",
  storageBucket: "autocarplaynamur.firebasestorage.app",
  messagingSenderId: "1036998072469",
  appId: "1:1036998072469:web:dad85f41df35edeb51639c",
  measurementId: "G-FL2QNDCY97"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const db = getFirestore(app, 'default')
export const auth = getAuth(app)
export const storage = getStorage(app)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null

export default app
