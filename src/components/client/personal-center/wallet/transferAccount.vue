<template>
  <div class="transfer-account">
    <h4 class="h4-title">转账</h4>
    <back-history></back-history>

    <div class="mt-4 mb-4">
      <el-input placeholder="请输入对方的手机号码" v-model="transferObj.mobile">
        <template slot="prepend">手机</template>
      </el-input>
      <small v-if="isShowMobileMessage">请输入正确的手机号码</small>
    </div>

    <div class="mt-4 mb-4">
      <el-input placeholder="请输入转账金额" v-model="transferObj.amount">
        <template slot="prepend">金额</template>
      </el-input>
      <small v-if="isShowPayPasswordMessage">请输入正确的金额</small>
    </div>

    <button class="btn btn-primary btn-lg btn-block" @click="showModel()">下一步</button>

    <div class="mask" v-if="isTransfer">
      <div class="mask-icon">
        <i class="fas fa-redo fa-spin"></i>
      </div>
    </div>

    <b-modal ref="password" title="请输入交易密码" ok-title="确定" centered cancel-title="取消" @ok="transferAmount()">
      <el-input v-model="transferObj.payPassword" class="text-center" type="password"></el-input>
    </b-modal>
  </div>
</template>

<script>
import util from '@/assets/js/util'
import clientService from '@/assets/js/clientService'
export default {
  name: 'TransferAccount',
  data () {
    return {
      isShowMobileMessage: false,
      isShowPayPasswordMessage: false,
      isTransfer: false,
      transferObj: {
        mobile: '',
        amount: '',
        payPassword: '',
        remark: ''
      }
    }
  },
  methods: {
    showModel () {
      this.isShowMobileMessage = false
      this.isShowPayPasswordMessage = false
      if (!util.regMobile(this.transferObj.mobile)) {
        this.isShowMobileMessage = true
        return
      }
      if (!util.regAmount(this.transferObj.amount)) {
        this.isShowPayPasswordMessage = true
        return
      }
      this.$refs.password.show()
    },
    transferAmount () {
      this.isTransfer = true
      this.transferObj.payPassword = util.sh2(this.transferObj.payPassword)
      clientService.userTransfer(this.transferObj).then(res => {
        this.isTransfer = false
        if (res.status === 200) {
          this.$message({message: '转账成功', type: 'success'})
          window.history.back()
        } else {
          this.$message({message: res.message, type: 'error'})
          this.transferObj.payPassword = ''
        }
      })
    }
  }
}
</script>

<style>
  .transfer-account {
    padding: 56px 1rem 1rem;
  }
  .transfer-account small {
    color: #dc3545;
  }
  .mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    line-height: 1.5;
    text-align: center;
    background: rgba(0, 0, 0, .5);
    font-size: 60px;
    color: rgba(255, 255, 255, .8);
    z-index: 1001;
  }
  .mask .mask-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
