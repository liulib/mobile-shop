import { mapMutations, mapGetters } from 'vuex'
import Loading from '@/components/Loading'

export const GoodsMixin = {
  components: { Loading },
  data() {
    return {
      loadingStatus: true // 是否显示加载状态
    }
  },
  computed: {
    ...mapGetters([
      'userToken', // 用户token
      'searchHistory', // 搜索历史列表
      'categoryInfo', // 大分类信息
      'addressInfo', // 地址信息
      'confirmOrderInfo', // 确认订单信息
      'browseHistory' // 浏览历史
    ])
  },
  methods: {
    ...mapMutations({
      SET_USER_TOKEN: 'SET_USER_TOKEN', // 设置用户token
      DEL_USER_TOKEN: 'DEL_USER_TOKEN', // 删除用户token
      SET_CATEGORY_INFO: 'SET_CATEGORY_INFO', // 设置大分类信息
      SET_SEARCH_HISTORY: 'SET_SEARCH_HISTORY', // 设置搜索历史
      DEL_SEARCH_HISTORY: 'DEL_SEARCH_HISTORY', // 删除搜索历史
      SET_CONFIRM_ORDER_INFO: 'SET_CONFIRM_ORDER_INFO', // 设置确定订单信息
      SET_ADDRESS_INFO: 'SET_ADDRESS_INFO', // 设置地址信息
      DEL_ADDRESS_INFO: 'DEL_ADDRESS_INFO', // 删除地址信息
      SET_BROWSE_HISTORY: 'SET_BROWSE_HISTORY' // 设置浏览历史
    }),
    // 退回到上一页
    back() {
      this.$router.go(-1)
    }
  }
}
