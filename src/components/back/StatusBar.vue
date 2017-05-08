<template>
  <header class="statusBar">
    <div class="user">
      <span>{{time}}好, {{user.name}}</span>
      <button @click="logout">
        <span>登出</span>
        <i class="fa fa-sign-out"></i>
      </button>
    </div>
  </header>
</template>

<script>
  import {unset} from '../../assets/js/cookieUtil'
  import {mapState, mapMutations} from 'vuex'

  export default {
    methods: {
      logout () {
        unset('user', '/', window.location.hostname)
        this.SET_USER({name: '', pwd: ''})
        this.$router.push('/')
      },
      ...mapMutations(['SET_USER'])
    },
    computed: {
      time () {
        const hours = new Date().getHours()
        if (hours > 5 && hours < 12) return '早上'
        if (hours > 11 && hours < 19) return '下午'
        return '晚上'
      },
      ...mapState(['user'])
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../style/mixins.scss";

  $headerHeight: 50px;
  header.statusBar {
    height: $headerHeight;
    z-index: 1;

    .home {
      width: 200px;
      height: $headerHeight;
    }

    .user {
      height: $headerHeight;
      float: right;
      right: 20px;

      button {
        @include greenButton();
        width: 80px;
        height: 30px;
        margin: 10px;
      }
    }
  }
</style>
