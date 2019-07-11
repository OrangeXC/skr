<template>
  <section class="wrap">
    <articles
      :init-articles="articles"
      :total="total"
    />
  </section>
</template>

<script>
import Articles from '~/components/Articles.vue'

export default {
  components: {
    Articles
  },
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
  }
}
</script>
