// 判断是否是手机号
function isPhoneNumber(tel) {
  var reg = /^0?1[3|4|5|6|7|8][0-9]\d{8}$/
  return reg.test(tel)
}

/**
 * 函数节流方法
 * @param {Function} fn 延时调用函数
 * @param {Number} delay 延迟多长时间
 * @return {Function} 延迟执行的方法
 */
function throttle(fn, delay) {
  let lastTime = Date.now()
  let timer
  return function() {
    const context = this
    const args = arguments
    const nowTime = Date.now()
    clearTimeout(timer)
    console.log(nowTime - lastTime)
    if (nowTime - lastTime > delay) {
      fn.apply(context, args)
      lastTime = nowTime
    } else {
      // 如果操作的时间很短，以至于不能节流
      // 保证至少执行一次
      timer = setTimeout(function() {
        fn.apply(context, args)
      }, delay)
    }
  }
}

export { isPhoneNumber, throttle }
