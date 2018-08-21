<template>
  <el-container style="height: 100vh">
    <el-aside width="200px">
      <el-menu
        style="height: 100%; overflow: hidden"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-submenu index="article">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span>文章</span>
          </template>
          <el-menu-item index="/admin/articles/new">新建文章</el-menu-item>
          <el-menu-item index="/admin">文章列表</el-menu-item>
        </el-submenu>
        <el-menu-item index="/admin/links">
          <i class="el-icon-menu"></i>
          <span>链接</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right">
        <el-dropdown @command="handleCommand">
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">Logout</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{ $store.state.authUser && $store.state.authUser.username }}</span>
      </el-header>

      <el-main>
        <nuxt/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['logout']),
    handleCommand (command) {
      switch (command) {
        case 'logout':
          this.logout().then(() => this.$router.push('/'))
          break
        default:
          return
      }
    }
  }
}
</script>

<style scoped>
.el-header {
  line-height: 60px;
}

.el-aside {
  color: rgb(191, 203, 217);
}
</style>
