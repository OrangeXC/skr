<template>
  <footer>
    <div class="copyright">
      &copy;2016 Orange, 842012622@qq.com
    </div>
    <div class="login" @click="login">
      站长登陆
    </div>
  </footer>
</template>
<script>
  export default {
    methods: {
      login() {
        this.$router.go('/login')
      }
    }
  }
</script>
<style lang="sass">
  @import "../style/components/MyFooter.scss";
</style>