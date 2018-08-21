<template>
  <div class="container">
    <my-header/>
    <nuxt/>
    <my-footer/>
  </div>
</template>

<script>
import MyHeader from '~/components/Header.vue'
import MyFooter from '~/components/Footer.vue'

export default {
  components: {
    MyHeader,
    MyFooter
  }
}
</script>

<style scoped>
.container {
  width: 920px;
  min-height: 100vh;
  position: relative;
  margin: 0 auto;
  padding: 0 20px 20px;
}

@media screen and (max-width: 960px) {
  .container {
    width: 100%;
  }
}
</style>
