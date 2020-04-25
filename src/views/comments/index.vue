<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <!-- 表格组件 -->
      <el-table :data="tableData"
                style="width: 100%">
        <el-table-column prop="title"
                         label="标题"
                         width="350">
        </el-table-column>
        <el-table-column prop="total_comment_count"
                         label="总评论数">
        </el-table-column>
        <el-table-column prop="fans_comment_count"
                         label="粉丝评论数">
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{scope.row.comment_status?'正常':'关闭'}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-if="!scope.row.comment_status"
                       type="success"
                       size="mini"
                       @click="togglestauts(scope.row)">打开评论</el-button>
            <el-button v-else
                       type="danger"
                       size="mini"
                       @click="togglestauts(scope.row)">关闭评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background
                     layout="prev, pager, next"
                     :total="total"
                     v-if="total > reqParams.per_page"
                     :current-page="reqParams.page"
                     @current-change="change"
                     :page-size="reqParams.per_page"
                     style="text-align:center;margin-top:20px">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        // status: null,
        // channel_id: null,
        // begin_pubdate: null,
        // end_pubdate: null,
        page: 1,
        per_page: 20,
        response_type: 'comment'
      },
      tabParams: {
        status: '',
        source: '',
        offset: 1,
        limit: 30
      },
      total: 0,
      allow_comment: false,
      tableData: []
    }
  },
  created () {
    this.getarticles()
    // this.getComments()
  },
  methods: {
    // 切换评论状态
    async togglestauts (row) {
      const { data: { data } } = await this.$http.put(`comments/status?article_id=${row.id}`, {
        allow_comment: !row.comment_status
      })
      console.log(data)
      this.$message.success(data.allow_comment ? '打开成功' : '关闭成功')
      // this.getarticles()
      // 修改当前行数据的状态即可
      row.comment_status = data.allow_comment
    },
    change (currentPage) {
      this.reqParams.page = currentPage
      this.getarticles()
    },
    // 获取文章列表
    async getarticles () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      console.log(data)
      this.tableData = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style lang="less" scoped>
</style>
