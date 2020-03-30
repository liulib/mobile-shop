/**
 * goods模块接口列表
 */

import base from './base' // 导入接口域名列表
import axios from '@/utils/http' // 导入http中创建的axios实例

const goods = {
  // 首页商品数据 GET
  getHomeData() {
    return axios.get(`${base.shop}/goods/home`)
  },
  // 商品详情 GET
  getGoodsDetail(goodsId) {
    return axios.get(`${base.shop}/goods/goodsDetails`, { params: { goodsId } })
  },
  // 分类商品列表 GET
  getGoodsList(categoryId) {
    return axios.get(`${base.shop}/goods/goodsList`, { params: { categoryId } })
  }
}

export default goods
