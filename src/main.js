
//alert('Vue funcionando en main.js prueba')
import Vue from 'vue'
import App from './App.vue'
//import router from './router'
//import store from './store'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import axios from 'axios'
import VueAxios from 'vue-axios'
import Home from './views/Home.vue'
import Inventario from './views/Inventario.vue'
import About from './views/About.vue'
import Articulo from './views/Articulos.vue'
 
Vue.use(VueAxios, axios)
//import png from './assets/logo.png'
// Agregamos la URL base de nuestra API
axios.defaults.baseURL = 'http://localhost:3000/api';
axios.defaults.validateStatus = () => {

  return true;
  };
//Vue.config.productionTip = false
const routes=[  
{path: '/',name: 'Home',component: Home},
//{path: '/',png: 'Home'},
{path:'/inventario', name:'Inventario',component: Inventario},
{path: '/about',name: 'About',component: About},// () => import(/* webpackChunkName: "about" */ './views/About.vue')},
{path: '/articulo', name: 'Articulo', component: Articulo}
];
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes : routes
})
/*new Vue({
  //el:'#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app');*/
//const router= new VueRouter({mode:'history', routes: routes});
new Vue(Vue.util.extend({router}, App)).$mount('#app');