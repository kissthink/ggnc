<template>
  <div class="admin-login">
    <h1>咕咕农场后台管理系统</h1>
    <form>
      <div class="form-input">
        <div class="input-icon">
          <i class="fas fa-user"></i>
        </div>
        <input type="text" placeholder="请输入管理员账号" v-model="adminMobile" autocomplete="false">
      </div>

      <div class="form-input">
        <div class="input-icon">
          <i class="fas fa-lock"></i>
        </div>
        <input type="password" placeholder="请输入管理员密码" v-model="adminPassword">
      </div>

      <button class="btn btn-info btn-block btn-lg" @click.prevent="login()" :disabled="isLogin">{{loginMessage}}</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import url from '../assets/js/apiUrl.js'
export default {
  name: 'AdminLogin',
  data () {
    return {
      adminMobile: '',
      adminPassword: '',
      isLogin: false,
      loginMessage: '登录'
    }
  },
  methods: {
    login () {
      if (this.isLogin) {
        return
      }
      if (this.adminMobile === '' || this.adminPassword === '') {
        this.$message({message: '账号或密码不能为空', type: 'warning'})
        return
      }
      this.isLogin = true
      this.loginMessage = '登录中...'
      axios.post(url.adminLogin, {
        mobile: this.adminMobile,
        password: this.adminPassword
      }).then(res => {
        this.isLogin = false
        this.loginMessage = '登录'
        if (res.data.status > 200) {
          this.$message({message: '账号或密码错误', type: 'error'})
        } else {
          this.$message({message: '登录成功', type: 'success'})
          localStorage.setItem('USER_TOKEN', res.data.data.token)
          this.$router.push('/admin')
        }
      }).catch(error => {
        console.log(error.message)
        this.$message({message: '登陆失败', type: 'error'})
      })
    }
  }
}
</script>

<style>
  .admin-login {
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }
  .admin-login h1 {
    margin-top: 210px;
    text-align: center;
    color: #343a40;
    font-size: 28px;
  }
  .admin-login form {
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -200px;
    margin-left: -200px;
    padding: 0 50px;
    width: 400px;
    height: 400px;
    text-align: center;
  }
  .form-input {
    margin-bottom: 18px;
  }
  .form-input .input-icon {
    float: left;
    width: 15%;
    height: 40px;
    line-height: 42px;
    background: #fff;
    border-radius: 5px 0 0 5px;
  }
  .form-input .input-icon i {
    font-size: 20px;
    color: #666;
  }
  .form-input input {
    width: 85%;
    height: 40px;
    line-height: 40px;
    text-align: left;
    border: none;
    outline: none;
    border-radius: 0 5px 5px 0;
    font-size: 14px;
  }
</style>
