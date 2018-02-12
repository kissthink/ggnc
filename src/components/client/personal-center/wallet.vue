<template>
  <div class="wallet-wrap">
    <h4 class="h4-title">钱包</h4>
    <back-history></back-history>

    <div class="wallet">
      <div class="top-up">充值</div>
      <div class="balance">余额：{{userAsset.balance}}</div>
      <div class="withdrawal">提现</div>
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
    height: 100vh;
    font-size: 14px;
  }
  .wallet {
    padding: 2rem;
    height: 100%;
    text-align: center;
    color: #fff;
  }
  .wallet > div {
    margin: 0 auto 1.5rem;
    width: 14rem;
    height: 14rem;
    line-height: 14rem;
    border-radius: 50%;
    box-shadow: 0 0 3rem rgba(0, 0, 0, .7);
  }
  .balance {
    width: 14rem;
    height: 14rem;
    line-height: 14rem;
    background: #343a40;
    border-radius: 50%;
  }
  .top-up {
    width: 100%;
    height: 50%;
    background: #17a2b8;
  }
  .withdrawal {
    width: 100%;
    height: 50%;
    background: #20c997;
  }
</style>
