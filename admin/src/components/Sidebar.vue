<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in items">
        <el-menu-item :index="item.index" :key="item.index">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from './bus'

export default {
  data() {
    return {
      collapse: false,
      items: [
        {
          icon: 'el-icon-s-home',
          index: 'dashboard',
          title: '系统首页',
        },
        {
          icon: 'el-icon-s-goods',
          index: 'auction',
          title: '拍品表管理',
        },
        {
          icon: 'el-icon-s-order',
          index: 'auctionOrder',
          title: '拍品订单表管理',
        },
        {
          icon: 'el-icon-user-solid',
          index: 'user',
          title: '用户表管理',
        },
        {
          icon: 'el-icon-star-on',
          index: 'userStar',
          title: '用户收藏表管理',
        },
      ],
    }
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace('/', '')
    },
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on('collapse', msg => {
      this.collapse = msg
      bus.$emit('collapse-content', msg)
    })
  },
}
</script>

<style lang='less' scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0;
  }
  > ul {
    height: 100%;
  }
  .sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
  }
}
</style>
