<template>
  <section class="tag-wrap">
    <h2 class="title">标签：{{ $route.params.name }}</h2>
    <articles :articles="articles"></articles>
  </section>
</template>

<script>
import Articles from '~/components/Articles.vue'

export default {
  asyncData ({ app, params, error }) {
    return app.$axios.get('/api/articles', {
      params: {
        tag: params.name
      }
    }).then(res => ({
      articles: res.data
    })).catch(err =>
      error({ statusCode: 404, message: 'Tag not found' })
    )
  },
  head () {
    return {
      title: `Skr | 标签：${this.$route.params.name}`
    }
  },
  components: {
    Articles
  }
}
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: 20px;

  text-align: center;

  font-size: 24px;
}
</style>
