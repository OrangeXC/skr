<template>
  <section class="wrap">
    <articles :initArticles="articles" :total="total"></articles>
  </section>
</template>

<script>
import Articles from '~/components/Articles.vue'

export default {
  async asyncData ({ app }) {
    const { data } = await app.$axios.get('/api/articles')

    const { articles, total } = data

    return {
      articles,
      total
    }
  },
  head () {
    return {
      title: 'Skr'
    }
  },
  components: {
    Articles
  }
}
</script>
