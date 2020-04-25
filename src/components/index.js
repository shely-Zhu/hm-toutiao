// 封装一个vue插件
// 作用： 注册components下的所有组件为全局组件
// vue的插件 定义的规则
// 暴露一个对象 {} 在对象中选项 install 对应一个函数 函数形参是vue对象
import MyBread from '@/components/my-breadcrumb'
import MyTest from '@/components/my-test'
import Mychannel from '@/components/my-channel'
import MyImage from '@/components/my-image'
import comA from '@/components/com-a'
import comb from '@/components/com-b'
export default {
  install (Vue) {
    // vue.use 使用插件
    // Vue就是你use前的Vue
    // 全局注册即可
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyTest.name, MyTest)
    Vue.component(Mychannel.name, Mychannel)
    Vue.component(MyImage.name, MyImage)
    Vue.component(comA.name, comA)
    Vue.component(comb.name, comb)
  }
}
