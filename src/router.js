import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  // base: 'floor_map',
  routes: [


    {
      path: '/index',

      component: () => import("./App.vue"),
      children: [{
          path: '/index/map',
          name: 'map',
          component: () => import('./views/map.vue')
        },

      ]

    },

    {
      path: '/',
      islogin: true,

      name: 'login',
      component: () => import('./login.vue')
    }
  ]
})