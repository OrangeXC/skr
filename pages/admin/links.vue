<template>
  <section>
    <el-table
      :data="links"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column width="200px" label="链接名称">
        <template slot-scope="scope">
          <el-input v-model="scope.row.name"></el-input>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="链接地址">
        <template slot-scope="scope">
          <el-input v-model="scope.row.href"></el-input>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="danger" size="small" icon="el-icon-delete" @click="remove(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <p class="action-bar">
      <el-button @click="add" :disabled="links.length > 4">新增链接</el-button>
      <el-button type="primary" @click="submit">保存</el-button>
    </p>
  </section>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  async asyncData () {
    let { data } = await axios.get('/api/links')

    return {
      links: data
    }
  },
  data () {
    return {
      listLoading: false
    }
  },
  methods: {
    add () {
      this.links.push({
        name: '',
        links: ''
      })
    },
    remove (index) {
      this.links.splice(index, 1)
    },
    submit () {
      this.listLoading = true

      this.links = this.links.filter(({ name, href }) => name && href)

      axios.post('/api/links', this.links).then(() => {
        this.listLoading = false

        this.$message.success('链接保存成功！')
      })
    }
  },
  layout: 'admin',
  middleware: 'auth'
}
</script>

<style>
.action-bar {
  margin-top: 20px;

  text-align: right;
}
</style>
