<template>
  <section>
    <el-table
      :data="links"
      row-key="_id"
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

      <el-table-column align="center" label="拖拽" width="60">
        <template slot-scope="scope">
          <i class="el-icon-rank"></i>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="100">
        <template slot-scope="scope">
          <el-button icon="el-icon-delete" size="small" type="danger" @click="remove(scope.$index)">删除</el-button>
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
import Sortable from 'sortablejs'

export default {
  async asyncData ({ app }) {
    let { data } = await app.$axios.get('/api/links')

    return {
      links: data
    }
  },
  data () {
    return {
      listLoading: false,
      sortable: null
    }
  },
  mounted () {
    const table = document.querySelector('.el-table__body-wrapper tbody')
    const self = this

    this.sortable = new Sortable(table, {
      ghostClass: 'sortable-ghost',
      setData (dataTransfer) {
        dataTransfer.setData('Text', '')
      },
      onEnd ({ newIndex, oldIndex }) {
        const targetRow = self.links.splice(oldIndex, 1)[0]
        self.links.splice(newIndex, 0, targetRow)
      }
    })
  },
  destroyed () {
    this.sortable.destroy()
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

      this.$axios.post('/api/links', this.links).then(() => {
        this.listLoading = false

        this.$message.success('链接保存成功！')
      })
    }
  },
  layout: 'admin',
  middleware: 'auth'
}
</script>

<style lang="scss">
.action-bar {
  margin-top: 20px;

  text-align: right;
}

.el-table__row {
  &.sortable-ghost {
    opacity: 0.8;
    color: #fff;
    background: #42b983;
  }
}

.el-icon-rank {
  cursor: move;

  vertical-align: -4px;
  font-size: 32px;
}
</style>
