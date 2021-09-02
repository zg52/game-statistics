<template>
  <div>
    <div class="bg-banner"></div>
    <div id="login-box">
      <div class="login-banner"></div>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
        <div class="title-container">
            <h3 class="title">{{ title }}</h3>
        </div>
        <div>
          <el-form-item prop="username">
            <el-input 
              ref="username" 
              v-model="loginForm.username" 
              placeholder="用户名" 
              name="username" 
              type="text" 
              tabindex="1" 
              auto-complete="on"
              >
                <svg-icon 
                  slot="prefix" 
                  name="user"
                  icon-class="user"
                  />
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input 
              ref="password" 
              v-model="loginForm.password" 
              :type="passwordType" 
              placeholder="密码"
              name="password"
              tabindex="2" 
              auto-complete="on" 
              @keyup.enter.native="handleLogin"
              >
                <svg-icon 
                  slot="prefix" 
                  name="password"
                  icon-class="password"
                  />
                <svg-icon 
                  slot="suffix" 
                  :name="passwordType === 'password' ? 'eye' : 'eye-open'"
                  :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
                  @click="showPwd" 
                  />
            </el-input>
          </el-form-item>
        </div>
        <el-checkbox v-model="loginForm.remember">记住我</el-checkbox>
        <el-button :loading="loading" type="primary" style="width: 100%;" @click.native.prevent="handleLogin">登 录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      title: process.env.VUE_APP_TITLE,
      loginForm: {
        username: localStorage.login_account || 'admin',
        password: 'admin',
        remember: !!localStorage.login_account
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
        password: [
          { required: true, trigger: 'blur', message: '请输入密码' },
          { min: 1, max: 18, trigger: 'blur', message: '密码长度为1到18位' }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      this.passwordType = this.passwordType === 'password' ? '' : 'password'
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          // 账号admin 密码admin
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.loginForm.remember && localStorage.setItem('login_account', this.loginForm.username)
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch((err) => {
            this.$message.error(err)
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
  mounted() {
    console.log(localStorage.login_account, '11111111111111111111111')
  }
}
</script>

<style lang="scss" scoped>
::v-deep input[type=password]::-ms-reveal {
  display: none;
}

.bg-banner {
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100%;
  background-image: url('../../assets/images/login-bg.jpg');
  background-size: cover;
  background-position: center center;
}

#login-box {
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 5px #999;
  .login-banner {
    width: 300px;
    background-image: url('../../assets/images/login-banner.jpg');
    background-size: cover;
    background-position: center center;
  }
  .login-form {
    width: 450px;
    padding: 50px 35px 30px;
    overflow: hidden;
    .svg-icon {
      vertical-align: -0.35em;
    }
    .title-container {
      position: relative;
      .title {
        font-size: 22px;
        color: #666;
        margin: 0 auto 30px;
        text-align: center;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  ::v-deep .el-input {
    display: inline-block;
    height: 48px;
    width: 100%;
    input {
      height: 48px;
    }
    .el-input__prefix {
      left: 10px;
    }
    .el-input__suffix {
      right: 10px;
    }
  }
  .el-checkbox {
    margin: 20px 0;
  }
}
</style>

