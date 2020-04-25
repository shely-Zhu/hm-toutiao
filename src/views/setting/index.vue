<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form v-model="formLabel"
                   label-width="80px">
            <el-form-item label="编号 :">
              <span>{{formLabel.id}}</span>
            </el-form-item>
            <el-form-item label="手机 :">
              <span>{{formLabel.mobile}}</span>
            </el-form-item>
            <el-form-item label="媒体名称 :">
              <el-input v-model="formLabel.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍 :">
              <el-input type="textarea"
                        :rows="3"
                        v-model="formLabel.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱 :">
              <el-input v-model="formLabel.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                         @click="submit()">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-upload class="avatar-uploader"
                     action=""
                     :show-file-list="false"
                     :headers="headers"
                     :http-request="myupload"
                     name="photo"
                     style="text-align:center">
            <img v-if="formLabel.photo"
                 :src="formLabel.photo"
                 class="avatar">
            <i v-else
               class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center;font-size:14px">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import eventBus from '@/components/eventBus'
import store from '@/store'
export default {
  data () {
    return {
      headers: {
        Authorization: `Bearer ${store.getUser().token}`
      },
      formLabel: {}

    }
  },
  created () {
    this.getUserProfile()
    // console.log(store.getUser())
  },
  methods: {
    // 自定义上传
    async myupload (res) {
      // 选择了图片后执行当前函数
      console.log(res)
      const formData = new FormData()
      // formData.append('photo', '文件数据')
      formData.append('photo', res.file)
      // this.$http.patch('user/photo', formData).then(res => {
      //   // 上传成功
      //   console.log(res)
      // })
      const { data: { data } } = await this.$http.patch('user/photo', formData)
      console.log(data)
      this.formLabel.photo = data.photo
      this.$message.success('更新成功')
      store.setUser({ photo: this.formLabel.photo })
      eventBus.$emit('updatePhoto', this.formLabel.photo)
    },
    async submit () {
      // patch 修改的时候使用的请求方式。 局部修改
      // put 修改的时候使用的请求方式  。 完整修改
      const { data: { data } } = await this.$http.patch('user/profile', {
        // 严格按照后台的要求传参
        name: this.formLabel.name,
        intro: this.formLabel.intro,
        email: this.formLabel.email
      })
      data && this.$message.success('修改成功')
      console.log(data)
      // 更新本地存储中的数据
      store.setUser({ name: this.formLabel.name })
      // home 组件的用户名
      eventBus.$emit('Updatename', this.formLabel.name)
    },
    async getUserProfile () {
      // 此时获取的用户数据，和本地保存的用户数据不一样
      const { data: { data } } = await this.$http.get('user/profile')
      console.log(data)
      this.formLabel = data
    }
  }
}
</script>

<style lang="less" scoped>
</style>
