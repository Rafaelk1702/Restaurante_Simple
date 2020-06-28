import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Inventario from '../views/Inventario.vue'

Vue.use(VueRouter)

  const routes = [
  {path: '/',name: 'Home',component: Home},
  {path: '/about',name: 'About',component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')},
  {path:'/inventario', name:'Inventario',component: Inventario}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
