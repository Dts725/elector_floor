import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [

    {
      path: '/',

      component: () => import("./App.vue"),
      children: [{
          path: '/',
          name: 'map',
      
          component: () => import('./views/map.vue')
        },

      ]

    },

    {
      path: '/login',
      name: 'login',
      component: () => import('./login.vue')
    }
  ]
})