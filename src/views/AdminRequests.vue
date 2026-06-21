<template>
  <div class="admin-layout">
    <AdminSidebar />

    <main class="admin-main">
      <div class="admin-container">
        
        <!-- Header -->
        <header class="page-header">
          <div>
            <h1 class="page-title">Demandes de devis</h1>
            <p class="page-subtitle">Gérez et répondez aux demandes clients.</p>
          </div>
          <div class="header-stats">
            <div class="header-stat">
              <span class="header-stat-value">{{ requestsStore.requests.length }}</span>
              <span class="header-stat-label">Total</span>
            </div>
            <div class="header-stat-divider"></div>
            <div class="header-stat">
              <span class="header-stat-value pending-val">{{ pendingCount }}</span>
              <span class="header-stat-label">En attente</span>
            </div>
          </div>
        </header>
        
        <!-- Loading -->
        <div v-if="requestsStore.loading" class="empty-state">
          <div class="spinner-lg"></div>
          <p>Chargement des demandes...</p>
        </div>
        
        <!-- Empty -->
        <div v-else-if="requestsStore.requests.length === 0" class="empty-state-card">
          <div class="empty-illustration">📭</div>
          <h3>Aucune demande</h3>
          <p>Les nouvelles demandes de vos clients apparaîtront ici automatiquement.</p>
        </div>
        
        <!-- Requests List -->
        <div v-else class="requests-list">
          <div 
            v-for="req in requestsStore.requests" 
            :key="req.id" 
            class="request-card"
            :class="{ expanded: expandedId === req.id }"
            @click="toggleExpand(req.id)"
          >
            <!-- Card Header (Always Visible) -->
            <div class="request-header">
              <div class="request-avatar">{{ req.name?.charAt(0)?.toUpperCase() || '?' }}</div>
              <div class="request-summary">
                <p class="request-name">{{ req.name }}</p>
                <p class="request-preview">{{ req.brand }} {{ req.model }} ({{ req.year }}) — {{ req.service }}</p>
              </div>
              <div class="request-meta">
                <span class="status-pill" :class="req.status">
                  {{ req.status === 'pending' ? '⏳ En attente' : req.status === 'completed' ? '✅ Terminé' : '📞 Contacté' }}
                </span>
                <span class="request-date">{{ formatDate(req.createdAt) }}</span>
              </div>
              <div class="expand-icon" :class="{ rotated: expandedId === req.id }">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
              </div>
            </div>

            <!-- Expanded Details -->
            <transition name="slide">
              <div v-if="expandedId === req.id" class="request-details" @click.stop>
                
                <div class="details-grid">
                  <div class="detail-block">
                    <span class="detail-label">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                      Client
                    </span>
                    <p class="detail-value">{{ req.name }}</p>
                  </div>
                  <div class="detail-block">
                    <span class="detail-label">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                      Email
                    </span>
                    <p class="detail-value">{{ req.email }}</p>
                  </div>
                  <div class="detail-block">
                    <span class="detail-label">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" /></svg>
                      Téléphone
                    </span>
                    <p class="detail-value">{{ req.phone || 'Non renseigné' }}</p>
                  </div>
                  <div class="detail-block">
                    <span class="detail-label">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13" rx="2" /><path d="M16 8l5 3-5 3V8z" /></svg>
                      Véhicule
                    </span>
                    <p class="detail-value">{{ req.brand }} {{ req.model }} — {{ req.year }}</p>
                  </div>
                  <div class="detail-block">
                    <span class="detail-label">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                      Service
                    </span>
                    <p class="detail-value">{{ req.service }}</p>
                  </div>
                  <div class="detail-block">
                    <span class="detail-label">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                      Reçu le
                    </span>
                    <p class="detail-value">{{ formatDateLong(req.createdAt) }}</p>
                  </div>
                </div>

                <!-- Message -->
                <div v-if="req.message" class="message-block">
                  <span class="detail-label">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
                    Message du client
                  </span>
                  <p class="message-text">"{{ req.message }}"</p>
                </div>

                <!-- Actions -->
                <div class="actions-bar">
                  <div class="status-select-wrap">
                    <label class="action-label">Statut :</label>
                    <select 
                      :value="req.status" 
                      @change="e => requestsStore.updateRequestStatus(req.id, e.target.value)"
                      class="status-select"
                      :class="'status-' + req.status"
                    >
                      <option value="pending">⏳ En attente</option>
                      <option value="contacted">📞 Contacté</option>
                      <option value="completed">✅ Terminé</option>
                    </select>
                  </div>
                  <div class="action-buttons">
                    <a :href="'mailto:' + req.email + '?subject=Votre demande CarPlay - ' + req.brand + ' ' + req.model" class="action-btn email-btn">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                      Répondre par email
                    </a>
                    <a v-if="req.phone" :href="'tel:' + req.phone" class="action-btn phone-btn">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" /></svg>
                      Appeler
                    </a>
                  </div>
                </div>

              </div>
            </transition>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import AdminSidebar from '@/components/admin/AdminSidebar.vue'
