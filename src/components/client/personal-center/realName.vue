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

        <b-form-group id="alipayAccount"
                    label="支付宝账号 ："
                    label-for="alipayAccount">
          <b-form-input id="alipayAccount" size="lg" type="text" v-model="real.alipayAccount"  placeholder="用于提现"></b-form-input>
        </b-form-group>

        <b-form-group id="alipayWithdrawCode"
                    label="支付宝收款码："
                    label-for="alipayWithdrawCode">
          <b-form-file v-model="selectAlipayWithdrawCode" accept=".jpg, .png, .gif" placeholder="选择支付宝收款码"></b-form-file>
          <small v-if="isShowAliPayCodeMeg">支付宝付款码图片大小超出限制</small>
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
import util from '@/assets/js/util'
export default {
  name: 'RealName',
  data () {
    return {
      real: {
        userId: '',
        realName: '',
        idCard: '',
        alipayAccount: '',
        wechatWithdrawCode: null,
        alipayWithdrawCode: null
      },
      selectWechatWithdrawCode: '',
      selectAlipayWithdrawCode: '',
      isShowWechatCodeMeg: false,
      isShowAliPayCodeMeg: false,
      modalShow: false,
      isSaving: false
    }
  },
  watch: {
    selectAlipayWithdrawCode () {
      if (this.selectAlipayWithdrawCode.size > 1024 * 1024) {
        this.isShowAliPayCodeMeg = true
      } else {
        this.isShowAliPayCodeMeg = false
      }
    }
  },
  methods: {
    save () {
      if (this.regRealName()) {
        this.$message({message: '姓名和身份证号不能为空', type: 'error'})
        return
      }
      if (!util.regIdCard(this.real.idCard)) {
        this.$message({message: '请输入正确的身份证号', type: 'error'})
        return
      }
      if (this.real.alipayAccount === '') {
        this.$message({message: '请输入支付宝账号', type: 'error'})
        return
      }
      if (this.isShowAliPayCodeMeg) {
        return
      }
      this.modalShow = true
    },
    startSaveRealName () {
      this.isSaving = true
      this.uploadAlipayWithdrawCode()
    },
    uploadAlipayWithdrawCode () {
      if (this.selectAlipayWithdrawCode) {
        clientService.uploadPic(this.selectAlipayWithdrawCode).then(res => {
          if (res.status > 200) {
            this.$message({message: '支付宝收款码上传失败', type: 'error'})
            this.isSaving = false
          } else {
            this.real.alipayWithdrawCode = res.data.filePath
            this.saveRealName()
          }
        })
      } else {
        this.saveRealName()
      }
    },
    saveRealName () {
      if (!this.selectAlipayWithdrawCode) {
        this.$message({message: '请上传一种收款码', type: 'error'})
        this.isSaving = false
        return
      }
      this.isSaving = true
      clientService.saveUserInfo(this.real).then(res => {
        this.isSaving = false
        if (res.status > 200) {
          this.$message({message: res.message, type: 'error'})
        } else {
          this.$message({message: '认证成功', type: 'success'})
          this.$router.push('/my')
        }
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
