import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  // base: 'floor_map', // 此处该或不该都可以 此处打包路径 继承 vue.config.js    publicPath: '/floor_map/', 
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
      name: 'login',
      component: () => import('./login.vue')
    }
  ]
})