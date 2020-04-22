import * as types from './mutation-types'

const mutations = {
  // 设置token
  [types.SET_USER_TOKEN](state, payload) {
    state.userToken = payload
    localStorage.setItem('userToken', payload)
  },
  // 清除token
  [types.DEL_USER_TOKEN](state) {
    localStorage.userToken = ''
    state.userToken = ''
  },
  // 设置categoryInfo
  [types.SET_CATEGORY_INFO](state, payload) {
    state.categoryInfo = payload
    localStorage.setItem('categoryInfo', payload)
  },
  // 设置confirmOrderInfo
  [types.SET_CONFIRM_ORDER_INFO](state, payload) {
    state.confirmOrderInfo = payload
  },
  // 设置addressInfo
  [types.SET_ADDRESS_INFO](state, payload) {
    state.addressInfo = payload
  },
  // 清除addressInfo
  [types.DEL_ADDRESS_INFO](state) {
    state.addressInfo = {}
  },
  // 设置browseHistory
  [types.SET_BROWSE_HISTORY](state, payload) {
    state.browseHistory = payload
    localStorage.setItem('browseHistory', JSON.stringify(payload))
  },
  // 设置searchHistory
  [types.SET_SEARCH_HISTORY](state, payload) {
    state.searchHistory = payload
    localStorage.setItem('searchHistory', JSON.stringify(payload))
  },
  // 清除searchHistory
  [types.DEL_SEARCH_HISTORY](state) {
    localStorage.searchHistory = []
    state.searchHistory = []
  }
}

export default mutations
