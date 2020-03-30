/**
 * 基本操作模块接口列表
 */

import base from './base' // 导入接口域名列表
import axios from '@/utils/http' // 导入http中创建的axios实例

const operations = {
  // 搜索商品 POST
  search(keyword, page = 1) {
    return axios.post(`${base.shop}/search`, { keyword, page })
  }
}

export default operations
