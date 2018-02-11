<template>
  <div class="real-name">
    <h4 class="h4-title">实名认证</h4>
    <back-history></back-history>

    <div class="form-wrap">
      <b-form>
        <b-form-group id="realName"
                    label="真实姓名："
                    label-for="realName">
          <b-form-input id="realName" size="lg" type="text" v-model="real.realName"></b-form-input>
        </b-form-group>

        <b-form-group id="idCard"
                    label="身份证号码："
                    label-for="idCard">
          <b-form-input id="idCard" size="lg" type="text" v-model="real.idCard"></b-form-input>
        </b-form-group>

        <b-form-group id="region"
                    label="地区："
                    label-for="region">
          <b-form-input id="region" size="lg" type="text" v-model="real.region"></b-form-input>
        </b-form-group>

        <b-form-group id="wechatWithdrawCode"
                    label="微信收款码："
                    label-for="wechatWithdrawCode">
          <b-form-file v-model="selectWechatWithdrawCode" accept=".jpg, .png, .gif"
                       placeholder="选择微信收款码"></b-form-file>
        </b-form-group>

        <b-form-group id="alipayWithdrawCode"
                    label="支付宝收款码："
                    label-for="alipayWithdrawCode">
          <b-form-file v-model="selectAlipayWithdrawCode" accept=".jpg, .png, .gif" placeholder="选择支付宝收款码"></b-form-file>
        </b-form-group>

        <button class="btn btn-info btn-block btn-lg mb-3 mt-4" @click.prevent="save()" :disabled="isSaving">
          保存<span v-if="isSaving">中...</span>
        </button>
        <button class="btn btn-default btn-lg btn-block" @click.prevent="cancelFrom()">取消</button>
      </b-form>
    </div>

    <b-modal v-model="modalShow" centered @ok="startSaveRealName()" ok-title="确定" cancel-title="取消">
      请仔细核实资料，上传后不能修改！
    </b-modal>
  </div>
</template>

<script>
import clientService from '@/assets/js/clientService'
// import util from '@/assets/js/util'
export default {
  name: 'RealName',
  data () {
    return {
      real: {
        userId: '',
        realName: '',
        idCard: '',
        region: '',
        wechatWithdrawCode: '',
        alipayWithdrawCode: ''
      },
      selectWechatWithdrawCode: '',
      selectAlipayWithdrawCode: '',
      modalShow: false,
      isSaving: false
    }
  },
  methods: {
    save () {
      this.modalShow = true
    },
    startSaveRealName () {
      // if (!this.regRealName()) {
      //   this.$message({message: '姓名和身份证号不能为空', type: 'error'})
      //   return
      // }
      // if (!util.regIdCard(this.real.idCard)) {
      //   this.$message({message: '请输入正确的身份证号', type: 'error'})
      //   return
      // }
      this.isSaving = true
      this.uploadWechatWithdrawCode()
    },
    uploadWechatWithdrawCode () {
      clientService.uploadPic(this.selectWechatWithdrawCode).then(res => {
        console.log(res)
        // if (res.status > 200) {
        //   this.$message({message: '微信收款码上传失败', type: 'error'})
        // } else {
        //   this.uploadAlipayWithdrawCode()
        // }
      })
    },
    uploadAlipayWithdrawCode () {
      clientService.uploadPic(this.selectAlipayWithdrawCode).then(res => {
        console.log(res)
        // if (res.status > 200) {
        //   this.$message({message: '支付宝收款码上传失败', type: 'error'})
        // } else {
        //   this.saveRealName()
        // }
      })
    },
    saveRealName () {
      clientService.saveUserInfo(this.real).then(res => {
        console.log(res)
      })
    },
    regRealName () {
      return this.real.realName === '' && this.real.idCard === ''
    },
    cancelFrom () {
      this.$router.push('/my/information')
    }
  },
  mounted () {
    this.real.userId = this.$route.query.userId
  }
}
</script>

<style>
  .real-name {
    margin-top: 2rem;
    padding: 56px 1.5rem 0;
    font-size: 14px;
  }
</style>
