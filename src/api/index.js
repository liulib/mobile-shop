/**
 * api接口的统一出口
 */
// 商品模块接口
import goods from './goods'
import users from './users'
import operations from './operations'
// 其他模块的接口……

// 导出接口
export default {
  goods,
  users,
  operations
  // ……
}
