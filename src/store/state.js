const state = {
  // 用户token
  userToken: localStorage.getItem('userToken') || '',
  // 大分类信息
  categoryInfo: JSON.parse(localStorage.getItem('categoryInfo')) || [],
  // 支付订单信息
  confirmOrderInfo: [],
  // 地址信息
  addressInfo: {},
  // 浏览历史
  browseHistory: JSON.parse(localStorage.getItem('browseHistory')) || [],
  // 搜索历史
  searchHistory: JSON.parse(localStorage.getItem('searchHistory')) || []
}
export default state
