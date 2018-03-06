<template>
  <div class="harvest">
    <h4 class="h4-title">收获记录</h4>
    <back-history></back-history>

    <div class="harvest-list">
      <div class="harvest-item" v-for="harvest of harvestList" :key="harvest.id">
        <div class="harvest-time">
          <span>开始时间：{{harvest.startDate | transformTime}}</span>
          <span>结束时间：{{harvest.endDate | transformTime}}</span>
        </div>
        <div class="harvest-content">
          <span>养鸡数：{{harvest.total}}</span>
          <span>收获数：{{harvest.gain}}</span>
          <span>损失数：{{harvest.loss}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import clientService from '@/assets/js/clientService'
export default {
  name: 'HarvestList',
  data () {
    return {
      harvestList: []
    }
  },
  methods: {
    getHarvestList () {
      clientService.getHarvestList().then(res => {
        this.harvestList = res
      })
    }
  },
  created () {
    this.getHarvestList()
  }
}
</script>

<style>
  .harvest {
    padding: 56px 0 0;
  }
  .harvest-list {
    padding: 1rem;
  }
  .harvest-item {
    margin-bottom: 1rem;
    padding: .5rem;
    font-size: 0;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  .harvest-time {
     margin-bottom: .5rem;
  }
  .harvest-time > span,
  .harvest-content > span {
    display: inline-block;
    width: 50%;
    font-size: 14px;
  }
  .harvest-content > span {
    width: 33.33%;
  }
</style>