import { useRequestsStore } from '@/stores/requests'

const requestsStore = useRequestsStore()
const expandedId = ref(null)

onMounted(() => {
  requestsStore.fetchRequests()
})

const pendingCount = computed(() => requestsStore.requests.filter(r => r.status === 'pending').length)

const toggleExpand = (id) => {
  expandedId.value = expandedId.value === id ? null : id
}

const formatDate = (timestamp) => {
  if (!timestamp?.toDate) return ''
  return new Date(timestamp.toDate()).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}

const formatDateLong = (timestamp) => {
  if (!timestamp?.toDate) return ''
  return new Date(timestamp.toDate()).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}
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
  gap: 1.5rem;
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

.header-stats {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.04);
  border-radius: 16px;
  padding: 0.75rem 1.25rem;
}

.dark .header-stats {
  background: #1c1c1e;
  border-color: rgba(255, 255, 255, 0.04);
}

.header-stat { text-align: center; }

.header-stat-value {
  display: block;
  font-family: var(--font-display);
  font-size: 1.375rem;
  font-weight: 800;
  color: #1d1d1f;
  letter-spacing: -0.02em;
}

.dark .header-stat-value { color: #f5f5f7; }

.pending-val { color: #f59e0b; }

.header-stat-label {
  font-size: 0.6875rem;
  font-weight: 600;
  color: #86868b;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.header-stat-divider {
  width: 1px;
  height: 32px;
  background: rgba(0, 0, 0, 0.08);
}

.dark .header-stat-divider { background: rgba(255, 255, 255, 0.08); }

/* Empty States */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 2rem;
  color: #86868b;
  font-weight: 500;
  gap: 1rem;
}

.spinner-lg {
  width: 32px;
  height: 32px;
  border: 3px solid rgba(0, 113, 227, 0.15);
  border-top-color: #0071e3;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

.empty-state-card {
  background: white;
  border-radius: 24px;
  border: 1px solid rgba(0, 0, 0, 0.04);
  padding: 4rem 2rem;
  text-align: center;
}

.dark .empty-state-card {
  background: #1c1c1e;
  border-color: rgba(255, 255, 255, 0.04);
}

.empty-illustration { font-size: 3rem; margin-bottom: 1rem; }

.empty-state-card h3 {
  font-family: var(--font-display);
  font-size: 1.375rem;
  font-weight: 800;
  color: #1d1d1f;
  margin-bottom: 0.5rem;
}

.dark .empty-state-card h3 { color: #f5f5f7; }

.empty-state-card p {
  color: #86868b;
  font-size: 0.9375rem;
  max-width: 400px;
  margin: 0 auto;
}

/* Requests List */
.requests-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.request-card {
  background: white;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.04);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.request-card:hover {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
  border-color: rgba(0, 113, 227, 0.15);
}

.request-card.expanded {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
  border-color: rgba(0, 113, 227, 0.2);
}

.dark .request-card {
  background: #1c1c1e;
  border-color: rgba(255, 255, 255, 0.04);
}

.dark .request-card:hover {
  border-color: rgba(0, 113, 227, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

/* Card Header */
.request-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.125rem 1.5rem;
}

.request-avatar {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: linear-gradient(135deg, #0071e3, #6366f1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  flex-shrink: 0;
}

.request-summary { flex: 1; min-width: 0; }

.request-name {
  font-weight: 700;
  font-size: 0.9375rem;
  color: #1d1d1f;
}

.dark .request-name { color: #f5f5f7; }

.request-preview {
  font-size: 0.8125rem;
  color: #86868b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px;
}

.request-meta {
  text-align: right;
  flex-shrink: 0;
}

.status-pill {
  display: inline-block;
  font-size: 0.6875rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 20px;
}

.status-pill.pending { background: #fef3c7; color: #92400e; }
.status-pill.completed { background: #d1fae5; color: #065f46; }
.status-pill.contacted { background: #dbeafe; color: #1e40af; }

.dark .status-pill.pending { background: rgba(245, 158, 11, 0.15); color: #fbbf24; }
.dark .status-pill.completed { background: rgba(16, 185, 129, 0.15); color: #34d399; }
.dark .status-pill.contacted { background: rgba(59, 130, 246, 0.15); color: #60a5fa; }

.request-date {
  display: block;
  font-size: 0.6875rem;
  color: #aeaeb2;
  margin-top: 4px;
}

.expand-icon {
  color: #aeaeb2;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.expand-icon.rotated { transform: rotate(180deg); }

/* Expanded Details */
.request-details {
  padding: 0 1.5rem 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.04);
  cursor: default;
}

.dark .request-details { border-color: rgba(255, 255, 255, 0.04); }

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.25rem;
  padding-top: 1.25rem;
}

.detail-block {}

.detail-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #86868b;
  margin-bottom: 4px;
}

.detail-value {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #1d1d1f;
}

.dark .detail-value { color: #f5f5f7; }

.message-block {
  margin-top: 1.25rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(0, 0, 0, 0.04);
}

.dark .message-block { border-color: rgba(255, 255, 255, 0.04); }

.message-text {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #6e6e73;
  font-style: italic;
  line-height: 1.6;
  background: #f5f6fa;
  padding: 1rem 1.25rem;
  border-radius: 14px;
}

.dark .message-text {
  background: rgba(255, 255, 255, 0.03);
  color: #98989d;
}

/* Actions */
.actions-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(0, 0, 0, 0.04);
  flex-wrap: wrap;
}

.dark .actions-bar { border-color: rgba(255, 255, 255, 0.04); }

.status-select-wrap {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.action-label {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #86868b;
}

.status-select {
  padding: 0.5rem 1rem;
  border-radius: 12px;
  border: 1.5px solid rgba(0, 0, 0, 0.08);
  background: white;
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  font-weight: 700;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease;
}

.status-select:focus { border-color: #0071e3; box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.1); }

.status-select.status-pending { color: #92400e; border-color: #fde68a; background: #fffbeb; }
.status-select.status-completed { color: #065f46; border-color: #a7f3d0; background: #ecfdf5; }
.status-select.status-contacted { color: #1e40af; border-color: #bfdbfe; background: #eff6ff; }

.dark .status-select {
  background: #2c2c2e;
  border-color: rgba(255, 255, 255, 0.08);
  color: #f5f5f7;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  font-size: 0.8125rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  font-family: var(--font-sans);
}

.email-btn {
  background: linear-gradient(135deg, #0071e3, #2997ff);
  color: white;
}

.email-btn:hover {
  box-shadow: 0 4px 16px rgba(0, 113, 227, 0.3);
  transform: translateY(-1px);
}

.phone-btn {
  background: linear-gradient(135deg, #34c759, #30d158);
  color: white;
}

.phone-btn:hover {
  box-shadow: 0 4px 16px rgba(52, 199, 89, 0.3);
  transform: translateY(-1px);
}

/* Slide Transition */
.slide-enter-active {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  max-height: 600px;
}

.slide-leave-active {
  transition: all 0.2s ease;
  max-height: 600px;
}

.slide-enter-from, .slide-leave-to {
  opacity: 0;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
}
</style>
