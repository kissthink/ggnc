<template>
  <div class="top-up">
    <h4 class="h4-title">账号充值</h4>
    <back-history></back-history>

    <div class="amount">
      <p>请选择充值金额:</p>
      <div class="amount-item">
        <client-amount-select v-on:selectAmount="selectTopUpAmount($event)"></client-amount-select>
      </div>
      <button class="btn btn-info btn-lg btn-block" @click="confirmAmount()">下一步</button>
    </div>

    <div class="mask" v-if="isTopUp">
      <div class="mask-icon">
        <i class="fas fa-redo fa-spin"></i>
      </div>
    </div>

    <b-modal ref="password" title="请输入交易密码" ok-title="确定" centered cancel-title="取消" @ok="saveUserTopUp()">
      <el-input v-model="topUpObj.payPassword" class="text-center" type="password"></el-input>
    </b-modal>
  </div>
</template>

<script>
import clientService from '@/assets/js/clientService'
import util from '@/assets/js/util'
export default {
  name: 'TopUp',
  data () {
    return {
      topUpObj: {
        amount: '',
        payPassword: ''
      },
      isTopUp: false
    }
  },
  methods: {
    selectTopUpAmount (amount) {
      this.topUpObj.amount = amount
    },
    confirmAmount () {
      this.$refs.password.show()
    },
    saveUserTopUp () {
      this.topUpObj.payPassword = util.sh2(this.topUpObj.payPassword)
      this.isTopUp = true
      clientService.userTopUp(this.topUpObj).then(res => {
        this.isTopUp = false
        if (res.status === 200) {
          window.history.back()
          this.$message({message: '申请充值成功', type: 'success'})
        } else {
          this.topUpObj.payPassword = ''
          this.$message({message: res.message, type: 'error'})
        }
      })
    }
  }
}
</script>

<style scoped>
  .top-up {
    padding-top: 56px;
  }
  .amount {
    margin-top: 1rem;
    padding: 1rem;
  }
  .amount p {
    color: #dc3545;
    font-size: 14px;
  }
  .amount .amount-item {
    padding: 1rem 0;
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
