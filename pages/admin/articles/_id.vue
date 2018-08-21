<template>
  <div>
    <el-input v-model="article.title" placeholder="标题"></el-input>
    <mavon-editor v-model="article.content" />
    <p class="action-bar">
      <el-button @click="submit('draft')">保存到草稿</el-button>
      <el-button type="primary" @click="submit('published')">发布</el-button>
    </p>
  </div>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  asyncData ({ params, error }) {
    if (params.id === 'new') {
      return {
        article: {
          title: '',
          content: ''
        }
      }
    }

    return axios.get(`/api/articles/${params.id}`).then(res => ({
      article: res.data
    })).catch(err =>
      error({ statusCode: 404, message: 'Article not found' })
    )
  },
  data: {
    loading: null
  },
  methods: {
    showLoading () {
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    },
    closeLoading () {
      this.loading.close()
      this.loading = null
    },
    showMessage (status) {
      const message =
        status === 'published'
          ? '文章已发布！'
          : '文章已保存到草稿！'

      this.$message.success(message)
    },
    submit (status) {
      this.showLoading()

      this.article.date = new Date()
      this.article.status = status

      if (this.article._id) {
        axios.put(`/api/articles/${this.article._id}`, this.article).then(() => {
          this.closeLoading()
          this.showMessage(status)
        })
      } else {
        axios.post(`/api/articles/new`, this.article).then(() => {
          this.closeLoading()
          this.showMessage(status)
        })
      }
    }
  },
  layout: 'admin',
  middleware: 'auth'
}
</script>

<style>
@import "mavon-editor/dist/css/index.css";

.v-note-wrapper {
  margin: 20px 0;
}

.action-bar {
  text-align: right;
}
</style>
