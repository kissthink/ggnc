<template>
  <div class="wallet-wrap">
    <h4 class="h4-title">钱包</h4>
    <back-history></back-history>

    <div class="wallet">
      <div class="balance">余额：{{userAsset.balance}}</div>
      <div class="wallet-btn">
        <div class="wallet-btn-item" @click.stop="toTatgetRouter('/topUp')">充值</div>
        <div class="wallet-btn-item">提现</div>
        <div class="wallet-btn-item" @click.stop="toTatgetRouter('/transfer-account')">转账</div>
        <div class="wallet-btn-item">账单</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Wallet',
  data () {
    return {
      userId: '',
      userAsset: ''
    }
  },
  methods: {
    getUserAsset () {
      this.userAsset = JSON.parse(this.$route.query.asset)
      this.userId = JSON.parse(this.$route.query.userId)
    },
    toTatgetRouter (url) {
      this.$router.push(url)
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
    width: 100%;
    height: 10rem;
    line-height: 10rem;
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
