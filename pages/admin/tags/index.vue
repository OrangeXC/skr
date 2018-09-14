<template>
  <section>
    <el-table
      :data="currentPageData"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="名称">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.name" class="edit-input" size="small"/>
            <el-button
              class="cancel-btn"
              size="small"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(scope.row)"
            >cancel</el-button>
          </template>
          <span v-else>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="文章数" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.articleCount }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="182">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.edit"
            type="success"
            size="small"
            icon="el-icon-circle-check-outline"
            @click="confirmEdit(scope.row)"
          >保存</el-button>
          <el-button
            v-else
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="scope.row.edit = !scope.row.edit"
          >编辑</el-button>
          <el-button
            type="danger"
            size="small"
            icon="el-icon-delete"
            @click="remove(scope.row.name, scope.$index)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      :total="tags.length"
      :page-size="1"
      @current-change="currentChange">
    </el-pagination>
  </section>
</template>

<script>
export default {
  asyncData ({ app }) {
    return app.$axios.get('/api/tags', {
      params: {
        withArticleCount: true
      }
    }).then(res => ({
      tags: res.data.map(tag => {
        tag.edit = false
        tag.originalName = tag.name

        return tag
      })
    }))
  },
  data () {
    return {
      currentPage: 1,
      listLoading: null
    }
  },
  computed: {
    currentPageData: function () {
      const page = this.currentPage

      return this.tags.slice((page - 1) * 1, page * 1)
    }
  },
  methods: {
    cancelEdit (row) {
      row.name = row.originalName
      row.edit = false

      this.$message({
        message: '标签名称修改已撤销！',
        type: 'warning'
      })
    },
    async confirmEdit (row) {
      this.listLoading = true

      const originalName = row.originalName

      row.edit = false
      row.originalName = row.name

      await this.$axios.put(`/api/tags/${originalName}`, { name: row.name })

      this.$axios.get('/api/tags', {
        params: {
          withArticleCount: true
        }
      }).then(res => {
        this.tags = res.data.map(tag => {
          tag.edit = false
          tag.originalName = tag.name

          return tag
        })

        this.listLoading = false
        this.$message.success('标签名称修改成功！')
      })
    },
    remove (name, index) {
      this.$confirm('此操作将永久删除全部文章中的此标签, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true

        this.$axios.delete(`/api/tags/${name}`).then(() => {
          this.tags.splice(index, 1)
          this.listLoading = false
          this.$message.success('删除成功！')
        })
      }).catch(() => {
        this.listLoading = false
        this.$message.info('删除已取消！')
      })
    },
    currentChange (page) {
      this.currentPage = page
    }
  },
  head () {
    return {
      title: 'Skr | 标签管理'
    }
  },
  layout: 'admin',
  middleware: 'auth'
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}

.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}

.el-pagination {
  margin-top: 10px;

  text-align: center;
}
</style>
