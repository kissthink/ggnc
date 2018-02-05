<template>
  <div class="login-wrap">
    <h1>咕咕农场</h1>

    <div class="login-form">
      <b-form>
        <b-form-group horizontal
                :label-cols="4"
                label="用户名："
                :invalid-feedback="errorMessage"
                :state="state"
                label-for="username">
          <b-form-input id="username" :state="state" v-model="username"></b-form-input>
        </b-form-group>

        <b-form-group horizontal
                :label-cols="4"
                label="密码："
                :state="state"
                label-for="password">
          <b-form-input id="password" :state="state" type="password"  v-model="password"></b-form-input>
        </b-form-group>

        <button class="btn btn-success btn-block mt-4" @click.stop="login()">登录</button>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      errorMessage: '',
      state: true
    }
  },
  methods: {
    login () {
      if (this.username === '' && this.password === '') {
        this.errorMessage = '账号密码不能为空'
        this.state = false
        return
      }
      if (this.username === 'admin' && this.password === 'admin') {
        this.errorMessage = ''
        this.state = true
        this.$router.push('/dashboard')
        window.localStorage.setItem('LOGIN_USER', this.username + ',' + this.password)
      } else {
        this.errorMessage = '账号或密码错误'
        this.state = false
      }
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
    font-size: 14px;
  }
  @media screen and (min-width: 768px) {
    .login-wrap {
      background-size: 100% 100%;
    }
  }
  .login-wrap h1 {
    margin-top: 3rem;
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
