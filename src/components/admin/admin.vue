<template>
  <div class="dashbord-wrap">
    <div class="header">
      <h1>咕咕农场后台管理系统</h1>
      <div class="admin-name">
        {{name}} <a href="javascript:void(0);" @click="loginOut()">退出</a>
      </div>
    </div>
    <div class="silder-bar">
      <div class="menu-item">
        <ul>
          <router-link to="/admin/client-list" tag="li">
            <div class="menu-icon">
              <i class="fas fa-users"></i>
            </div>
            用户管理
          </router-link>
          <router-link to="/admin/goods-list" tag="li">
            <div class="menu-icon">
              <i class="fas fa-shopping-cart"></i>
            </div>
            商品管理
          </router-link>
          <router-link to="/admin/props-list" tag="li">
            <div class="menu-icon">
              <i class="fas fa-wrench"></i>
            </div>
            道具管理
          </router-link>
          <router-link to="/admin/orders-list" tag="li">
            <div class="menu-icon">
              <i class="fas fa-list-ol"></i>
            </div>
            订单管理
          </router-link>
          <router-link to="/admin/operation-logs" tag="li">
            <div class="menu-icon">
              <i class="fas fa-calendar-alt"></i>
            </div>
            操作日志
          </router-link>
          <router-link to="/admin/notice-management" tag="li">
            <div class="menu-icon">
              <i class="fas fa-bullhorn"></i>
            </div>
            系统公告管理
          </router-link>
        </ul>
      </div>
    </div>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import tokenService from '@/assets/js/tokenService'
export default {
  name: 'Admin',
  data () {
    return {
      name: 'admin'
    }
  },
  methods: {
    getLoginNameForToken () {
      this.name = tokenService.decodeToken().nikeName
    },
    loginOut () {
      localStorage.removeItem('USER_TOKEN')
      this.$router.push('/admin-login')
    }
  },
  created () {
    this.getLoginNameForToken()
  }
}
</script>

<style>
  .dashbord-wrap {
    overflow: hidden;
  }
  .header {
    position: relative;
    padding: 0 15px;
    width: 100%;
    height: 70px;
    box-shadow: 0 3px 3px rgba(0, 0, 0, .3);
    background: #343a40;
  }
  .header h1 {
    height: 70px;
    line-height: 70px;
    color: #fff;
  }
  .header .admin-name {
    position: absolute;
    right: 25px;
    top: 0;
    height: 70px;
    line-height: 70px;
    color: #fff;
    font-size: 18px;
  }
  .header .admin-name a {
    font-size: 14px;
  }
  .silder-bar {
    float: left;
    padding: 20px 0;
    width: 200px;
    background: #343a40;
  }
  .silder-bar .menu-item {
    color: #fff;
  }
  .silder-bar .menu-item li {
    padding: 0 30px;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    border-bottom: 1px solid #666;
    cursor: pointer;
    background: #343a40;
    overflow: hidden;
  }
  .silder-bar .menu-item li .menu-icon {
    float: left;
    width: 30%;
    height: 40px;
  }
  .silder-bar .menu-item li .fas {
    margin-right: 10px;
    font-size: 20px;
  }
  .silder-bar .menu-item li:first-child {
    border-top: 1px solid #666;
  }
  .silder-bar .menu-item li:hover {
    background: #454d56;
  }
  .router-link-active {
    background: #454d56 !important;
  }
  .content {
    float: right;
    padding: 15px;
    width: calc(100% - 200px);
    overflow-y: hidden;
  }
</style>
