<template>
  <div class="wallet-wrap">
    <h4 class="h4-title">钱包</h4>
    <back-history></back-history>

    <div class="wallet">
      <div class="balance">
        <p>余额：{{userAsset.balance}}</p>
        <p>银票：{{userAsset.tael}}</p>
      </div>
      <div class="wallet-btn">
        <div class="wallet-btn-item" @click.stop="toTatgetRouter('/topUp')">充值</div>
        <div class="wallet-btn-item" @click.stop="toTatgetRouter('/withDraw')">提现</div>
        <div class="wallet-btn-item" @click.stop="toTatgetRouter('/transfer-account')">转账</div>
        <div class="wallet-btn-item" @click.stop="toTatgetRouter('/bill')">账单</div>
        <div class="wallet-btn-item" @click="transformBalance()">银票转余额</div>
      </div>
    </div>

    <b-modal ref="transformBalance" title="银票转余额" ok-title="确定"
             centered cancel-title="取消"
             @ok="saveTransformBalance()">
      <label>
        转换额度:
        <el-input v-model="transformBalanceObj.amount" class="text-center" type="number"></el-input>
      </label>
      <label>
        交易密码:
        <el-input v-model="transformBalanceObj.payPassword" class="text-center" type="password"></el-input>
      </label>
    </b-modal>
  </div>
</template>

<script>
import clientService from '@/assets/js/clientService'
import util from '@/assets/js/util'
export default {
  name: 'Wallet',
  data () {
    return {
      userId: '',
      userAsset: {},
      transformBalanceObj: {
        amount: '',
        payPassword: ''
      }
    }
  },
  methods: {
    getUserAsset () {
      this.userId = JSON.parse(this.$route.query.userId)
      clientService.getUserInfo(this.userId).then(res => {
        this.userAsset = res.asset
      })
    },
    toTatgetRouter (url) {
      this.$router.push(url)
    },
    transformBalance () {
      this.$refs.transformBalance.show()
    },
    saveTransformBalance () {
      if (!util.regAmount(this.transformBalanceObj.amount)) {
        this.$message({message: '请输入正确的额度', type: 'error'})
        return
      }
      if (!this.transformBalanceObj.payPassword === '') {
        this.$message({message: '请输入交易密码', type: 'error'})
        return
      }
      this.transformBalanceObj.payPassword = util.sh2(this.transformBalanceObj.payPassword)
      clientService.taelConvertBalance(this.transformBalanceObj).then(res => {
        if (res.status === 200) {
          this.$message({message: '转换成功', type: 'success'})
          this.getUserAsset()
        } else {
          this.transformBalanceObj.payPassword = ''
          this.$message({message: res.message, type: 'error'})
        }
      })
    }
  },
  mounted () {
    this.getUserAsset()
  }
}
</script>

<style>
  .wallet-wrap {
    padding: 56px 1rem 0;
    font-size: 14px;
  }
  .balance {
    margin: 1rem 0;
    padding: 3rem 0;
    width: 100%;
    text-align: center;
    border-radius: 5px;
    background: #17a2b8;
    color: #fff;
    font-size: 20px;
    user-select: none;
  }
  .wallet-btn {
    margin: 1rem;
    overflow: hidden;
  }
  .wallet-btn-item {
    float: left;
    margin: 0 4% 4% 0;
    width: 48%;
    height: 15rem;
    line-height: 15rem;
    background: #007bff;
    color: #fff;
    text-align: center;
    border-radius: 5px;
    font-size: 16px;
    user-select: none;
  }
  .wallet-btn-item:nth-child(even) {
    margin-right: 0;
  }
</style>
