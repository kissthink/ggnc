<template>
  <div class="inviting-new-menber">
    <h4 class="h4-title">邀请新会员</h4>
    <back-history></back-history>

    <div class="qrcode-vue">
      <qrcode-vue :value="codeUrl" :size="codeSize" level="L" className="qrcode"></qrcode-vue>
      <small>Tip: 扫描二维码进入注册页面</small>
    </div>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import axios from 'axios'
import clientService from '@/assets/js/clientService'
export default {
  name: 'InvitingNewMember',
  components: {
    QrcodeVue
  },
  data () {
    return {
      baseUrl: axios.defaults.baseURL,
      codeUrl: '',
      codeSize: 218
    }
  },
  methods: {
    getUserDetail () {
      let id = +this.$route.query.userId
      clientService.getUserInfo(id).then(res => {
        this.codeUrl = `${this.baseUrl}new-mamber?masterId=${id}&masterName=${encodeURI(res.nickName)}`
      })
    }
  },
  mounted () {
    this.getUserDetail()
  }
}
</script>

<style>
  .inviting-new-menber {
    padding: 56px 0 0;
  }
  .qrcode-vue {
    margin: 3rem auto;
    text-align: center;
  }
</style>
