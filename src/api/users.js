/**
 * users模块接口列表
 */

import base from './base' // 导入接口域名列表
import axios from '@/utils/http' // 导入http中创建的axios实例

const users = {
  // 注册 POST
  register(userName = '', password = '', mobilePhone = '', smsCode = '') {
    return axios.post(`${base.shop}/user/register`, {
      userName,
      password,
      mobilePhone,
      smsCode
    })
  },
  // 登录 POST
  login(mobilePhone = '', password = '') {
    return axios.post(`${base.shop}/user/login`, {
      mobilePhone,
      password
    })
  },
  // 短信验证码 POST
  sendSMSCode(mobilePhone) {
    return axios.post(`${base.shop}/user/sendSMSCode`, { mobilePhone })
  },
  // 图片验证码  直接返回url
  sendPicCode() {
    return `${base.shop}/user/sendPicCode?mt=${Math.random()}`
  },
  // 获取用户信息  GET
  getUserInfo() {
    return axios.get(`${base.shop}/user/userInfo`)
  },
  // 获取用户订单数量信息  GET
  getUserOrderNum() {
    return axios.get(`${base.shop}/user/orderNum`)
  },
  // 获取用户购物车信息
  getCartInfo() {
    return axios.get(`${base.shop}/user/checkShopCart`)
  },
  // 添加到用户购物车
  addToCart(goodsId) {
    return axios.post(`${base.shop}/u-action/addToShopCart`, { goodsId })
  },
  // 删除购物车商品
  delCartGoods(delGoodsIds) {
    return axios.post(`${base.shop}/u-action/delCartGoods`, { delGoodsIds })
  },
  // 获取默认收货地址
  getDefAddress() {
    return axios.get(`${base.shop}/user/defAddress`)
  },
  // 获取收货地址列表
  getAddressList() {
    return axios.get(`${base.shop}/user/addressList`)
  },
  // 编辑收货地址
  editAddress(addressInfo) {
    return axios.post(`${base.shop}/u-action/editAddress`, { addressInfo })
  },
  // 删除收货地址
  delAddress(addressId) {
    return axios.post(`${base.shop}/u-action/delAddress`, { addressId })
  },
  // 设置默认收货地址
  setDefAddress(addressId) {
    return axios.post(`${base.shop}/u-action/setDefAddress`, { addressId })
  },
  // 提交订单
  submitOrder(orderInfo) {
    return axios.post(`${base.shop}/u-action/submitOrder`, { orderInfo })
  },
  // 获取订单列表
  getOrdersList(categorySubId) {
    return axios.get(`${base.shop}/user/orderList`)
  },
  // 获取用户收藏列表
  getCollectionList() {
    return axios.get(`${base.shop}/user/collectionList`)
  },
  // 商品收藏、取消
  collectionHandle(goodsId, collectionFlag) {
    return axios.post(`${base.shop}/u-action/collection`, {
      goodsId,
      collectionFlag
    })
  },
  // 查询是否收藏
  queryCollection(goodsId) {
    return axios.post(`${base.shop}/user/queryCollection`, { goodsId })
  }
}

export default users
