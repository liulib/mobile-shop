import Vue from 'vue'
import VueRouter from 'vue-router'

// const Index = () => import('../pages/index.vue')
// const Category = () => import('../pages/category.vue')
// const Cart = () => import('../pages/cart.vue')
// const User = () => import('../pages/user.vue')
// const Login = () => import('../pages/login.vue')
// const goodsDetail = () => import('../pages/goodsDetail.vue')
// const confirmOrder = () => import('../pages/confirmOrder.vue')
// const AddressManage = () => import('../pages/addressManage.vue')
// const AddressEdit = () => import('../pages/addressEdit.vue')
// const OrderManage = () => import('../pages/orderManage.vue')
// const Collection = () => import('../pages/collection.vue')
// const BrowseHistory = () => import('../pages/browseHistory.vue')
import Index from '../pages/index.vue'
import Category from '../pages/category.vue'
import Cart from '../pages/cart.vue'
import User from '../pages/user.vue'
import Login from '../pages/login.vue'
import goodsDetail from '../pages/goodsDetail.vue'
import confirmOrder from '../pages/confirmOrder.vue'
import AddressManage from '../pages/addressManage.vue'
import AddressEdit from '../pages/addressEdit.vue'
import OrderManage from '../pages/orderManage.vue'
import Collection from '../pages/collection.vue'
import BrowseHistory from '../pages/browseHistory.vue'

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
  },
  {
    path: '/goodsDetail',
    name: 'GoodsDetail',
    component: goodsDetail,
    props: route => ({ goodsId: route.query.goodsId })
  },
  {
    path: '/confirmOrder',
    name: 'ConfirmOrder',
    component: confirmOrder
  },
  {
    path: '/addressManage',
    name: 'AddressManage',
    component: AddressManage
  },
  {
    path: '/addressEdit',
    name: 'AddressEdit',
    component: AddressEdit
  },
  {
    path: '/orderManage',
    name: 'OrderManage',
    component: OrderManage
  },
  {
    path: '/collection',
    name: 'Collection',
    component: Collection
  },
  {
    path: '/browseHistory',
    name: 'BrowseHistory',
    component: BrowseHistory
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
