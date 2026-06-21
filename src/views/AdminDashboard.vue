<template>
  <div class="admin-layout">
    <AdminSidebar />

    <main class="admin-main">
      <div class="admin-container">
        
        <!-- Header -->
        <header class="page-header">
          <div>
            <h1 class="page-title">Vue d'ensemble</h1>
            <p class="page-subtitle">Bienvenue, voici un résumé de votre activité.</p>
          </div>
          <button 
            v-if="requestsStore.requests.length === 0" 
            @click="seedData" 
            :disabled="isSeeding"
            class="seed-btn"
          >
            <span v-if="isSeeding" class="spinner"></span>
            <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            Générer données test
          </button>
        </header>
        
        <!-- Stats Grid -->
        <div class="stats-grid">
          <div class="stat-card stat-visitors">
            <div class="stat-icon-wrap visitors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <div class="stat-content">
              <p class="stat-label">Visiteurs aujourd'hui</p>
              <p class="stat-value">{{ visitsStore.todayVisits }}</p>
              <p class="stat-meta positive">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /></svg>
                Donnée réelle
              </p>
            </div>
          </div>
          
          <div class="stat-card stat-pending">
            <div class="stat-icon-wrap pending">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div class="stat-content">
              <p class="stat-label">En attente</p>
              <p class="stat-value">{{ pendingRequests }}</p>
              <p class="stat-meta neutral">Sur {{ totalRequests }} demandes totales</p>
            </div>
          </div>

          <div class="stat-card stat-completed">
            <div class="stat-icon-wrap completed">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <div class="stat-content">
              <p class="stat-label">Traitées</p>
              <p class="stat-value">{{ completedRequests }}</p>
              <p class="stat-meta neutral">Statut « Terminé »</p>
            </div>
          </div>
        </div>

        <!-- Recent Requests -->
        <section class="recent-section">
          <h2 class="section-title">Dernières demandes</h2>
          <div class="recent-card">
            <div v-if="requestsStore.loading" class="empty-state">
              <div class="spinner-lg"></div>
              <p>Chargement...</p>
            </div>
            <div v-else-if="recentRequests.length === 0" class="empty-state">
              <div class="empty-icon">📭</div>
              <p>Aucune demande récente.</p>
            </div>
            <div v-else>
              <div v-for="req in recentRequests" :key="req.id" class="recent-row">
                <div class="recent-avatar">{{ req.name?.charAt(0)?.toUpperCase() || '?' }}</div>
                <div class="recent-info">
                  <p class="recent-name">{{ req.name }}</p>
                  <p class="recent-detail">{{ req.brand }} {{ req.model }} — {{ req.service }}</p>
                </div>
                <div class="recent-status-wrap">
                  <span class="status-pill" :class="req.status">
                    {{ req.status === 'pending' ? '⏳ En attente' : req.status === 'completed' ? '✅ Terminé' : '📞 Contacté' }}
                  </span>
                  <p class="recent-date">{{ new Date(req.createdAt?.toDate()).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) }}</p>
                </div>
              </div>
              <router-link to="/admin/requests" class="view-all-link">
                Voir toutes les demandes
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
              </router-link>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import AdminSidebar from '@/components/admin/AdminSidebar.vue'
import { useRequestsStore } from '@/stores/requests'
import { useVisitsStore } from '@/stores/visits'

const requestsStore = useRequestsStore()
const visitsStore = useVisitsStore()
const isSeeding = ref(false)

onMounted(async () => {
  await Promise.all([
    requestsStore.fetchRequests(),
    visitsStore.fetchVisitsStats()
  ])
})

const seedData = async () => {
  isSeeding.value = true
  await requestsStore.seedTestData()
  isSeeding.value = false
}

const totalRequests = computed(() => requestsStore.requests.length)
const pendingRequests = computed(() => requestsStore.requests.filter(r => r.status === 'pending').length)
const completedRequests = computed(() => requestsStore.requests.filter(r => r.status === 'completed').length)
const recentRequests = computed(() => requestsStore.requests.slice(0, 5))
</script>

<style scoped>
.admin-layout {
  min-height: 100vh;
  display: flex;
  background: #f5f6fa;
}

.dark .admin-layout { background: #0a0b0f; }

.admin-main {
  flex: 1;
  padding: 2.5rem;
  overflow-y: auto;
}

@media (min-width: 1024px) {
  .admin-main { padding: 3rem 3.5rem; }
}

.admin-container { max-width: 1100px; margin: 0 auto; }

/* Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 2.5rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.page-title {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #1d1d1f;
}

.dark .page-title { color: #f5f5f7; }

.page-subtitle {
  color: #86868b;
  font-size: 0.9375rem;
  font-weight: 500;
  margin-top: 4px;
}

.seed-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0.625rem 1.25rem;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 14px;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #1d1d1f;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: var(--font-sans);
}

.seed-btn:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transform: translateY(-1px);
}

.dark .seed-btn {
  background: #1c1c1e;
  border-color: rgba(255, 255, 255, 0.08);
  color: #f5f5f7;
}

.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(0, 113, 227, 0.2);
  border-top-color: #0071e3;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

/* Stats */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}

