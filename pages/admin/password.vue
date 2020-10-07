<template>
  <section>
    <el-input
      v-model="password"
      placeholder="请输入新密码"
    />
    <el-input
      v-model="repeatPassword"
      placeholder="请再次输入新密码"
    />
    <p class="action-bar">
      <el-button @click="reset">
        重置
      </el-button>
      <el-button
        type="primary"
        @click="submit"
      >
        提交
      </el-button>
    </p>
  </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  layout: 'admin',
  middleware: 'auth',
  data () {
    return {
      password: '',
      repeatPassword: ''
    }
  },
  head () {
    return {
      title: 'Skr | 修改密码'
    }
  },
  methods: {
    ...mapActions(['logout']),
    submit () {
      if (this.password !== this.repeatPassword) {
        this.$message.danger('两次输入的密码不一致！')

        return
      }

      this.$axios.put('/api/user', {
        username: this.$store.state.authUser.username,
        password: this.password
      }).then(() => {
        this.$message.success('密码修改完成，请重新登录！')
        this.logout()
      })
    },
    reset () {
      this.password = ''
      this.repeatPassword = ''
    }
  }
}
</script>

<style>
.el-input {
  margin-bottom: 20px;
}

.action-bar {
  text-align: right;
}
</style>
