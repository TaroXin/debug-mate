import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes.ts'

export default createRouter({
  routes,
  history: createWebHistory('popup.html'),
})
