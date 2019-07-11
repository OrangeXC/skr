<template>
  <div>
    <h2 class="title">
      标签
    </h2>
    <div class="tags">
      <el-tag
        v-for="tag in tags"
        :key="tag.name"
        type="info"
        @click.native="toTag(tag.name)"
      >
        {{ tag.name }} ({{ tag.articleCount }})
      </el-tag>
    </div>
  </div>
</template>

<script>
export default {
  asyncData ({ app }) {
    return app.$axios.get('/api/tags', {
      params: {
        withArticleCount: true
      }
    }).then(res => ({
      tags: res.data
    }))
  },
  methods: {
    toTag (tag) {
      this.$router.push(`/tags/${tag}`)
    }
  },
  head () {
    return {
      title: 'Skr | 标签'
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  text-align: center;

  font-size: 24px;
}

.tags {
  margin: 20px 0;

  text-align: center;
}

.el-tag {
  margin: 0 10px;
  cursor: pointer;
}
</style>
