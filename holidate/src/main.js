import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import VueRouter from 'vue-router'
import {store} from './components/store/store.js'

import UserHandle from './components/UserHandle'
import LoginPage from './components/LoginPage'
import filterPage from './components/filterPage'
import connectionPage from './components/connectionPage'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(VueRouter)

const routes = [
  {
    path : '/', 
    component : UserHandle
  }, 

  {
    path : '/login', 
    component :  LoginPage
  }, 

  {
    path : '/filter', 
    component : filterPage, 
    beforeEnter : (to, from, next) =>{
      if(store.state.authenticated == false){ 
        next("/login");
      }else{
        next();
      }
    }
  }, 

  {
    path : '/connection',
    component : connectionPage, 
    beforeEnter : (to, from, next) =>{
      if(store.state.authenticated == false){ 
        next("/login");
      }else{
        next();
      }
    }
  }
]

const router = new VueRouter({
  routes, 
  mode : 'history'
})

new Vue({
  store : store,
  router : router,
  render: h => h(App),
}).$mount('#app')
