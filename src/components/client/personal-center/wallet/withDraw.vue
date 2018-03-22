<template>
  <div class="withdraw">
    <h4 class="h4-title">账号提现</h4>
    <back-history></back-history>

    <div class="withdraw-form">
      <div class="mt-4 mb-4">
        <el-input placeholder="提现金额不能小于500" v-model="withdrawObj.amount">
          <template slot="prepend">提现金额</template>
        </el-input>
        <small v-if="isShowAmountMessage">请输入正确的金额</small>
      </div>

      <p>请选择支付方式:</p>
      <div class="amount-item">
        <pay-method-select v-on:selectPayMethod="selectPayType($event)"></pay-method-select>
      </div>
      <button class="btn btn-info btn-lg btn-block" @click="confirmAmount()">下一步</button>
    </div>

    <div class="mask" v-if="isWithdraw">
      <div class="mask-icon">
        <i class="fas fa-redo fa-spin"></i>
      </div>
    </div>

    <b-modal ref="password" title="请输入交易密码" ok-title="确定" centered cancel-title="取消" @ok="saveUserWithdraw()">
      <el-input v-model="withdrawObj.payPassword" class="text-center" type="password"></el-input>
    </b-modal>
  </div>
</template>

<script>
import PayMethodSelect from '../../../shared/PayMethodSelect'
import clientService from '@/assets/js/clientService'
import util from '@/assets/js/util'
export default {
  name: 'WithDraw',
  components: {
    'payMethodSelect': PayMethodSelect
  },
  data () {
    return {
      withdrawObj: {
        amount: '',
        payPassword: '',
        type: ''
      },
      isShowAmountMessage: false,
      isWithdraw: false
    }
  },
  methods: {
    selectPayType (type) {
      this.withdrawObj.type = type
    },
    confirmAmount () {
      if (!util.regAmount(this.withdrawObj.amount)) {
        this.isShowAmountMessage = true
        return
      }
      this.$refs.password.show()
    },
    saveUserWithdraw () {
      this.withdrawObj.payPassword = util.sh2(this.withdrawObj.payPassword)
      this.isWithdraw = true
      clientService.userWithDraw(this.withdrawObj).then(res => {
        this.isWithdraw = false
        if (res.status === 200) {
          window.history.back()
          this.$message({message: '申请提现成功', type: 'success'})
        } else {
          this.withdrawObj.payPassword = ''
          this.$message({message: res.message, type: 'error'})
        }
      })
    }
  }
}
</script>

<style scoped>
  .withdraw {
    padding: 56px 0 0 0;
  }
  .withdraw-form {
    padding: 1rem;
  }
  .withdraw-form p {
    margin-bottom: 1rem;
    color: #dc3545;
    font-size: 14px;
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
