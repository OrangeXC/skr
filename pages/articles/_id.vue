<template>
  <article class="markdown-body">
    <h1>{{ article.title }}</h1>
    <blockquote>{{ article.date | format }}</blockquote>
    <div v-html="$md.render(article.content)"></div>
  </article>
</template>

<script>
export default {
  asyncData ({ app, params, error }) {
    return app.$axios.get(`/api/articles/${params.id}`).then(res => ({
      article: res.data
    })).catch(err =>
      error({ statusCode: 404, message: 'Article not found' })
    )
  },
  head () {
    return {
      title: `Skr - ${this.article.title}`
    }
  }
}
</script>

<style>
@import "mavon-editor/dist/markdown/github-markdown.min.css";
</style>
