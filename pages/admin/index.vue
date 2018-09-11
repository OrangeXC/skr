<template>
  <section>
    <el-table
      :data="articles"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="日期" width="160px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.date | format }}</span>
        </template>
      </el-table-column>

      <el-table-column label="标题" min-width="300px">
        <template slot-scope="scope">
          <router-link class="link-type" :to="`/articles/${scope.row._id}`">
            <span>{{ scope.row.title }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column label="状态" width="110">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | articleType">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="访问量" width="80" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.views }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="`/admin/articles/${scope.row._id}`">
            <el-button type="primary" size="small" icon="el-icon-edit">编辑</el-button>
          </router-link>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="remove(scope.row, scope.$index)">
            {{ scope.row.status === 'deleted' ? '强删' : '删除' }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
export default {
  async asyncData ({ app }) {
    let { data } = await app.$axios.get('/api/admin/articles')

    return {
      articles: data
    }
  },
  data () {
    return {
      listLoading: false
    }
  },
  filters: {
    articleType (status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }

      return statusMap[status]
    }
  },
  methods: {
    remove (article, index) {
      if (article.status === 'deleted') {
        this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.listLoading = true

          this.$axios.delete(`/api/articles/${article._id}`).then(() => {
            this.articles.splice(index, 1)
            this.listLoading = false
            this.$message.success('删除成功！')
          })
        }).catch(() => {
          this.listLoading = false
          this.$message.info('已取消强制删除')
        })

        return
      }

      this.listLoading = true

      article.status = 'deleted'

      this.$axios.put(`/api/articles/${article._id}`, article).then(() => {
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    }
  },
  head () {
    return {
      title: 'Skr | 控制台'
    }
  },
  layout: 'admin',
  middleware: 'auth'
}
</script>

<style scoped>
.link-type, .link-type:focus {
  color: #337ab7;
  cursor: pointer;
}
</style>
