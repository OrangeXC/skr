<template>
  <section class="links">
    <div class="title">链接编辑</div>
    <table>
      <tr>
        <th>链接名称</th>
        <th>链接地址</th>
        <th>操作</th>
      </tr>
    </table>
    <table>
      <draggable :list="links" :options="dragOptions">
        <tr v-for="(link,index) in links">
          <td class="link-name">
            <input type="text" :value="link.name" placeholder="链接名称" spellcheck="false" @input="UPDATE_LINK_NAME({name: $event.target.value, index})">
          </td>
          <td class="link-url">
            <input type="text" :value="link.href" placeholder="链接地址" spellcheck="false" @input="UPDATE_LINK_HREF({href: $event.target.value, index})">
          </td>
          <td class="link-handle">
            <i class="fa fa-plus-circle" style="cursor: pointer;" @click="ADD_NEW_LINK(index)" v-if="links.length < 4"></i>&nbsp;
            <i class="fa fa-minus-circle" style="cursor: pointer;" @click="REMOVE_LINK(index)" v-if="links.length > 1"></i>&nbsp;
            <i class="fa fa-sort" style="cursor: pointer;" aria-hidden="true"></i>
          </td>
        </tr>
      </draggable>
    </table>
    <div class="panel">
      <button @click="saveLinks">保存</button>
    </div>
  </section>
</template>

<script>
  import {mapMutations, mapActions, mapState} from 'vuex'
  import draggable from 'vuedraggable'

  export default {
    data () {
      return {
        dragOptions: {
          handle: '.fa-sort'
        }
      }
    },
    created () {
      this.getLinks()
    },
    computed: mapState(['links']),
    methods: {
      ...mapActions(['saveLinks', 'getLinks']),
      ...mapMutations(['UPDATE_LINK_NAME', 'UPDATE_LINK_HREF', 'ADD_NEW_LINK', 'REMOVE_LINK'])
    },
    components: {
      draggable
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../style/mixins.scss";

  section.links {
    height: 100%;
    min-width: 500px;

    .title {
      @include title();
    }

    table {
      @include center();
      padding-top: 100px;
      width: 500px;
      position: relative;

      &:last-of-type {
        padding-top: 0;
      }

      input {
        box-sizing: border-box;
        height: 30px;
        padding: 6px;
      }

      input:focus {
        border: 1px solid $green1;
        border-radius: 3px;
      }

      tr {
        height: 50px;
        th {
          &:first-of-type {
            width: 100px;
          }

          &:last-of-type {
            width: 20%;
          }
        }

        td {
          input {
            width: 100%;
          }
        }
      }
    }

    .link-name {
      width: 100px;
      text-align: center;
    }

    .link-url {
      width: 295px;
    }

    .link-handle {
      width: 90px;

      cursor: move;
      cursor: -webkit-grabbing;

      text-align: center;
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
