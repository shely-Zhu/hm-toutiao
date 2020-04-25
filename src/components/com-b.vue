<template>
<div class="container">
  com-b
  <button>给A组件传值</button>
</div>
</template>

<script>
import eventBus from '@/components/eventBus'
export default {
  name: 'com-b',
  data () {
    return {
      msg: 'hello world'
    }
  },
  created () {
    eventBus.$emit('abc', this.msg)
  }
}
</script>

<style lang="less" scoped>
</style>
