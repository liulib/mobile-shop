import Vue from 'vue'
import VueRouter from 'vue-router'

const Index = () => import(/* webpackChunkName: "Index" */ '../pages/index.vue')
const Category = () =>
  import(/* webpackChunkName: "Category" */ '../pages/category.vue')
const Cart = () => import(/* webpackChunkName: "Cart" */ '../pages/cart.vue')
const User = () => import(/* webpackChunkName: "User" */ '../pages/user.vue')
const Login = () => import(/* webpackChunkName: "Login" */ '../pages/login.vue')
const goodsDetail = () =>
  import(/* webpackChunkName: "goodsDetail" */ '../pages/goodsDetail.vue')
const confirmOrder = () =>
  import(/* webpackChunkName: "confirmOrder" */ '../pages/confirmOrder.vue')
const AddressManage = () =>
  import(
    /* webpackChunkName: "AddressManage-AddressEdit" */ '../pages/addressManage.vue'
  )
const AddressEdit = () =>
  import(
    /* webpackChunkName: "AddressManage-AddressEdit" */ '../pages/addressEdit.vue'
  )
const OrderManage = () =>
  import(
    /* webpackChunkName: "OrderManage-Collection-BrowseHistory" */ '../pages/orderManage.vue'
  )
const Collection = () =>
  import(
    /* webpackChunkName: "OrderManage-Collection-BrowseHistory" */ '../pages/collection.vue'
  )
const BrowseHistory = () =>
  import(
    /* webpackChunkName: "OrderManage-Collection-BrowseHistory" */ '../pages/browseHistory.vue'
  )

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
