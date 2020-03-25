import Vue from 'vue'
import App from './App.vue'
import router from './router'

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
  CellGroup
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

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
