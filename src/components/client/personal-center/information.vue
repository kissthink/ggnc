<template>
  <div  class="information-wrap">
    <h4 class="h4-title">个人信息</h4>

    <div class="user-info" @click="toTargetRouter('/personalData')">
      <div class="user-avatar">
        <img src="../../../assets/img/wallhaven-603537.jpg" alt="wallhaven-603537">
      </div>
      <div class="user-name">
        <p>养鸡专业户</p>
        <p class="user-mobile">手机号: 13800138000</p>
      </div>
      <div class="user-code" @click.stop="showCodePic()">
        <i class="fas fa-qrcode"></i>
      </div>
    </div>

    <div class="user-wallet" @click="toTargetRouter('/wallet')">
      <div class="icon">
        <i class="fab fa-trello"></i>
      </div>
      <span>钱包</span>
    </div>

    <div class="other" @click.stop="toTargetRouter('/new-mamber')">
      <div class="other-item">
        <div class="icon">
          <i class="fas fa-male"></i>
        </div>
        <span>注册新会员</span>
      </div>

      <div class="other-item" @click.stop="toTargetRouter('/mt-team')">
        <div class="icon">
          <i class="fas fa-users"></i>
        </div>
        <span>我的团队</span>
      </div>

      <div class="other-item" @click.stop="toTargetRouter('/chicken-detail')">
        <div class="icon">
          <i class="fas fa-chart-pie"></i>
        </div>
        <span>养鸡明细</span>
      </div>

      <div class="other-item" @click.stop="toTargetRouter('/notice')">
        <div class="icon">
          <i class="fas fa-bullhorn"></i>
        </div>
        <span>系统公告</span>
      </div>
    </div>

    <div class="edit-pw" @click="toTargetRouter('/edit-password')">
      <div class="icon">
        <i class="fas fa-lock"></i>
      </div>
      <span>修改密码</span>
    </div>

    <b-modal ref="codePic" hide-footer title="我的二维码">
      <qrcode-vue :value="codeUrl" :size="codeSize" level="H" className="qrcode"></qrcode-vue>
    </b-modal>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'

export default {
  name: 'Information',
  components: {
    QrcodeVue
  },
  data () {
    return {
      codeUrl: `http://172.168.1.16:8080/new-mamber`,
      codeSize: 300
    }
  },
  computed: {

  },
  methods: {
    toTargetRouter (url) {
      this.$router.push(url)
    },
    showCodePic () {
      this.$refs.codePic.show()
    }
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
