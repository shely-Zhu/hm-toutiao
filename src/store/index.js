// 封装操作 sessionStorage 的存取 提供个其他模块使用
// 1， 约定好 key 的名字
// 2， 约定好 value 的格式 ，字符串格式 Json数据

// 本地存储的三种方法
// cookie  当你的用户信息想有有效期时用cookie
// localStorage 用户信息会永远存在
// sessionStorage 用户关闭浏览器后失效，需重新登录
// ！！！！！！！！
// 当前使用sessionStorage
const KEY = 'hm-toutiao'
export default {
  // 设置用户信息
  setUser (user) {
    // 存储user 对象数据
    // json.stringify 将javascript 的值转换为json字符串
    // sessionStorage 在 inspect检查-- applicattion中--storage--sessionStorage中查看 key，value值
    window.sessionStorage.setItem(KEY, JSON.stringify(user))
  },
  // 获取用户信息
  // json.parse 将jason 字符串转换为 JavaScript 对象
  getUser () {
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  }
}
