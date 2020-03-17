<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="username">
            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="password"
            v-model="param.password"
            @keyup.enter.native="submitForm()"
          >
            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </div>
        <p class="login-tips">Tips : 测试提示~</p>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login /*, logout*/ } from '../api/login'

export default {
  data: function() {
    return {
      param: {
        username: '',
        password: '',
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    }
  },
  methods: {
    async submitForm() {
      //  发送到服务端验证，然后获取token存储本地 todo
      this.$refs.login.validate(async valid => {
        if (valid) {
          const result = await login(this.param)

          if (result.code === 3) {
            return this.$message.error('账户或密码错误')
          }
          if (result.msg === '用户权限不足，请向管理员申请权限') {
            return this.$message.error('用户权限不足，请向管理员申请权限')
          }
          if (result.register === false) {
            return this.$message.error('当前账户未注册，登录失败')
          }
          localStorage.setItem('token', result.token)
          localStorage.setItem('uname', this.$refs.login.model.username)
          this.$store.commit('settoken', result.token)
          if (this.$route.query.redirect) {
            this.$router.replace({ path: this.$route.query.redirect })
          } else {
            this.$router.replace({ path: '/dashboard' })
          }
          this.$message.success('登录成功')
        } else {
          this.$message.error('请输入账号和密码')
          console.log('error submit!!')
          return false
        }
      })
    },
  },
}
</script>

<style lang='less' scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 1020px;
  background-image: url(../assets/img/login-bg.png);
  background-repeat: no-repeat;
  background-size: 100%;

  .ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;

    .ms-title {
      width: 100%;
      line-height: 50px;
      text-align: center;
      font-size: 20px;
      color: #fff;
      border-bottom: 1px solid #ddd;
    }

    .ms-content {
      padding: 30px 30px;

      .login-btn {
        text-align: center;
      }

      .login-btn button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
      }

      .login-tips {
        font-size: 12px;
        line-height: 30px;
        color: #fff;
      }
    }
  }
}
</style>