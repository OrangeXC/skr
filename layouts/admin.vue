<template>
  <el-container style="height: 100vh">
    <el-aside width="200px">
      <el-menu
        style="height: 100%; overflow: hidden"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :default-active="$route.path"
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
        <el-menu-item index="/admin/tags">
          <i class="el-icon-star-off"></i>
          <span>标签</span>
        </el-menu-item>
        <el-menu-item index="/admin/links">
          <i class="el-icon-menu"></i>
          <span>链接</span>
        </el-menu-item>
        <el-menu-item index="/admin/password">
          <i class="el-icon-setting"></i>
          <span>修改密码</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right">
        <span>{{ $store.state.authUser && $store.state.authUser.username }}</span>
        <img
          src="~assets/img/logout.png"
          alt="logout"
          class="logout"
          @click="handleLogout"
        >
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
    handleLogout () {
      this.logout()
    }
  }
}
</script>

<style scoped>
.el-header {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  font-size: 20px;
}

.el-aside {
  color: rgb(191, 203, 217);
}

.logout {
  width: 32px;
  margin-left: 20px;
  cursor: pointer;
}
</style>
