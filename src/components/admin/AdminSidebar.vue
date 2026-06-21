<template>
  <aside class="admin-sidebar">
    <!-- Brand -->
    <div class="sidebar-brand">
      <router-link to="/" class="brand-link">
        <div class="brand-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="2" />
            <rect x="14" y="3" width="7" height="7" rx="2" />
            <rect x="3" y="14" width="7" height="7" rx="2" />
            <circle cx="17.5" cy="17.5" r="3.5" />
          </svg>
        </div>
        <div>
          <h1 class="brand-title">CarPlay <span>Namur</span></h1>
          <p class="brand-badge">
            <span class="pulse-dot"></span>
            Panel Admin
          </p>
        </div>
      </router-link>
    </div>

    <!-- Navigation -->
    <nav class="sidebar-nav">
      <p class="nav-label">Menu principal</p>
      
      <router-link to="/admin/dashboard" class="nav-item" :class="{ active: isActive('/admin/dashboard') }">
        <div class="nav-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
        </div>
        <span>Vue d'ensemble</span>
      </router-link>

      <router-link to="/admin/requests" class="nav-item" :class="{ active: isActive('/admin/requests') }">
        <div class="nav-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </div>
        <span>Demandes</span>
        <span v-if="pendingCount > 0" class="nav-badge">{{ pendingCount }}</span>
      </router-link>

      <router-link to="/admin/content" class="nav-item" :class="{ active: isActive('/admin/content') }">
        <div class="nav-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </div>
        <span>Contenu</span>
      </router-link>
    </nav>

    <!-- User Profile & Logout -->
    <div class="sidebar-footer">
      <div class="user-card">
        <div class="user-avatar">
          <span v-if="authStore.user?.email">{{ authStore.user.email.charAt(0).toUpperCase() }}</span>
          <span v-else>A</span>
        </div>
        <div class="user-info">
          <p class="user-name">{{ authStore.user?.email || 'Administrateur' }}</p>
          <p class="user-status">
            <span class="status-dot"></span>
            En ligne
          </p>
        </div>
      </div>
      
      <button @click="logout" class="logout-btn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        Déconnexion
      </button>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useRequestsStore } from '@/stores/requests'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const requestsStore = useRequestsStore()

const isActive = (path) => route.path === path

const pendingCount = computed(() => {
  return requestsStore.requests.filter(req => req.status === 'pending').length
})

const logout = async () => {
  if (authStore.user?.uid === 'admin-bypass-123') {
    authStore.user = null
    router.push('/admin/login')
  } else {
    await authStore.logout()
    router.push('/admin/login')
  }
}
</script>

<style scoped>
.admin-sidebar {
  width: 280px;
  min-height: 100vh;
  background: linear-gradient(180deg, #fafbff 0%, #f0f2f8 100%);
  border-right: 1px solid rgba(0, 0, 0, 0.06);
  padding: 2rem 1.25rem;
  display: none;
  flex-direction: column;
  position: relative;
  z-index: 10;
}

@media (min-width: 768px) {
  .admin-sidebar { display: flex; }
}

.dark .admin-sidebar {
  background: linear-gradient(180deg, #111318 0%, #0d0f14 100%);
  border-color: rgba(255, 255, 255, 0.06);
}

/* Brand */
.brand-link {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  text-decoration: none;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.brand-link:hover { transform: scale(1.03); }

.brand-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #0071e3, #6366f1);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 8px 24px rgba(0, 113, 227, 0.25);
}

.brand-title {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.25rem;
  letter-spacing: -0.03em;
  background: linear-gradient(135deg, #0071e3, #6366f1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.brand-title span {
  -webkit-text-fill-color: #1d1d1f;
}

.dark .brand-title span {
  -webkit-text-fill-color: #f5f5f7;
}

.brand-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.7rem;
  font-weight: 600;
  color: #6e6e73;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-top: 2px;
}

.pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #34c759;
  animation: pulse-glow 2s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(52, 199, 89, 0.4); }
  50% { box-shadow: 0 0 0 6px rgba(52, 199, 89, 0); }
}

.sidebar-brand { margin-bottom: 2.5rem; }

/* Navigation */
.sidebar-nav { flex: 1; }

.nav-label {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #86868b;
  padding: 0 1rem;
  margin-bottom: 0.75rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 0.875rem 1rem;
  border-radius: 16px;
  font-weight: 600;
  font-size: 0.9375rem;
  color: #6e6e73;
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  margin-bottom: 4px;
  position: relative;
}

.nav-item:hover {
  color: #1d1d1f;
  background: rgba(0, 0, 0, 0.04);
}

.dark .nav-item:hover {
  color: #f5f5f7;
  background: rgba(255, 255, 255, 0.06);
}

.nav-item.active {
  color: #0071e3;
  background: rgba(0, 113, 227, 0.08);
  font-weight: 700;
}

.nav-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 24px;
  background: linear-gradient(180deg, #0071e3, #6366f1);
  border-radius: 0 4px 4px 0;
}

.nav-icon {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.04);
  transition: all 0.25s ease;
  flex-shrink: 0;
}

.dark .nav-icon {
  background: rgba(255, 255, 255, 0.06);
}

.nav-item.active .nav-icon {
  background: linear-gradient(135deg, #0071e3, #6366f1);
  color: white;
  box-shadow: 0 4px 12px rgba(0, 113, 227, 0.3);
}

.nav-badge {
  margin-left: auto;
  background: linear-gradient(135deg, #ff3b30, #ff6259);
  color: white;
  font-size: 0.7rem;
  font-weight: 800;
  padding: 3px 8px;
  border-radius: 20px;
  min-width: 24px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(255, 59, 48, 0.35);
}

/* Footer */
.sidebar-footer {
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  padding-top: 1.25rem;
}

.dark .sidebar-footer {
  border-color: rgba(255, 255, 255, 0.06);
}

.user-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.02);
  margin-bottom: 0.75rem;
}

.dark .user-card {
  background: rgba(255, 255, 255, 0.03);
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #0071e3, #6366f1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  flex-shrink: 0;
}

.user-info { overflow: hidden; }

.user-name {
  font-size: 0.8125rem;
  font-weight: 700;
  color: #1d1d1f;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dark .user-name { color: #f5f5f7; }

.user-status {
  font-size: 0.6875rem;
  color: #34c759;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
}

.status-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #34c759;
}

.logout-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0.625rem;
  border-radius: 12px;
  border: none;
  background: transparent;
  color: #ff3b30;
  font-weight: 600;
  font-size: 0.8125rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: var(--font-sans);
}

.logout-btn:hover {
  background: rgba(255, 59, 48, 0.08);
}
</style>
