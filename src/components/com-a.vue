<template>
  <div class="container">
    com-a {{msg}}
  </div>
</template>

<script>
import eventBus from '@/components/eventBus.js'
export default {
  name: 'com-a',
  data () {
    return {
      msg: ''
    }
  },
  created () {
    eventBus.$on('abc', (data) => {
      this.msg = data
    })
  }
}

</script>

<style lang="less" scoped>
</style>
