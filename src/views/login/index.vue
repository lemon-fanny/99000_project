<template>
  <div class="login-container">
    <div class="login-left">
      <img src="@/assets/login-image.jpg" alt="Login Image">
    </div>
    <div class="login-right">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

        <div class="title-container">
          <h3 class="title">Login Form</h3>
        </div>

        <el-form-item prop="zid"> <!-- 修改 prop 为 zid -->
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="zid"
            v-model="loginForm.zid"
            placeholder="ZID"
            name="zid"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>

        <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="Password"
              name="password"
              tabindex="2"
              autocomplete="on"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleLogin"
            />
            <span v-if="passwordType === 'text'" class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
        </el-tooltip>

        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;background-color:#8B4513;color:#fff;" @click.native.prevent="handleLogin">Login</el-button>
      </el-form>

      <el-dialog title="Or connect with" :visible.sync="showDialog">
        Can not be simulated on local, so please combine you own business simulation! ! !
        <br>
        <br>
        <br>
        <social-sign />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import SocialSign from './components/SocialSignin'

export default {
  name: 'Login',
  components: { SocialSign },
  data() {
    const validateZid = (rule, value, callback) => { // 修改字段验证函数为 zid
      const zids = ['a0000001', 'coordinator', 'student', 'tutor', 'client']
      if (!zids.includes(value)) {
        callback(new Error('Please enter the correct ZID'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        zid: '', // 修改字段为 zid
        password: ''
      },
      loginRules: {
        zid: [{ required: true, trigger: 'blur', validator: validateZid }], // 修改字段为 zid
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  mounted() {
    if (this.loginForm.zid === '') { // 修改字段为 zid
      this.$refs.zid.focus() // 修改字段为 zid
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = 'text'
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    async handleLogin() {
      try {
        console.log('Validating login form...') // 日志输出
        const valid = await this.$refs.loginForm.validate()
        if (valid) {
          console.log('Form validated successfully') // 日志输出
          this.loading = true
          const response = await this.$store.dispatch('user/login', { zid: this.loginForm.zid, password: this.loginForm.password }) // 修改字段为 zid
          console.log('Login response:', response) // 日志输出
          if (response && response.token) {
            console.log('Login successful, redirecting...') // 日志输出
            this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
          } else {
            console.error('Login failed, no token received') // 错误日志
            this.$message.error('Login failed, please check your credentials and try again.')
          }
        } else {
          console.error('Validation failed') // 错误日志
          this.$message.error('Invalid ZID or password')
        }
      } catch (error) {
        console.error('Error during login:', error) // 错误日志
        this.$message.error('Login failed, please try again later.')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
<style lang="scss">
$bg: #2d3a4b;
$dark_gray: #8B4513; // 深棕色
$light_gray: #eee;
$caps_tooltip_color: #f56c6c;
$login_left_bg: #409EFF;
$login_right_bg: #8B4513;
$login_form_bg: white;
$login_form_border_radius: 8px;
$login_form_box_shadow: 0 0 10px rgba(0, 0, 0, 0.1);
$cursor: $dark_gray; // 使用深棕色作为光标颜色

.login-container {
  display: flex;
  min-height: 100vh;
  background-color: $bg;

  .login-left {
    flex: 1;
    background-color: $login_left_bg;

    img {
      width: 100%;
      height: 100vh; // 确保图片适应屏幕高度
      object-fit: cover; // 确保图片适应不同分辨率
    }
  }

  .login-right {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $login_right_bg;

    .login-form {
      width: 300px;
      background: $login_form_bg;
      padding: 20px;
      border-radius: $login_form_border_radius;
      box-shadow: $login_form_box_shadow;
      color: $dark_gray; // 设置表单字体颜色为深棕色
      position: relative;
    }

    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $dark_gray; // 设置输入框字体颜色为深棕色
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $dark_gray !important; // 设置自动填充字体颜色为深棕色
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: $dark_gray; // 设置表单项字体颜色为深棕色
      position: relative;
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray; // 设置SVG容器颜色为深棕色
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $dark_gray; // 设置标题颜色为深棕色
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 16px;
      color: $dark_gray; // 设置显示密码按钮颜色为深棕色
      cursor: pointer;
      user-select: none;
    }

    .thirdparty-button {
      position: absolute;
      right: 0;
      bottom: 6px;
    }

    @media only screen and (max-width: 470px) {
      .thirdparty-button {
        display: none;
      }
    }
  }
}
</style>
