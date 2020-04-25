<template>
  <div id="container">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div class="btn-box">
        <el-radio-group v-model="reqParams.collect"
                        size="small"
                        @change="changeType">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button size="small"
                   style="float:right"
                   type="success"
                   @click="openDialog()">添加素材</el-button>
      </div>
      <div class="img-list">
        <div class="img-item"
             v-for="item in images"
             :key="item.id">
          <img :src="item.url"
               alt="">
          <div class="footer"
               v-if="!reqParams.collect">
            <span class="el-icon-star-off"
                  :class="{ selected: item.is_collected}"
                  @click="toggleCollect(item)"></span>
            <span class="el-icon-delete"
                  @click="delImg(item.id)"></span>
          </div>
        </div>
      </div>
      <!-- 分页组件 -->
      <el-pagination background
                     layout="prev, pager, next"
                     :total="total"
                     :page-size="reqParams.per_page"
                     @current-change="change"
                     v-if="total > reqParams.per_page"
                     :current-page="reqParams.page">
      </el-pagination>
    </el-card>
    <el-dialog title="添加素材"
               :visible.sync="dialogVisible"
               width="300px">
      <el-upload class="avatar-uploader"
                 action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
                 :show-file-list="false"
                 :headers="headers"
                 :on-success="handleAvatarSuccess"
                 name="image">
        <img v-if="imageUrl"
             :src="imageUrl"
             class="avatar">
        <i v-else
           class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 5
      },
      // 素材列条
      images: [],
      total: null,
      dialogVisible: false,
      imageUrl: null,
      headers: {
        Authorization: `Bearer ${store.getUser().token}`
      }
    }
  },
  created () {
    this.getUserImg()
  },
  methods: {
    // 切换收藏
    async toggleCollect (item) {
      const { data: { data } } = await this.$http.put(`user/images/${item.id}`, { collect: !item.is_collected })
      data.collect && this.$message.success('添加收藏成功')
      !data.collect && this.$message.success('取消收藏成功')
      // 更新当前图片的状态（这样只会更新当前图片的状态，不改变整个布局）
      item.is_collected = data.collect
      // this.getUserImg()  (这样会更新整个列表，图片的位置会有变动)
    },
    // 删除图片的方法
    async delImg (target) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`user/images/${target}`)
        this.$message.success('删除成功')
        this.getUserImg()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 上传成功的方法
    handleAvatarSuccess (data) {
      console.log(data)
      this.imageUrl = data.data.url
      this.$message.success('恭喜你，上传成功')
      setTimeout(() => {
        this.dialogVisible = false
        this.imageUrl = ''
        this.getUserImg()
      }, 1000)
    },
    async getUserImg () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      console.log(data)
      this.images = data.results
      this.total = data.total_count
    },
    change (currentPage) {
      this.reqParams.page = currentPage
      this.getUserImg()
    },
    changeType (label) {
      // 改变全部与收藏
      // 因为
      this.reqParams.page = 1
      this.getUserImg()
    },
    openDialog () {
      this.dialogVisible = true
    }
  }
}
</script>
<style lang="less" scoped>
.avatar-uploader {
  text-align: center;
}
.img-list {
  margin-top: 30px;
}
.img-item {
  width: 160px;
  height: 160px;
  position: relative;
  display: inline-block;
  margin-left: 50px;
  margin-bottom: 20px;
  img {
    width: 100%;
    height: 100%;
    border: 1px dashed #ccc;
    display: block;
  }
  .footer {
    width: 100%;
    line-height: 30px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    text-align: center;
    span {
      margin: 0 20px;
      cursor: pointer;
      &.selected {
        color: red;
      }
    }
  }
}
.el-pagination {
  text-align: center;
}
</style>
