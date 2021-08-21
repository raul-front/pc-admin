<template>
  <div class="component-flex-page login">
    <div class="test-div">
      <el-button type="primary" @click="handleLogin">登录</el-button>
    </div>
  </div>
</template>

<script>
import storage from 'utils/storage'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import { login } from 'api/access'
import { validatePhone } from 'lisa/utils/validate'
import config from '@/config'

export default {
  name: 'login',
  setup () {
    const store = useStore()
    const router = useRouter()

    const toHome = () => {
      // 清空toLogin标记
      storage.rmToLoginFlag()
      const path = storage.getLocationHref()
      if (path) {
        storage.rmLocationHref()
        router.push(path)
      } else {
        router.push({ name: 'Home' })
      }
    }

    const handleLogin = () => {
      const data = {
        phone: '18919015125',
        password: '123456',
      }
      login(data).then(res => {
        store.commit('user/setLoginInfo', res)
        toHome()
      }).catch(_ => {})
    }

    return {
      handleLogin,
    }
  },
  data () {
    return {
      id: 0,
      submitBtnLoading: false,
      loginForm: {
        phone: config.envData.VUE_APP_PHONE || '',
        code: config.envData.VUE_APP_LOGIN_PSD || '',
      },
      msgTime: 60,
      msgText: '获取验证码',
      isSendCode: false,
    }
  },
  methods: {

    getCode () {
      if (!this.checkoutPhone()) {
        return
      }
      const data = {
        type: 'phone',
        phone: this.loginForm.phone,
      }
      this.msgText = '重新发送'
      this.msgTime = 60
      this.isSendCode = true
      getLoginCode(data).then(res => {
        this.$message.success('验证码已发送请注意查收')
        const timer = setInterval(() => {
          this.msgTime--
          if (this.msgTime <= 0) {
            this.isSendCode = false
            clearInterval(timer)
          }
        }, 1000)
      }).catch(() => {
        this.isSendCode = false
      })
    },
    checkoutPhone () {
      if (!this.loginForm.phone) {
        this.$message.warning('请输入手机号')
        return false
      }
      if (!validatePhone(this.loginForm.phone)) {
        this.$message.warning('请检查手机号码格式')
        return false
      }
      return true
    },
    checkoutCode () {
      if (!this.loginForm.code) {
        this.$message.warning('请输入验证码')
        return false
      }
      const reg = /^\d{4}$/
      if (!reg.test(this.loginForm.code)) {
        this.$message.warning('验证码为4位数字')
        return false
      }
      return true
    },
  },
}
</script>

<style lang="scss">
.login{
  .test-div{
    width: 300px;
    height: 200px;
    margin: 0 auto;
    @include flex-center();
  }
}
.login{
  width: 100%;
  height: 100%;
  min-height: 460px;
  display: flex;
  &-left{
    width: 40%;
    display: flex;
    flex-direction: column;
  }
  &-right{
    width: 60%;
    height: 100%;
    overflow: hidden;
    position: relative;
    // background: #151524;
    @include flex-center();
    color: #fff;
    &::before {
      z-index: 1;
      content: ' ';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      // background-image: url("/images/login_bg.png");
      background-size: cover;
    }
    .title{
      font-size: 28px;
    }
  }
  &-header{
    height: 60px;
    padding: 5px 0 5px 20px;
    // background: #fff;
    @include flex-center();
    justify-content: flex-start;
    // box-shadow: 0 1px 2px 0 rgba(9,18,26,0.06), 0 4px 8px 0 rgba(39,56,73,0.08);
    img{
      height: 40px;
    }
  }
  &-footer{
    height: 50px;
    line-height: 50px;
    padding-left: 30px;
    color: #606266;
  }
  &-content{
    flex: 1;
    @include flex-center(column);
    .login-container{
      width: 330px;
      height: 300px;
      .el-tabs__item{
        font-size: 16px;
        font-weight: bold;
      }
      .el-form{
        margin-top: 20px;
      }
      .validate-text{
        margin-right: 15px;
        cursor: default;
      }
      .validate-text-get{
        // color: $color-primary;
        cursor: pointer;
        &:hover{
          font-weight: bold;
        }
      }
      .submit-btn{
        width: 100%;
        .submit-btn-text{
          font-size: 14px;
        }
      }
      .mp-bind-image{
        margin: 30px 75px;
      }
      .el-input__suffix{
        line-height: 36px;
      }
    }
    .login-description{
      margin-top: 20px;
      // color: $color-primary;
    }
    .bind-description{
      margin-top: 20px;
      // color: $color-danger;
    }

  }
}
</style>
