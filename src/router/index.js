import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Home from '@/pages/home/Home'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      redirect:{
        name:'login'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    }
  ]
})
