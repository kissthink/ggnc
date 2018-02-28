<template>
  <div class="wallet-wrap">
    <h4 class="h4-title">钱包</h4>
    <back-history></back-history>

    <div class="wallet">
      <div class="balance">余额：{{userAsset.balance}}</div>
      <div>
        <button class="btn btn-primary btn-lg btn-block">充值</button>
        <button class="btn btn-primary btn-lg btn-block">提现</button>
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
  }
</style>
