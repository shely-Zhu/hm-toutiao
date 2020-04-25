<template>
  <div id="container">
    <!-- 筛选条件 -->
    <el-card>
      <div slot="header"
           class="clearfix">
        <my-bread></my-bread>
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
          <!-- 放置自定义下拉框组件 -->
          <!-- :value="reqParams.channel_id" -->
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期: ">
          <el-date-picker v-model="dateArr"
                          type="daterange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          clearable
                          @change="changeDate"
                          value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="filter()">filter</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 结果区域 -->
    <el-card>
      <div slot="header">根据筛选条件共查询到 {{total_count}}条结果：</div>
      <!-- 表格组件 -->
      <el-table :data="articles">
        <el-table-column label="封面">
          <template v-slot="scope">
            <el-image :src="scope.row.cover.images[0]"
                      fit="contain"
                      style="width:120px;height:80px">
              <div slot="error">
                <img src="../../assets/images/error.gif"
                     style="width:120px;height:80px"
                     alt="">
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title"
                         label="标题">
        </el-table-column>
        <el-table-column label="状态">
          <template v-slot="scope">
            <el-tag v-if="scope.row.status===0">草稿</el-tag>
            <el-tag v-if="scope.row.status===2"
                    type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===1"
                    type="info">待审核</el-tag>
            <el-tag v-if="scope.row.status===3"
                    type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4"
                    type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate"
                         label="日期">
        </el-table-column>
        <el-table-column label="操作"
                         style="width:120">
          <template v-slot="scope">
            <el-button type="primary"
                       icon="el-icon-edit"
                       plain
                       circle
                       @click="edit(scope.row.id)"></el-button>
            <el-button type="danger"
                       icon="el-icon-delete"
                       plain
                       circle
                       @click="del(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <div style="text-align:center;margin-top:30px">
        <!-- 分页组件默认每页显示 10条数据 page-size 每页显示几条数据 -->
        <!-- 改变当前码时，拿着新的页码重新请求渲染列条 -->
        <!-- 当你不是点击按钮去触发分页的时候， 不会选中按钮的样式。 需要把当前页码数据与分页组件绑定 -->
        <el-pagination background
                       layout="prev, pager, next, total"
                       :total="total_count"
                       v-model="dateArr"
                       :page-size="reqParams.per_page"
                       @current-change="changePage"
                       :current-page="reqParams.page">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
// import myBreadcrumb from '@/components/my-breadcrumb'
// import myTest from '@/components/my-test'
export default {
  // components: { myTest, myBreadcrumb },
  created () {
    // 测试请求
    // this.getChannelOptions()
    this.getArticles()
  },
  data () {
    return {
      // 收集请求参数（表单数据）
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      dateArr: [],
      // channelOptions: [],
      value: '',
      articles: [],
      total_count: 0
    }
  },
  methods: {
    // async getChannelOptions () {
    //   const { data: { data } } = await this.$http.get('channels')
    //   this.channelOptions = data.channels
    // },
    async getArticles () {
      // 此时是get方式传参，第二个参数是对象 {params: 指定参数对象}
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      this.total_count = data.total_count
      console.log(data)
    },
    // 页码改变事件函数
    async changePage (newPage) {
      // 回调参数 当前页码
      this.reqParams.page = newPage
      this.getArticles()
    },
    filter () {
      this.reqParams.page = 1
      this.getArticles()
      // console.log(this.reqParams.status)
    },
    changeDate (dateArr) {
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    edit (id) {
      console.log(id)
      // 发布文章和编辑文章使用同一个路由规则
      // 如果使用 params 是路径传参 /publish /publish/1000 两个路由规则
      // 使用query传参  /publish /publish?id=10
      this.$router.push(`/publish?id=${id}`)
    },
    del (id) {
      this.$confirm('亲，此操作将永久删除该文件, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        console.log(id)
        await this.$http.delete(`articles/${id}`)
        // 获取到后端的json字符，使用axios默认转换格式，JSON.parse()数字有偏差
        // 原因：后台返回的ID值，超出了JavaScript 的最大安全值
        // --------------
        // 最大安全知识： Muber.MAX_SAFE_INTEGER 获取
        // 超出这个范围的计算和转换都是有误差的
        // --------------
        // 解决方案
        // 前端的数字 不能直接接受后端给的ID数据
        // 插件、第三方插件  json-bigint 转换json的插件
        // 不适用axios转换不适用 。使用自己的转换方式
        // npm i json-big 安装
        // 在axios中配置，就是此文件中api-index.js 引入 import JSONbig from 'json-big'
        // axios.defaults.transformResponse = [(data)=>{return JSONbig.parse(data) }]
        this.$message.success('删除成功!')
        this.articles()
        // 测试账号，后端做了保护，没有办法删除，可以自己的账号登录即可
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
  // watch: {
  //   'reqParams.channel_id': function (newVal, oldVal) {
  //     if (newVal === '') {
  //       this.reqParams.channel_id = null
  //     }
  //   }
  // }
}
</script>

<style lang="less" scoped>
.el-card {
  margin-bottom: 20px;
}
</style>
