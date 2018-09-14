<template>
  <div>
    <ul>
      <li class="article-item" v-for="article in articles" :key="article._id">
        <h2 class="article-item__title" @click="toDetail(article._id)">{{ article.title }}</h2>
        <div class="article-item__info">
          <p class="base">
            <i class="el-icon-date"></i>
            {{ article.date | format }}
            <i class="el-icon-view"></i>
            {{ article.views }}
          </p>
          <p class="tags">
            <el-tag
              v-for="tag in article.tags"
              :key="tag"
              size="mini"
              type="info"
              @click.native="toTag(tag)"
            >{{ tag }}</el-tag>
          </p>
        </div>
      </li>
    </ul>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="currentChange">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    initArticles: {
      type: Array,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      articles: this.initArticles
    }
  },
  methods: {
    toDetail (id) {
      this.$router.push(`/articles/${id}`)
    },
    toTag (tag) {
      this.$router.push(`/tags/${tag}`)
    },
    currentChange (page) {
      this.$axios.get('/api/articles', {
        params: {
          page
        }
      }).then(({ data }) => {
        this.articles = data.articles
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
    cursor: pointer;
  }
}

.el-pagination {
  text-align: center;
}

.el-pagination.is-background /deep/ .el-pager {
  li.active {
    &:hover {
      background-color: #333;
    }

    background-color: #333;
  }

  li:hover {
    color: #fff;
    background-color: #999;
  }
}

@media screen and (max-width: 960px) {
  .article-item__info {
    display: block;

    .el-tag--mini {
      margin: 5px 5px 0 0;
    }
  }
}
</style>
