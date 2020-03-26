import * as types from './mutation-types'

const mutations = {
  // 设置 state 中 token
  [types.SET_USER_TOKEN](state, payload) {
    state.userToken = payload
    // 将token写入到localStorage
    localStorage.setItem('userToken', payload)
  },
  // 退出登录时清除token的方法
  [types.DEL_USER_TOKEN](state) {
    localStorage.userToken = ''
    state.userToken = ''
  }
}

export default mutations
