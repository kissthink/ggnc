<template>
  <div class="home">
    <div class="home-nav">
      <b-navbar toggleable="md" type="dark" variant="dark">

        <b-navbar-brand href="#">咕咕农场</b-navbar-brand>

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-collapse is-nav id="nav_collapse">
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
      </b-navbar>
    </div>

    <p class="home-title">首页</p>

    <div class="product-list row">
      <div class="product-item col-sm-12 col-md-6 col-lg-4">
        <img src="../../assets/img/wallhaven-600799.jpg" alt="image">
        <p>wallhaven-600799.jpg</p>
      </div>

      <div class="product-item col-sm-12 col-md-6 col-lg-4">
        <img src="../../assets/img/wallhaven-603537.jpg" alt="image">
        <p>wallhaven-603537.jpg</p>
      </div>

      <div class="product-item col-sm-12 col-md-6 col-lg-4">
        <img src="../../assets/img/wallhaven-609880.jpg" alt="image">
        <p>wallhaven-609880.jpg</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {

    }
  },
  methods: {
    loginOut () {
      localStorage.removeItem('LOGIN_USER')
      this.$router.push('/login')
    }
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
    height: 15rem;
  }
  .product-item p {
    margin: 0;
    padding: 1.25rem;
    width: 100%;
    border: 1px solid #ccc;
    border-top: none;
  }
</style>
