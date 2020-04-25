<template>
  <div class="article-container">
    <el-card>
      <div slot="header">
        <my-bread>{{articleId?'编辑文章':'发表文章'}}</my-bread>
      </div>
      <el-form label-width="100px">
        <el-form-item label="标题 :">
          <el-input v-model="articleForm.title"
                    style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容 :">
          <quill-editor v-model="articleForm.content"
                        :options="editorOption"></quill-editor>
          <!-- :options="editorOption 控制工具栏的精简/占位符的内容" -->
          <!-- 工具栏的高度： style样式控制 -->
          <!-- 内容默认高度： style样式控制 -->
        </el-form-item>
        <el-form-item label="封面 :">
          <el-radio-group v-model="articleForm.cover.type"
                          style="display:block;line-height:50px"
                          @change="articleForm.cover.images = []">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="2">三图</el-radio>
            <el-radio :label="3">无图</el-radio>
            <el-radio :label="4">自动</el-radio>
          </el-radio-group>
          <div v-if="articleForm.cover.type===1">
            <!-- 自定义上传组件 -->
            <my-image v-model="articleForm.cover.images[0]"></my-image>
          </div>
          <div v-if="articleForm.cover.type===2">
            <!-- 自定义上传组件 -->
            <my-image v-model="articleForm.cover.images[0]"></my-image>
            <my-image v-model="articleForm.cover.images[1]"></my-image>
            <my-image v-model="articleForm.cover.images[2]"></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道 :">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     v-if="!articleId"
                     @click="publish(false)">发表</el-button>
          <!-- <el-button @click="publish(true)">存入草稿</el-button> -->
          <el-button type="success"
                     v-if="articleId"
                     @click="edit(false)">编辑</el-button>
          <el-button @click="edit(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
// quill是一个js插件 vue-quill-editor 是基于vue的插件
// 所以可以查看quill文档，配置项是一样的
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      // 文章数据
      articleForm: {
        channel_id: null,
        title: null,
        cover: {
          type: 1,
          images: []
        },
        content: ''
      },
      articleId: null,
      upload: false,
      imageUrl: null,
      dialogVisible: false,
      // 富文本配置
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      }
    }
  },
  watch: {
    // 注意。除了能够监听data中数据的变化，还可以监听地址栏的变化 this.$route
    $route () {
      if (!this.$route.query.id) {
        this.articleId = null
        this.articleForm = {
          channel_id: null,
          title: null,
          cover: {
            type: 1,
            images: []
          },
          content: ''
        }
      }
    }
  },
  created () {
    // console.log(this.$route.query.id)
    // if (this.$route.query.id) {
    //   this.getAticle(this.$route.query.id)
    // }
    this.articleId = this.$route.query.id
    this.$route.query.id && this.getAticle(this.$route.query.id)
  },
  methods: {
    async getAticle (id) {
      const { data: { data } } = await this.$http.get(`articles/${id}`)
      console.log(data)
      // this.articleForm.title = data.title
      // this.articleForm.content = data.content
      // this.articleForm.cover.type = data.cover.type
      // this.articleForm.cover.images[0] = data.cover.images[0]
      // this.articleForm.channel_id = data.channel_id
      // console.log(data)
      this.articleForm = data
    },
    async edit (draft) {
      await this.$http.put(`articles/${this.articleId}?draft=${draft}`, this.articleForm)
      this.$message.success(draft ? '存入草稿' : '修改成功')
      this.$router.push('/articles')
    },
    async publish (draft) {
      const { data } = await this.$http.post(`articles?draft=${draft}`, this.articleForm)
      console.log(data)
      this.$message.success(draft ? '存入草稿' : '发表成功')
      this.router.push('/articles')
    }
  }
}
</script>

<style lang="less" scoped>
.my-image {
  margin-right: 15px;
  display: inline-block;
}
</style>
