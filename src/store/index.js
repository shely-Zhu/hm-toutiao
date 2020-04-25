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
    // 现在：给什么存什么  完整替换之前的信息
    // 需求： 给一个字段，就就不更改这个字段即可「{name:''}
    // 做法： 获取本地存储中的对象，把传入的对象，合并覆盖到当前存储的对象中
    const userName = this.getUser()
    const NewUser = { ...userName, ...user }
    window.sessionStorage.setItem(KEY, JSON.stringify(NewUser))
  },
  // 获取用户信息
  // json.parse 将jason 字符串转换为 JavaScript 对象
  getUser () {
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  clearUser () {
    // sessionStorage.clear() 清除所有sessionStorage本地存储
    window.sessionStorage.removeItem(KEY)
  }
}
