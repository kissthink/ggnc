<template>
  <div class="detail-wrap">
    <h4 class="h4-title">养鸡明细</h4>
    <back-history></back-history>

    <div class="chicken-list">
      <div class="row mb-2">
        <div class="col-6">在养鸡： {{asset.inHennery}}</div>
        <div class="col-6">在孵蛋： {{asset.hatchingEgg}}</div>
      </div>
      <div class="row mb-2">
        <div class="col-6">已售鸡： {{userProfit.chickenNumber}}</div>
        <div class="col-6">已售蛋： {{userProfit.eggNumber}}</div>
      </div>
      <div class="row mb-2">
        <div class="col-12">售鸡盈利余额： {{userProfit.chickenProfit}}</div>
      </div>
      <div class="row mb-2">
        <div class="col-12">售蛋盈利余额： {{userProfit.eggProfit}}</div>
      </div>
      <div class="row mb-2">
        <div class="col-12">商品鸡： {{asset.commodityChicken}}</div>
      </div>
      <div class="row">
        <div class="col-12">商品蛋： {{asset.commodityEgg}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import clientService from '@/assets/js/clientService'
export default {
  name: 'ChickenDetail',
  data () {
    return {
      asset: '',
      userProfit: {}
    }
  },
  methods: {
    getChickenDetail () {
      this.asset = JSON.parse(this.$route.query.asset)
    },
    getUserProfit () {
      clientService.getUserProfit().then(res => {
        this.userProfit = res
      })
    }
  },
  mounted () {
    this.getChickenDetail()
    this.getUserProfit()
  }
}
</script>

<style>
  .detail-wrap {
    padding: 56px 1rem 0;
    font-size: 14px;
  }
  .chicken-list {
    margin-top: 1.5rem;
    padding: 2.5rem 1.5rem;
    background: #fff;
    border-radius: 5px;
  }
</style>
