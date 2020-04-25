<template>

  <div class="my-image">
    <!-- 图片按钮 -->
    <div class="img-btn">
      <img :src="value||defaultImg"
           alt=""
           @click="openDialog()">
      <!-- src 动态绑定后，本地图片加载失败 -->
      <!-- 如果是网络路径是可以加载成功的 -->
      <!-- 项目是基于vue-cli === vue-cli基与webpack  webpack 是打包所有资源 -->
      <!-- webpack打包有一个规则
      打包 src  url  href  指定资料打包  import导入去打包
      解决办法： 主动导入默认图片数据 在：src上绑定即可 -->
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible"
               width="750px">
      <!-- TAB组件 -->
      <el-tabs v-model="activeName"
               type="card">
        <el-tab-pane label="素材库"
                     name="first">
          <!-- 单选框结构  -->
          <el-radio-group v-model="reqParams.collect"
                          size="mini"
                          @change="changeCollect">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <!-- 列表结构 -->
          <div class="item-list">
            <div class="item-img"
                 @click="selectedImgUrl=item.url"
                 :class="{selected: selectedImgUrl===item.url}"
                 v-for="item in result"
                 :key="item.id">
              <img :src="item.url"
                   alt="">
            </div>
          </div>
          <el-pagination background
                         layout="prev, pager, next"
                         :total="total"
                         :current-page="reqParams.page"
                         :page-size="reqParams.per_page"
                         v-if="total > reqParams.per_page"
                         @current-change="changePage">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片"
                     name="second">
          <el-upload class="avatar-uploader"
                     action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
                     :show-file-list="false"
                     :on-success="handleAvatarSuccess"
                     name="image"
                     :headers="headers">
            <img v-if="imageUrl"
                 :src="imageUrl"
                 class="avatar">
            <i v-else
               class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="confirmImg()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// 当点击图片的时候
// 给当前点击的图片加上选中的效果，其他图片不能有此效果
// vue的方式
//  - 选中效果，加个类来实现 selected
//  - 记录当前的点击的是那张图片， 图片的唯一表示 url 往后台传参的时候用的是url地址
//  - 遍历图片的时候，和当前记录的图片地址比对 一致的话加上selecte
// selected实现 ---> 伪元素
</script>
<script>
import defaultImg from '../assets/images/default.png'
import store from '@/store'
export default {
  name: 'my-image',
  props: ['value'],
  data () {
    return {
      // 指定默认图
      defaultImg,
      // 封面地址（确认图片的地址）
      //value: defaultImg,
      selectedImgUrl: null,
      // 请求头携带token
      headers: {
        Authorization: `Bearer ${store.getUser().token}`
      },
      // 控制对话框现实与隐藏
      dialogVisible: false,
      // 控制tab选项卡到底激活谁
      activeName: 'first',
      imageUrl: null,
      // 获取素材列表请求参数
      reqParams: {
        collect: false,
        page: 1,
        per_page: 3
      },
      result: [],
      total: 0
    }
  },
  methods: {
    // 确认图片
    confirmImg () {
      if (this.activeName === "first") {
        this.$emit('input', this.selectedImgUrl)
      } else {
        this.$emit('input', this.imageUrl)
      }
      this.dialogVisible = false
    },
    // 上传图片成功后的事情
    handleAvatarSuccess (res) {
      this.imageUrl = res.data.url
      console.log(res)
    },
    // 改变分页组件页码
    changePage (currenPage) {
      this.reqParams.page = currenPage
      this.getUserImg()
    },
    openDialog () {
      this.dialogVisible = true
      // 清空选中的或上次上传的图片
      this.selectedImgUrl = null
      this.imageUrl = null
      // 获取素材列表数据
      this.getUserImg()
    },
    async getUserImg () {
      const { data: { data } } = await this.$http.get('user/images', { pramas: this.reqParams })
      console.log(data)
      this.result = data.results
      this.total = data.total_count
    },
    // 切换全部与收藏
    changeCollect () {
      this.reqParams.page = 1
      this.getUserImg()
    }
  }
}
</script>

<style lang="less" scoped>
.el-pagination {
  text-align: center;
}
.img-btn {
  width: 160px;
  height: 160px;
  border: 1px dashed #ccc;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.avatar-uploader {
  text-align: center;
}
.item-list {
  margin-top: 10px;
}
.item-img {
  width: 160px;
  height: 120px;
  border: 1px dashed #ccc;
  display: inline-block;
  margin-right: 15px;
  position: relative;
  margin-bottom: 10px;
  &.selected {
    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3) url(../assets/images/selected.png)
        no-repeat center / 50px 50px;
    }
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
  }
}
</style>
