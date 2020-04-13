<template>
    <div class="container">
       <el-card class="my-card">
           <img src="../../assets/images/logo_index.png">
           <el-form ref="loginForm" :model="form" :rules="loginRules" status-icon >
               <el-form-item prop="mobile">
                   <el-input v-model="form.mobile" placeholder="please enter your moblie"></el-input>
               </el-form-item>
               <el-form-item prop="code">
                   <el-input v-model="form.code" placeholder="please enter your pwd" style="width:238px;margin-right:10px"></el-input>
                   <el-button>send code</el-button>
               </el-form-item>
               <el-form-item>
                   <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
               </el-form-item>
               <el-form-item>
                   <el-button type="primary" @click="login" style="width:100%">login</el-button>
               </el-form-item>
           </el-form>
       </el-card>
    </div>
</template>
<script>
export default {
  data () {
    // 自定义校验的函数
    // 固定的三个参数 rule,value,callback
    const checkMob = (rule, value, callback) => {
      // 按照自己的校验逻辑校验值即可
      // 手机号格式开头 1开头 第二位3-9之间 最后9位数字即可
      if (!/^1[3-9]\d{9}/.test(value)) return callback(new Error('Mobile format is wrong'))
      callback()
    }
    return {
      // 表单的数据对象
      form: {
        //   字段参考接口文档
        mobile: '',
        code: ''
      },
      // 校验规则对象
      loginRules: {
        mobile: [
          { required: true, message: 'please enter your mob', trigger: 'blur' },
          { validator: checkMob, trigger: 'blur' }
        ],
        code: [
          { required: true, message: 'please enter your pwd', trigger: 'blur' },
          { len: 6, message: 'Please enter 6-digit verification code', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      //    测试账号  手机号  13911111111  code：246810
      //    不建议使用
      //    注册账号  黑马头条 app 使用app登录，此时的登录就是注册
      //   对整个表单进行验证
      this.$refs.loginForm.validate(valid => {
        valid &&
        this.$http.post(
          'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
          this.form
        )
          .then(res => {
          // res 响应报文（对象） 数据数据响应主体
            this.$router.push('/')
          })
          .catch(() => {
          // 请求失败提示
            this.$message.error('Mob or Pwd wrong')
          })
        // 验证成功发起登录请求
      })
    }
  }
}
</script>
<style lang="less" scoped>
// style 里的scoped属性
// .vue文件里才有的 style标签属性 scoped
//  - 作用：在style标签下书写的样式，仅仅在当前组件下生效
//          如果样式想在全局下生效  在styles文件夹下index.less文件下书写
//  - 原理：在当前组件暴露的标签 都会加上一个属性， data-v-37dfd6fc 唯一的标识，只属于当前组件
//         .container====>.container[data-v-37dfd6fc]默认加上属性选择器
//          如果使用其他组件的内容选择器，也会加上[data-v-37dfd6fc]，会导致无效
.container{
    width: 100%;
    height: 100%;
    position: absolute;
    // center / cover 背景图定位 / 背景图尺寸（backgroundsize省略)
    // cover 等比缩放 铺满容器 多余裁剪
    // contain 等比缩放 完全显示在当前容器，可能会存在留白
    background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
.my-card{
    width: 400px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-60%);
    img{
        width: 200px;
        display: block;
        margin: 0 auto 30px;
    }
}
}

</style>
