<template>
  <section class="wrap">
    <articles :articles="articles"></articles>
  </section>
</template>

<script>
import Articles from '~/components/Articles.vue'

export default {
  async asyncData ({ app }) {
    let { data } = await app.$axios.get('/api/articles')

    return {
      articles: data
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
