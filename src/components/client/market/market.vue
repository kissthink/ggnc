<template>
  <div>
    <h4 class="h4-title">市场</h4>
  </div>
</template>

<script>
import clientService from '@/assets/js/clientService'
export default {
  name: 'Market',
  date () {
    return {

    }
  },
  methods: {
    getOrderDemand () {
      clientService.orderDemand().then(res => {
        console.log(res)
      })
    },
    getOrderSupply () {
      clientService.orderSupply().then(res => {
        console.log(res)
      })
    }
  },
  created () {
    this.getOrderSupply()
    this.getOrderDemand()
  }
}
</script>

<style>

</style>
