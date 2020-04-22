const state = {
  // 用户token
  userToken: localStorage.getItem('userToken') || '',
  // 大分类信息
  categoryInfo: localStorage.getItem('categoryInfo') || '',
  // 支付订单信息
  confirmOrderInfo: [],
  // 地址信息
  addressInfo: {},
  // 浏览历史
  browseHistory: JSON.parse(localStorage.getItem('browseHistory')) || []
}
export default state
