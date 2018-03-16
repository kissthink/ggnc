<template>
  <div>
    <h4 class="admin-title">平台收益</h4>

    <p>总收益金额：<span>{{profit}}</span></p>
  </div>
</template>

<script>
import adminService from '@/assets/js/adminService'
export default {
  name: 'Profit',
  data () {
    return {
      profit: ''
    }
  },
  methods: {
    getPlatformProfit () {
      adminService.getPlatformProfit().then(res => {
        this.profit = res
      })
    }
  },
  created () {
    this.getPlatformProfit()
  }
}
</script>

<style scoped>

</style>
