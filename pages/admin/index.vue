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
      <el-table-column width="160px" align="center" label="日期">
        <template slot-scope="scope">
          <span>{{ scope.row.date | format }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="标题">
        <template slot-scope="scope">
          <router-link class="link-type" :to="`/admin/articles/${scope.row._id}`">
            <span>{{ scope.row.title }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column label="状态" width="110">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | articleType">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <router-link :to="`/admin/articles/${scope.row._id}`">
            <el-button type="primary" size="small" icon="el-icon-edit">编辑</el-button>
          </router-link>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  async asyncData () {
    let { data } = await axios.get('/api/articles')

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
    remove (article) {
      this.listLoading = true

      article.status = 'deleted'

      axios.put(`/api/articles/${article._id}`, article).then(() => {
        this.listLoading = false
      })
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
