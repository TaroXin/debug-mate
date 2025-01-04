// @unocss-include

import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../pages/index.vue'),
    meta: {
      title: '首页',
      icon: 'i-icon-park-outline-home-two',
    },
  },
  {
    path: '/settings',
    component: () => import('../pages/settings.vue'),
    meta: {
      title: '设置页面',
      icon: 'i-icon-park-outline-setting-two',
    },
  },
]

export default routes
