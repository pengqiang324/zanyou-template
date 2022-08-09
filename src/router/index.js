import { createRouter, createWebHashHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue'


const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: defineAsyncComponent(() => import(/* webpackChunkName: "Home" */ '../views/Home.vue')),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/about',
    name: 'AboutView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: defineAsyncComponent(() => import(/* webpackChunkName: "about" */ '../views/About.vue')),
    meta: {
      keepAlive: true
    }
  },{
    path: '/:pathMatch(.*)',
    name: '404',
    component: defineAsyncComponent(() => import(/* webpackChunkName: "404" */ '../views/error-page/404.vue'))
  }
]


const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default router
