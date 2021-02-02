<template>
  <div class="home">
      <el-button type="primary" @click = "_logout">退出登录</el-button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {}
  },
  methods: {
    _logout() {
      window.sessionStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>

<style>

</style>