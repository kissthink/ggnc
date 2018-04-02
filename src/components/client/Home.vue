<template>
  <div class="home">
    <div class="home-nav">
      <b-navbar toggleable="md" type="dark" variant="dark">

        <b-navbar-brand href="#">咕咕农场</b-navbar-brand>

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-collapse is-nav id="nav_collapse" v-if="!isLogin">
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown text="个人中心">
              <b-dropdown-item href="/my/information">我的信息</b-dropdown-item>
              <b-dropdown-item href="/my/farm">我的农场</b-dropdown-item>
              <b-dropdown-item href="/my/market">交易市场</b-dropdown-item>
              <b-dropdown-item href="/my/order">订单管理</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>

          <b-navbar-nav>
            <b-nav-item href="javascript:void(0);" @click="loginOut()">退出登录</b-nav-item>
          </b-navbar-nav>
        </b-collapse>

        <b-collapse is-nav id="nav_collapse" v-if="isLogin">
          <b-navbar-nav>
            <b-nav-item href="/login">登录</b-nav-item>
          </b-navbar-nav>
        </b-collapse>

      </b-navbar>
    </div>

    <p class="home-title">首页</p>

    <div class="notice" v-if="notice" @click="toNoticeList()">
      <div class="notice-icon">
        <i class="fas fa-bullhorn"></i>
      </div>
      <div style="visibility: hidden">123</div>
      <div class="notice-text">
        <div class="animation">{{notice.content}}</div>
      </div>
    </div>

    <div class="product-list row" v-if="images.length > 0">
      <div class="product-item col-sm-12 col-md-6 col-lg-4" v-for="img of images" :key="img.id">
        <img :src="`${baseUrl}${img.imageUrl}`" alt="image">
        <p>{{img.remark}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import tokenService from '@/assets/js/tokenService'
import clientService from '@/assets/js/clientService'
import axios from 'axios'
export default {
  name: 'Home',
  data () {
    return {
      isLogin: false,
      images: [],
      baseUrl: '',
      notice: null
    }
  },
  methods: {
    getLoginStatus () {
      this.isLogin = tokenService.isOverdue()
    },
    getIndexImgs () {
      clientService.getIndexImgs().then(res => {
        this.images = res
        this.baseUrl = axios.defaults.baseURL
      })
    },
    getNotice () {
      clientService.getNoticeList().then(res => {
        this.notice = res[0]
      })
    },
    loginOut () {
      localStorage.removeItem('USER_TOKEN')
      this.$router.push('/login')
    },
    toNoticeList () {
      this.$router.push('/notice')
    }
  },
  created () {
    this.getLoginStatus()
    this.getIndexImgs()
    this.getNotice()
  }
}
</script>

<style scoped>
  .home {
    padding: 56px 0 0 0;
    font-size: 14px;
  }
  .home-nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 56px;
    z-index: 999;
    font-size: 14px;
  }
  .home-nav .navbar-brand {
    font-size: 16px;
  }
  .home-title {
    margin: 0;
    padding: 1rem;
    background: #fff;
    border-bottom: 1px solid #ccc;
    font-size: 18px;
  }
  .notice {
    position: relative;
    margin: .8rem 0;
    padding: .5rem 1rem;
    min-height: 20px;
    background: #fff;
    word-break:keep-all;
    overflow: hidden;
    white-space:nowrap;
  }
  .notice .notice-icon {
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
    background: #fff;
    z-index: 100
  }
  .notice .notice-text {
    position: absolute;
    top: .5rem;
    left: 2.8rem;
    /*right: 1.5rem;*/
    overflow: hidden;
  }
  .product-list {
    padding: 1.8rem;
  }
  .product-item {
    margin-bottom: 1.2rem;
    border-radius: 1rem;
    overflow: hidden;
  }
  .product-item img {
    width: 100%;
    border: 1px solid #ccc;
  }
  .product-item p {
    margin: 0;
    padding: 1.25rem;
    width: 100%;
    border: 1px solid #ccc;
    border-top: none;
  }
  .navbar-brand {
    font-size: 16px;
  }
  .dropdown-item {
    font-size: 16px;
  }
  .animation {
    width: auto;
    -webkit-animation: noticeAnimation 60s linear infinite;
    animation: noticeAnimation 60s linear infinite;
  }
  @-webkit-keyframes noticeAnimation {
    0% {
      -webkit-transform: translate3d(0, 0, 0);
    }
    100% {
      -webkit-transform: translate3d(-100%, 0, 0);
    }
  }
  @keyframes noticeAnimation {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
    }
  }
</style>
