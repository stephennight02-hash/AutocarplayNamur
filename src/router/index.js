import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import { auth } from '@/firebase'
import { useAuthStore } from '@/stores/auth'

const AdminLogin = () => import('@/views/AdminLogin.vue')
const AdminDashboard = () => import('@/views/AdminDashboard.vue')
const AdminRequests = () => import('@/views/AdminRequests.vue')
const AdminContent = () => import('@/views/AdminContent.vue')

const routes = [
  { path: '/', component: HomePage },
  { path: '/admin/login', component: AdminLogin, meta: { requiresGuest: true } },
  { 
    path: '/admin', 
    redirect: '/admin/dashboard',
    meta: { requiresAuth: true },
    children: [
      { path: 'dashboard', component: AdminDashboard },
      { path: 'requests', component: AdminRequests },
      { path: 'content', component: AdminContent }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return savedPosition || { top: 0 }
  }
})

// Authentication Guard
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest)
  
  if (!requiresAuth && !requiresGuest) {
    return next()
  }
  
  try {
    // Check if we have a mocked user in the store (the bypass)
    const authStore = useAuthStore()
    if (authStore.user) {
      if (requiresAuth) {
        return next()
      } else if (requiresGuest) {
        return next('/admin/dashboard')
      }
    }

    // Wait for Firebase auth to initialize
    const unsubscribe = auth.onAuthStateChanged(
      user => {
        unsubscribe()
        
        if (requiresAuth && !user) {
          next('/admin/login')
        } else if (requiresGuest && user) {
          next('/admin/dashboard')
        } else {
          next()
        }
      },
      error => {
        console.error('Firebase Auth Error:', error)
        unsubscribe()
        next()
      }
    )
  } catch (error) {
    console.error('Firebase Auth Init Error:', error)
    next()
  }
})

export default router
