import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../pages/index.vue'
import Category from '../pages/category.vue'
import Cart from '../pages/cart.vue'
import User from '../pages/user.vue'
import Login from '../pages/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/category',
    name: 'Category',
    component: Category
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
