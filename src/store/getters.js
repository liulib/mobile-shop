// 用户 token
const userToken = state => state.userToken
// 大分类信息
const categoryInfo = state => state.categoryInfo
// 支付订单信息
const confirmOrderInfo = state => state.confirmOrderInfo
// 地址信息
const addressInfo = state => state.addressInfo
// 浏览历史
const browseHistory = state => state.browseHistory

export default {
  // 用户 token
  userToken,
  // 大分类信息
  categoryInfo,
  // 支付订单信息
  confirmOrderInfo,
  // 地址信息
  addressInfo,
  // 浏览历史
  browseHistory
}
