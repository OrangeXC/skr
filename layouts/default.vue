<template>
  <div class="container">
    <my-header/>
    <main class="main">
      <my-aside />
      <nuxt/>
    </main>
    <my-footer/>
  </div>
</template>

<script>
import MyHeader from '~/components/Header.vue'
import MyFooter from '~/components/Footer.vue'
import MyAside from '~/components/Aside.vue'

export default {
  components: {
    MyHeader,
    MyFooter,
    MyAside
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 920px;
  min-height: 100vh;
  position: relative;
  margin: 0 auto;
  padding: 0 20px 20px;
}

.main {
  position: relative;
  margin-left: 200px;
  margin-top: 20px;
}

@media screen and (max-width: 960px) {
  .main {
    margin-left: 0;
  }
}
</style>
