<template>
  <div class="hatched">
    <h4 class="h4-title">孵化记录</h4>
    <back-history></back-history>

    <div class="hatched-list">
      <div class="hatched-item" v-for="hatched of hatcheds" :key="hatched.id">
        <div class="hatched-time">
          <span>开始时间：{{hatched.startDate | transformTime}}</span>
          <span>结束时间：{{hatched.endDate | transformTime}}</span>
        </div>
        <div class="hatched-content">
          <span>孵蛋数：{{hatched.total}}</span>
          <span>收获数：{{hatched.gain}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import clientService from '@/assets/js/clientService'
export default {
  name: 'Hatched',
  data () {
    return {
      hatcheds: []
    }
  },
  methods: {
    getHatched () {
      let id = this.$route.query.userId
      if (id > 0) {
        clientService.getHatched(id).then(res => {
          this.hatcheds = res
        })
      }
    }
  },
  mounted () {
    this.getHatched()
  }
}
</script>

<style>
  .hatched {
    padding: 56px 0 0;
  }
  .hatched-list {
    padding: 1rem;
  }
  .hatched-item {
    margin-bottom: 1rem;
    padding: .5rem;
    font-size: 0;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  .hatched-time > span,
  .hatched-content > span {
    display: inline-block;
    width: 50%;
    font-size: 14px;
  }
</style>
