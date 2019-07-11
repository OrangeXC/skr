<template>
  <article class="markdown-body">
    <h1 class="title">
      {{ article.title }}
    </h1>
    <p class="info">
      <i class="el-icon-date" />
      发表于 {{ article.date | format }} |
      <i class="el-icon-view" />
      本文阅读量 {{ article.views }}
    </p>
    <div v-html="$md.render(article.content)" />
  </article>
</template>

<script>
export default {
  asyncData ({ app, params, error }) {
    return app.$axios.get(`/api/articles/${params.id}`).then(res => ({
      article: res.data
    })).catch(() =>
      error({ statusCode: 404, message: 'Article not found' })
    )
  },
  head () {
    return {
      title: `Skr | 文章：${this.article.title}`
    }
  }
}
</script>

<style>
@import "mavon-editor/dist/markdown/github-markdown.min.css";

.title {
  text-align: center;
}

.info {
  text-align: center;

  font-size: 12px;
  color: #999;
}
</style>
