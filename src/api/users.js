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
  //  登录 POST
  login(mobilePhone = '', password = '') {
    return axios.post(`${base.shop}/user/login`, {
      mobilePhone,
      password
    })
  },
  //   短信验证码 POST
  sendSMSCode(mobilePhone) {
    return axios.post(`${base.shop}/user/sendSMSCode`, { mobilePhone })
  },
  //   图片验证码  直接返回url
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
  }
}

export default users
