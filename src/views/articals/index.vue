<template>
  <div id="container">
    artical
  </div>
</template>

<script>
export default {
  created () {
    // 测试请求
    this.$http.get('articles').then(({ data }) => {
      console.log(data)
    })
  }
}
</script>

<style lang="less" scoped>
</style>
