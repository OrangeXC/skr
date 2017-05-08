<template>
  <section class="account">
    <div class="title">修改密码</div>
    <div class="password">
      <p class="input">
        <i class="fa fa-key fa-fw"></i>
        <input type="password" placeholder="输入新密码" v-model="pwd">
      </p>
      <p class="input">
        <i class="fa fa-key fa-fw"></i>
        <input type="password" placeholder="再输入一次" v-model="pwdRepeat">
      </p>
    </div>
    <div class="panel">
      <button @click="savePwd">保存</button>
    </div>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        pwd: '',
        pwdRepeat: ''
      }
    },
    methods: {
      savePwd () {
        if (this.pwd === this.pwdRepeat) {
          this.$store.dispatch('savePwd', this.pwd)
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../style/mixins.scss";

  section.account {
    height: 100%;

    .title {
      @include title();
    }

    .password {
      width: 260px;
      margin: 100px auto 40px auto;

      input {
        width: 220px;
        height: 30px;
        padding: 6px;
        margin: 10px auto;
        border-bottom: 1px solid $green1;
      }
    }

    .panel {
      position: absolute;
      bottom: 40px;
      right: 100px;

      button {
        @include greenButton();
        height: 30px;
        width: 80px;
      }
    }
  }
</style>