.stat-card {
  background: white;
  border-radius: 20px;
  padding: 1.75rem;
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
}

.stat-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  border-radius: 20px 20px 0 0;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
}

.stat-card:hover::after { opacity: 1; }

.stat-visitors::after { background: linear-gradient(90deg, #0071e3, #6366f1); }
.stat-pending::after { background: linear-gradient(90deg, #f59e0b, #f97316); }
.stat-completed::after { background: linear-gradient(90deg, #10b981, #34d399); }

.dark .stat-card {
  background: #1c1c1e;
  border-color: rgba(255, 255, 255, 0.04);
}

.dark .stat-card:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}

.stat-icon-wrap {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon-wrap.visitors {
  background: linear-gradient(135deg, rgba(0, 113, 227, 0.1), rgba(99, 102, 241, 0.1));
  color: #0071e3;
}

.stat-icon-wrap.pending {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(249, 115, 22, 0.1));
  color: #f59e0b;
}

.stat-icon-wrap.completed {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(52, 211, 153, 0.1));
  color: #10b981;
}

.stat-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #86868b;
  margin-bottom: 6px;
}

.stat-value {
  font-family: var(--font-display);
  font-size: 2.25rem;
  font-weight: 800;
  color: #1d1d1f;
  letter-spacing: -0.03em;
  line-height: 1;
}

.dark .stat-value { color: #f5f5f7; }

.stat-meta {
  font-size: 0.75rem;
  font-weight: 600;
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.stat-meta.positive { color: #34c759; }
.stat-meta.neutral { color: #86868b; }

/* Recent Section */
.section-title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 800;
  color: #1d1d1f;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.dark .section-title { color: #f5f5f7; }

.recent-card {
  background: white;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.04);
  overflow: hidden;
}

.dark .recent-card {
  background: #1c1c1e;
  border-color: rgba(255, 255, 255, 0.04);
}

.recent-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.125rem 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  transition: background 0.2s ease;
}

.recent-row:hover { background: rgba(0, 0, 0, 0.015); }
.dark .recent-row:hover { background: rgba(255, 255, 255, 0.03); }
.dark .recent-row { border-color: rgba(255, 255, 255, 0.04); }

.recent-row:last-of-type { border-bottom: none; }

.recent-avatar {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #e8ecf4, #d1d5e0);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
  color: #6e6e73;
  flex-shrink: 0;
}

.dark .recent-avatar {
  background: linear-gradient(135deg, #2c2c2e, #3a3a3c);
  color: #98989d;
}

.recent-info { flex: 1; min-width: 0; }

.recent-name {
  font-weight: 700;
  font-size: 0.875rem;
  color: #1d1d1f;
}

.dark .recent-name { color: #f5f5f7; }

.recent-detail {
  font-size: 0.8125rem;
  color: #86868b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.recent-status-wrap { text-align: right; flex-shrink: 0; }

.status-pill {
  display: inline-block;
  font-size: 0.6875rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 20px;
  margin-bottom: 2px;
}

.status-pill.pending { background: #fef3c7; color: #92400e; }
.status-pill.completed { background: #d1fae5; color: #065f46; }
.status-pill.contacted { background: #dbeafe; color: #1e40af; }

.dark .status-pill.pending { background: rgba(245, 158, 11, 0.15); color: #fbbf24; }
.dark .status-pill.completed { background: rgba(16, 185, 129, 0.15); color: #34d399; }
.dark .status-pill.contacted { background: rgba(59, 130, 246, 0.15); color: #60a5fa; }

.recent-date {
  font-size: 0.6875rem;
  color: #aeaeb2;
}

.view-all-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 1rem;
  font-size: 0.8125rem;
  font-weight: 700;
  color: #0071e3;
  text-decoration: none;
  border-top: 1px solid rgba(0, 0, 0, 0.04);
  transition: background 0.2s ease;
}

.view-all-link:hover { background: rgba(0, 113, 227, 0.04); }
.dark .view-all-link { border-color: rgba(255, 255, 255, 0.04); }

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: #86868b;
  font-size: 0.875rem;
  font-weight: 500;
  gap: 0.75rem;
}

.empty-icon { font-size: 2.5rem; }

.spinner-lg {
  width: 28px;
  height: 28px;
  border: 3px solid rgba(0, 113, 227, 0.15);
  border-top-color: #0071e3;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
