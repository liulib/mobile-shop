// 判断是否是手机号
export function isPhoneNumber(tel) {
  var reg = /^0?1[3|4|5|6|7|8][0-9]\d{8}$/
  return reg.test(tel)
}
