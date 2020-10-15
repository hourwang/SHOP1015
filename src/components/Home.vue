<template>
  <div>
    <!-- 退出功能 -->
    <el-button type="info" @click="logout">退出</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>
<style scoped>

</style>
