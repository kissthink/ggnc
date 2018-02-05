<template>
  <div class="detail-wrap">
    <h4 class="h4-title">养鸡明细</h4>
    <back-history></back-history>

    <div class="chicken-list">
      <div class="row mb-2">
        <div class="col-6">在养鸡： 35</div>
        <div class="col-6">在孵蛋： 106</div>
      </div>
      <div class="row mb-2">
        <div class="col-6">已售鸡： 70</div>
        <div class="col-6">已售蛋： 88</div>
      </div>
      <div class="row mb-2">
        <div class="col-12">售鸡盈利余额： 35000</div>
      </div>
      <div class="row mb-2">
        <div class="col-12">售蛋盈利余额： 13000</div>
      </div>
      <div class="row mb-2">
        <div class="col-12">商品鸡： 35000</div>
      </div>
      <div class="row">
        <div class="col-12">商品蛋： 35000</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChickenDetail',
  data () {
    return {}
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
