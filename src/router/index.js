import { createRouter, createWebHashHistory } from 'vue-router'
import config, { SINGLE } from "@/config/defaultSettings";

// 解决点击重复路由报错问题
// const originalReplace = Router.prototype.replace;
// Router.prototype.replace = function replace(location) {
//   return originalReplace.call(this, location).catch(err => err);
// };

// import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue'),
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
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      keepAlive: true
    }
  },{
    path: '/:pathMatch(.*)',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '../views/error-page/404')
  }
]

// 生产环境单例模式路由
const productioinSingleRouter = [
  {
    path: "/",
    name: "404",
    redirect: "/404"
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404"),
    hidden: true
  },
  {
    path: "/:pathMatch(.*)",
    redirect: "/404",
    hidden: true
  }
];

// 根据访问模型与环境过滤路由
const filterRouter = () => {
  if (config.developerModel === SINGLE) {
    if (process.env.NODE_ENV === "development") {
      return routes;
    } else {
      return productioinSingleRouter;
    }
  } else {
    return routes;
  }
};
const router = createRouter({
  history: createWebHashHistory(),
  routes: filterRouter()
})

export default router
