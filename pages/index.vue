<template>
  <section class="wrap">
    <aside class="aside">
      <img class="avatar" src="~assets/img/avatar.jpg" alt="avatar">
      <p class="name">Orange</p>
      <p class="info">Go big or go home</p>
      <div class="icons">
        <a href="https://github.com/OrangeXC" target="_blank">
          <img class="icon" src="~assets/img/github.png" alt="github">
        </a>
        <a href="https://twitter.com/orangewxc" target="_blank">
          <img class="icon" src="~assets/img/twitter.png" alt="twitter">
        </a>
        <a href="mailto:842012622@qq.com">
          <img class="icon" src="~assets/img/email.png" alt="email">
        </a>
      </div>
    </aside>
    <ul>
      <li class="article-item" v-for="article in articles" :key="article._id">
        <h2 class="article-item__title" @click="toDetail(article._id)">{{ article.title }}</h2>
        <p class="article-item__info">
          <span class="base">
            <i class="el-icon-date"></i>
            {{ article.date | format }}
            <i class="el-icon-view"></i>
            {{ article.views }}
          </span>
          <span class="tags">
            <el-tag
              v-for="tag in article.tags"
              :key="tag"
              size="mini"
              type="info"
            >{{ tag }}</el-tag>
          </span>
        </p>
      </li>
    </ul>
  </section>
</template>

<script>
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
  methods: {
    toDetail (id) {
      this.$router.push(`/articles/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  position: relative;
  margin-left: 200px;

  .aside {
    width: 180px;
    position: absolute;
    left: -200px;
    padding: 20px 0;

    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);

    text-align: center;

    .avatar {
      width: 120px;
      height: 120px;

      border-radius: 50%;
    }

    .name {
      font-size: 22px;
    }

    .info {
      font-size: 16px;
    }

    .icons {
      display: flex;
      align-items: flex-start;
      justify-content: space-around;
      padding: 0 10px;
      margin-top: 20px;
    }

    .icon {
      width: 30px;
      cursor: pointer;
    }
  }

  .article-item {
    margin-bottom: 20px;
    padding: 18px 20px;

    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);

    line-height: 1;
  }

  .article-item__title {
    cursor: pointer;

    font-weight: bold;
    font-size: 18px;

    &:hover {
      text-decoration: underline;
    }
  }

  .article-item__info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;

    .base {
      font-size: 14px;
      color: #999;

      .el-icon-view {
        margin-left: 10px;
      }
    }

    .el-tag--mini {
      margin-left: 5px;
    }
  }
}

@media screen and (max-width: 960px) {
  .wrap {
    margin-left: 0;
  }

  .aside {
    display: none;
  }
}
</style>
