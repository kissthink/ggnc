<template>
  <div  class="information-wrap">
    <h4 class="h4-title">个人信息</h4>

    <div class="user-info" @click="toTargetRouter('/personalData')">
      <div class="user-avatar">
        <img src="../../../assets/img/user.png" height="280" width="280" alt="wallhaven-603537">
      </div>
      <div class="user-name">
        <p>{{user.nickName}}</p>
        <p class="user-mobile">手机号: {{user.mobile}}</p>
      </div>
    </div>

    <div class="user-wallet" @click="toWallet()">
      <div class="icon">
        <i class="fab fa-trello"></i>
      </div>
      <span>钱包</span>
    </div>

    <div class="other">
      <div class="other-item" @click.stop="toTargetRouter('/notice')">
        <div class="icon">
          <i class="fas fa-bullhorn"></i>
        </div>
        <span>系统公告</span>
      </div>

      <div class="other-item" @click.stop="invitingNewMenber()">
        <div class="icon">
          <i class="fas fa-male"></i>
        </div>
        <span>邀请新会员</span>
      </div>

      <div class="other-item" v-if="!user.userInfo" @click.stop="realName()">
        <div class="icon">
          <i class="fas fa-address-card"></i>
        </div>
        <span>实名认证</span>
      </div>

      <div class="other-item" @click.stop="myTeam()">
        <div class="icon">
          <i class="fas fa-users"></i>
        </div>
        <span>我的团队</span>
      </div>

      <div class="other-item" @click.stop="chickenDetail()">
        <div class="icon">
          <i class="fas fa-chart-pie"></i>
        </div>
        <span>养鸡明细</span>
      </div>
    </div>

    <div class="edit-pw" @click="editPassword()">
      <div class="icon">
        <i class="fas fa-lock"></i>
      </div>
      <span>修改密码</span>
    </div>
  </div>
</template>

<script>
import tokenService from '@/assets/js/tokenService'
import clientService from '@/assets/js/clientService'

export default {
  name: 'Information',
  data () {
    return {
      user: ''
    }
  },
  methods: {
    getUserInfo () {
      let userId = tokenService.decodeToken().id
      clientService.getUserInfo(userId).then(res => {
        this.user = res
      })
    },
    toTargetRouter (url) {
      this.$router.push(url)
    },
    toWallet () {
      let queryData = {userId: this.user.id}
      this.$router.push({path: '/wallet', query: queryData})
    },
    invitingNewMenber () {
      let queryData = {userId: this.user.id}
      this.$router.push({path: '/inviting-new-mamber', query: queryData})
    },
    realName () {
      let queryData = {userId: this.user.id}
      this.$router.push({path: '/real-name', query: queryData})
    },
    myTeam () {
      let queryData = {invitee: JSON.stringify(this.user.invitee), inviter: JSON.stringify(this.user.inviter)}
      this.$router.push({path: '/mt-team', query: queryData})
    },
    chickenDetail () {
      let queryData = {asset: JSON.stringify(this.user.asset)}
      this.$router.push({path: '/chicken-detail', query: queryData})
    },
    editPassword () {
      let queryData = {userId: this.user.id}
      this.$router.push({path: '/edit-password', query: queryData})
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style scoped>
  .information-wrap {
    font-size: 14px;
  }
  .icon {
    display: inline-block;
    margin-right: 1rem;
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    vertical-align: sub;
  }
  .icon i {
    font-size: 24px;
  }
  .user-info {
    margin: .5rem 0;
    padding: 1rem 1.2rem;
    background: #ffffff;
    overflow: hidden;
  }
  .user-info .user-avatar {
    float: left;
    width: 4rem;
    height: 4rem;
  }
  .user-info .user-avatar img {
    width: 100%;
    height: 4rem;
  }
  .user-info .user-name {
    float: left;
    margin-left: 1rem;
    font-size: 16px;
    color: #333;
  }
  .user-info .user-name .user-mobile {
    color: #999;
    font-size: 14px;
  }
  .user-info .user-code {
    float: right;
    width: 4rem;
    height: 4rem;
    text-align: center;
    line-height: 4.5rem;
  }
  .user-info .user-code i {
    font-size: 30px;
    color: #999;
  }
  .user-wallet {
    margin: 1rem 0;
    padding: 1.2rem 1.6rem;
    background: #fff;
  }
  .user-wallet span {
    color: #333;
  }
  .other {
    padding : 0 1.6rem;
    margin: 1rem 0;
    background: #fff;
  }
  .other .other-item {
    position: relative;
    padding: 1rem 0;
  }
  .other .other-item:after {
    display: block;
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 0;
    border-top: 1px solid #ccc;
    -webkit-transform: scaleY(0.5);
    -ms-transform: scaleY(.5);
    -o-transform: scaleY(.5);
    transform: scaleY(.5);
  }
  .other .other-item:last-child:after {
    border: none;
  }
  .edit-pw {
    margin: 1rem 0;
    padding: 1rem 1.6rem;
    background: #fff;
  }
  .qrcode {
    text-align: center;
  }
</style>
