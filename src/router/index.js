import Vue from 'vue'
import Router from 'vue-router'

import Login from "../components/Login.vue";
import Home from "../components/Home.vue";
import Root from "../components/Root.vue";

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Root',
      component: Root
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    }
  ]
})
