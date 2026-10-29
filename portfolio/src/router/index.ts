import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// Every src/projects/<Name>/<Name>Page.vue automatically gets the route /projects/<name>
const projectPages = import.meta.glob('/src/projects/*/*Page.vue')

const projectRoutes = Object.entries(projectPages).map(([path, component]) => {
  const folder = path.split('/')[3] ?? ''
  return {
    path: `/projects/${folder.toLowerCase()}`,
    name: `project-${folder.toLowerCase()}`,
    component,
  }
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    ...projectRoutes,
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

export default router
