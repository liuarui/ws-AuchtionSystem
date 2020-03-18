<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <i v-if="!collapse" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
    </div>
    <div class="logo">后台管理系统</div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 用户头像 -->
        <div class="user-avator">
          <img src="../assets/img/img.jpg" />
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{username}}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
import bus from './bus'

export default {
  data() {
    return {
      collapse: false,
    }
  },
  computed: {
    username() {
      let username = localStorage.getItem('uname')

      return username
    },
  },
  methods: {
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      if (command === 'loginout') {
        localStorage.removeItem('token')
        localStorage.removeItem('uname')
        this.$store.commit('settoken','')
        this.$router.push('/login')
      }
    },
    // 侧边栏折叠
    collapseChage() {
      this.collapse = !this.collapse
      bus.$emit('collapse', this.collapse)
    },
  },
  mounted() {
    if (document.body.clientWidth < 1500) {
      this.collapseChage()
    }
  },
}
</script>
<style lang='less' scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;

  .logo {
    float: left;
    width: 250px;
    line-height: 70px;
  }
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
.header .header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
