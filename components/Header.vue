<template>
  <header class="header">
    <h1 class="title" @click="$router.push('/')">Skr</h1>
    <img class="menu-btn" src="~assets/img/menu.png" alt="menu" v-if="!isMenuShow" @click="toggleMenu">
    <img class="menu-btn" src="~assets/img/close.png" alt="close" v-else @click="toggleMenu">
    <nav class="nav" :class="{ 'mobile-nav': isMenuShow }">
      <ul>
        <li v-for="link in links" :key="link.id" @click="open(link.href)">
          {{ link.name }}
        </li>
        <li class="icons" v-if="isMenuShow">
          <a href="https://github.com/OrangeXC" target="_blank">
            <img class="icon" src="~assets/img/github.png" alt="github">
          </a>
          <a href="https://twitter.com/orangewxc" target="_blank">
            <img class="icon" src="~assets/img/twitter.png" alt="twitter">
          </a>
          <a href="mailto:842012622@qq.com">
            <img class="icon" src="~assets/img/email.png" alt="email">
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      isMenuShow: false
    }
  },
  methods: {
    toggleMenu () {
      this.isMenuShow = !this.isMenuShow
    },
    open (url) {
      window.open(url)
    }
  },
  computed: mapState([
    'links'
  ])
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
}

.title {
  display: inline-block;
  padding-bottom: 0.2em;
  margin: 10px 0;
  cursor: pointer;

  border-bottom: 5px solid #222;
  letter-spacing: 0.2em;

  font-size: 1.2em;
  font-weight: bold;
}

.nav {
  margin: 10px 0;
  position: relative;

  text-transform: uppercase;

  ul {
    display: flex;
    flex-direction: row;
  }

  li {
    margin: 0 0 0 20px;
    cursor: pointer;

    border-bottom: 2px solid transparent;

    color: #333;

    &:hover {
      border-bottom-color: #222;
    }
  }
}

.menu-btn {
  display: none;
  width: 30px;
  height: 30px;
  cursor: pointer;
}

@media screen and (max-width: 960px) {
  .nav {
    display: none;
    position: absolute;
    top: 36px;
    right: 0;
    z-index: 10;

    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    background-color: #fff;

    ul {
      width: 200px;
      flex-direction: column;
      padding: 10px 20px 0;
    }

    li {
      margin: 0 0 10px 0;
    }

    .icons {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;

      &:hover {
        border-bottom-color: transparent;
      }
    }

    .icon {
      width: 30px;
      cursor: pointer;
    }

    &.mobile-nav {
      display: block;
    }
  }

  .menu-btn {
    display: block;
  }
}
</style>
