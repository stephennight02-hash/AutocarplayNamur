<template>
  <div class="admin-layout">
    <AdminSidebar />

    <main class="admin-main">
      <div class="admin-container">
        <header class="page-header">
          <div>
            <h1 class="page-title">Gestion du contenu</h1>
            <p class="page-subtitle">Modifiez les textes, images et paramètres du site.</p>
          </div>
        </header>
        
        <div class="content-grid">
          
          <div class="content-card">
            <div class="card-icon blue">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="17" y1="10" x2="3" y2="10" /><line x1="21" y1="6" x2="3" y2="6" /><line x1="21" y1="14" x2="3" y2="14" /><line x1="17" y1="18" x2="3" y2="18" />
              </svg>
            </div>
            <h3 class="card-title">Textes & Sections</h3>
            <p class="card-desc">Modifiez les titres, descriptions et textes de la page d'accueil.</p>
            <span class="card-badge">Bientôt</span>
          </div>

          <div class="content-card">
            <div class="card-icon green">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <h3 class="card-title">Galerie Avant/Après</h3>
            <p class="card-desc">Ajoutez de nouvelles photos de vos réalisations pour vos clients.</p>
            <span class="card-badge">Bientôt</span>
          </div>

          <div class="content-card">
            <div class="card-icon purple">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <h3 class="card-title">Témoignages</h3>
            <p class="card-desc">Gérez les avis de vos clients et mettez-les en avant.</p>
            <span class="card-badge">Bientôt</span>
          </div>

        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import AdminSidebar from '@/components/admin/AdminSidebar.vue'
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

.page-header { margin-bottom: 2.5rem; }

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

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.25rem;
}

.content-card {
  background: white;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.04);
  padding: 2rem;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
}

.content-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
}

.dark .content-card {
  background: #1c1c1e;
  border-color: rgba(255, 255, 255, 0.04);
}

.dark .content-card:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}

.card-icon {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
}

.card-icon.blue {
  background: linear-gradient(135deg, rgba(0, 113, 227, 0.1), rgba(99, 102, 241, 0.1));
  color: #0071e3;
}

.card-icon.green {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(52, 211, 153, 0.1));
  color: #10b981;
}

.card-icon.purple {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(168, 85, 247, 0.1));
  color: #8b5cf6;
}

.card-title {
  font-family: var(--font-display);
  font-size: 1.125rem;
  font-weight: 800;
  color: #1d1d1f;
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
}

.dark .card-title { color: #f5f5f7; }

.card-desc {
  font-size: 0.875rem;
  color: #86868b;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.card-badge {
  display: inline-block;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 4px 10px;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.04);
  color: #86868b;
}

.dark .card-badge {
  background: rgba(255, 255, 255, 0.06);
  color: #98989d;
}
</style>
