<template>
  <div class="login-wrap">
    <div class="login-form">
      <h1>咕咕农场</h1>
      <b-form>
        <b-form-group horizontal
                :label-cols="4"
                label="手机号："
                :invalid-feedback="userMobileErrorMessage"
                :state="userMobileState"
                size="lg"
                label-for="username">
          <b-form-input id="username" :state="userMobileState" v-model="userMobile"></b-form-input>
        </b-form-group>

        <b-form-group horizontal
                :label-cols="4"
                label="密码："
                :invalid-feedback="passwordErrorMessage"
                :state="passwordState"
                size="lg"
                label-for="password">
          <b-form-input id="password" :state="passwordState" type="password"  v-model="password"></b-form-input>
        </b-form-group>

        <button class="btn btn-success btn-block mt-4" @click.prevent="login()" :disabled="isLogin">{{buttonLoginMessage}}</button>
      </b-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import url from '../assets/js/apiUrl.js'
export default {
  name: 'Login',
  data () {
    return {
      isLogin: false,
      buttonLoginMessage: '登录',
      userMobile: '',
      password: '',
      userMobileErrorMessage: '',
      passwordErrorMessage: '',
      userMobileState: true,
      passwordState: true
    }
  },
  methods: {
    login () {
      if (this.isLogin) {
        return
      }
      if (this.userMobile === '') {
        this.userMobileErrorMessage = '手机号不能为空'
        this.userMobileState = false
        return
      }
      if (this.password === '') {
        this.passwordErrorMessage = '请输入密码'
        this.passwordState = false
        return
      }
      this.isLogin = true
      this.buttonLoginMessage = '登录中...'
      axios.post(url.userLogin, {
        mobile: this.userMobile,
        password: this.password
      }).then(res => {
        this.isLogin = false
        this.buttonLoginMessage = '登录'
        if (res.data.status > 200) {
          this.$message({message: `用户名或密码错误`, type: 'error'})
        } else {
          this.$message({message: `欢迎回来`, type: 'success'})
          localStorage.setItem('USER_TOKEN', res.data.data.token)
          axios.defaults.headers.common['Authorization'] = res.data.data.token
          this.$router.push('/my')
        }
      })
    }
  }
}
</script>

<style>
  .login-wrap {
    position: relative;
    padding: 3rem;
    height: 100vh;
    background: url('../assets/img/login-bg.jpg') no-repeat;
    font-size: 16px;
  }
  @media screen and (min-width: 768px) {
    .login-wrap {
      background-size: 100% 100%;
    }
  }
  .login-wrap h1 {
    margin-bottom: 3rem;
    text-align: center;
    color: #f8f9fa;
  }
  .login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -150px;
    margin-left: -10rem;
    width: 20rem;
    height: 300px;
  }
  .login-form label {
    color: #f8f9fa;
  }
  .login-form button {
    font-size: 14px;
  }
</style>
