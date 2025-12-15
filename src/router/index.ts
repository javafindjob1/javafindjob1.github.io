import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/x7'
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/mp',
      name: 'mp',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MpView.vue'),
    },
    {
      path: '/x7',
      name: 'x7',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/X7View.vue'),
    },
    {
      //404
      path: '/404',
      component: () => import('../views/404.vue'),
      name: '404',
      meta: {
        title: '404',
        hidden: true,
        icon: 'DocumentDelete',
      },
    },
    {
      //任意路由
      path: '/:pathMatch(.*)*',
      redirect: '/404',
      name: 'Any',
      meta: {
        title: '任意路由',
        hidden: true,
        icon: 'DataLine',
      },
    }
  ],
})

export default router
