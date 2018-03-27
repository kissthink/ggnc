<template>
  <div class="my">
    <div class="my-container">
      <router-view/>
    </div>

    <div class="foot-nav">
      <ul class="foot-nav-bar">
        <li class="foot-nav-item">
         <router-link to="/home">首页</router-link>
        </li>
        <li class="foot-nav-item">
          <router-link to="/my/farm">农场</router-link>
        </li>
        <li class="foot-nav-item">
          <router-link to="/my/market">市场</router-link>
        </li>
        <li class="foot-nav-item">
          <router-link to="/my/order">订单</router-link>
        </li>
        <li class="foot-nav-item">
          <router-link to="/my/information">我的</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'My',
  data () {
    return {

    }
  }
}
</script>

<style>
  .my {
    padding: 56px 0 48px 0;
  }
  .foot-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 48px;
    line-height: 48px;
    border-top: 1px solid #ccc;
    overflow: hidden;
    background: #fff;
    z-index: 999;
    font-size: 14px;
  }
  .foot-nav-bar {
    overflow: hidden;
  }
  .foot-nav-item {
    float: left;
    width: 20%;
    text-align: center;
  }
  .foot-nav-item a {
    display: block;
    width: 100%;
    height: 48px;
    color: #666;
    text-decoration: none;
    -webkit-transition: .5s all;
    -moz-transition: .5s all;
    -ms-transition: .5s all;
    -o-transition: .5s all;
  }
  .router-link-active {
    background: #111e29;
    color: #ffffff!important;
  }
</style>
