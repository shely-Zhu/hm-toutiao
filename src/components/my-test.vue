<template>
  <div class="container">
    <div>header</div>
    <div>
      <!-- 插槽 如果不写名字 为默认插槽 -->
      <slot name="content" :msg="msg" a='10'></slot>
    </div>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
    <!-- 补充 -->
    <!-- v-slot:插槽名称  和slot属性一样作用 -->
    <!-- v-slot="数据名称"  和slot-scope 属性一样作用 -->
    <!-- 标签必须是template -->
    <!-- v-slot:content="msg" ====   slot="content" slot-scope="scope"  -->
    <div>
      <slot name="footer1" date="20"></slot>
    </div>
    <div>
      <slot name="footer2" date="50"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-test',
  data () {
    return {
      msg: 'test值'
    }
  }
}
</script>

<style lang="less" scoped>
</style>
