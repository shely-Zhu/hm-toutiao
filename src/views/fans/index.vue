<template>
  <div id="app">
    <el-card>
      <div slot="header">
        <my-bread>粉丝管理</my-bread>
      </div>
      <el-tabs v-model="activeName"
               type="card">
        <el-tab-pane label="粉丝画像"
                     name="first">
          <div class="item-list">
            <div class="item-img"
                 v-for="item in results"
                 :key="item.id.toString()">
              <el-avatar :src="item.photo"></el-avatar>
              <p>{{item.name}}</p>
              <el-button size="mini"
                         type="primary"
                         plain>+关注</el-button>
            </div>
          </div>
          <el-pagination background
                         style="margin-top:20px"
                         layout="prev, pager, next"
                         v-if="total > reqParams.per_page"
                         :total="total"
                         :current-page="reqParams.page"
                         :page-size="reqParams.per_page"
                         @current-change="changePage">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="配置管理"
                     name="second">
          <div class="echarts"
               ref="dom"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import echart from 'echarts'
export default {
  name: 'App',
  created () {
    this.getFans()
    console.log(this.results)
  },
  mounted () {
    const mychart = echart.init(this.$refs.dom)
    // 使用刚指定的配置项和数据显示图表。
    mychart.setOption(this.option)
  },
  methods: {
    async getFans () {
      const { data: { data } } = await this.$http.get('followers', { params: this.reqParams })
      this.results = data.results
      this.total = data.total_count
      console.log(data)
    },
    changePage (currentPage) {
      console.log(currentPage)
      this.reqParams.page = currentPage
      this.getFans()
    }
  },
  data () {
    return {
      activeName: 'second',
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      results: [],
      reqParams: {
        page: 1,
        per_page: 25
      },
      total: 0,
      // 指定图表的配置项和数据
      option: {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'// 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      }
    }
  }
}
</script>
<style lang="less" scoped>
.item-img {
  width: 120px;
  height: 170px;
  border: 1px dashed #ddd;
  text-align: center;
  padding-top: 10px;
  display: inline-block;
  margin-right: 50px;
  margin-bottom: 20px;
  .el-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
}
.el-pagination {
  text-align: center;
}
.echarts {
  width: 600px;
  height: 400px;
}
</style>
