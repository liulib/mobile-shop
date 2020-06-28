import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api/index' // 导入api接口
import {
  Col,
  Row,
  Lazyload,
  Button,
  Swipe,
  SwipeItem,
  Search,
  Grid,
  GridItem,
  NoticeBar,
  Tabbar,
  TabbarItem,
  Panel,
  NavBar,
  Sidebar,
  SidebarItem,
  Tab,
  Tabs,
  SubmitBar,
  SwipeCell,
  Card,
  Checkbox,
  CheckboxGroup,
  Icon,
  Cell,
  CellGroup,
  Toast,
  Form,
  Field,
  Dialog,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  List,
  Stepper,
  Loading,
  AddressList,
  AddressEdit
} from 'vant'

Vue.use(Col)
  .use(Row)
  .use(Button)
  .use(Swipe)
  .use(SwipeItem)
  .use(Search)
  .use(Lazyload)
  .use(Grid)
  .use(GridItem)
  .use(NoticeBar)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Panel)
  .use(NavBar)
  .use(Sidebar)
  .use(SidebarItem)
  .use(Tab)
  .use(Tabs)
  .use(SubmitBar)
  .use(SwipeCell)
  .use(Card)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Icon)
  .use(Cell)
  .use(CellGroup)
  .use(Toast)
  .use(Form)
  .use(Field)
  .use(Dialog)
  .use(GoodsAction)
  .use(GoodsActionButton)
  .use(GoodsActionIcon)
  .use(List)
  .use(Stepper)
  .use(Loading)
  .use(AddressList)
  .use(AddressEdit)

Vue.config.productionTip = false
// 将api挂载到vue的原型上
Vue.prototype.$api = api

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
