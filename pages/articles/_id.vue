<template>
  <article>
    <h1>{{ article.title }}</h1>
    <p class="info">{{ article.date | format }}</p>
    <div class="markdown-body" v-html="$md.render(article.content)"></div>
  </article>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  asyncData ({ params, error }) {
    return axios.get(`/api/articles/${params.id}`).then(res => ({
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

<style scoped>
@import '~/assets/css/github-markdown.css';
</style>
