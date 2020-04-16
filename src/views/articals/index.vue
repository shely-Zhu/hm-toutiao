<template>
  <div id="container">
    <!-- 筛选条件 -->
    <el-card>
      <div slot="header"
           class="clearfix">
      <my-bread>内容管理</my-bread>
      </div>
      <el-form label-width="80px"
               size="small">
        <el-form-item label="状态: ">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道: ">
          <el-select v-model="reqParams.channel_id"
                     placeholder="请选择">
            <el-option v-for="item in channelOptions"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期: ">
          <el-date-picker v-model="dateArr"
                          type="daterange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">filter</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 结果区域 -->
    <!-- <my-test> -->
      <!-- slot="content" 指定插槽的名称 -->
      <!-- slot-scope="data" 指定插槽传递过来的所有的自定义属性和值 的集合数据 -->
      <!-- <div slot="content" slot-scope="scope">content 获取组件内部数据 {{scope.a}}</div> -->
      <!-- <div slot='footer'>footer</div>
      <template v-slot:footer1="scope">add {{scope.date}}</template>
      <template v-slot:footer2="scope">add2 {{scope.date}}</template>
    </my-test> -->
  </div>
</template>

<script>
// import myBreadcrumb from '@/components/my-breadcrumb'
// import myTest from '@/components/my-test'
export default {
  // components: { myTest, myBreadcrumb },
  created () {
    // 测试请求
    this.$http.get('articles').then((res) => {
      console.log(res)
    })
  },
  data () {
    return {
      // 收集请求参数（表单数据）
      reqParams: {
        status: null,
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: null
      },
      dateArr: [],
      channelOptions: [{
        value: '选项1',
        label: 'js'
      }, {
        value: '选项2',
        label: '双皮奶'
      }],
      value: ''
    }
  }
}
</script>

<style lang="less" scoped>
</style>
