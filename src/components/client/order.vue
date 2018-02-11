<template>
  <div>
    <h4 class="h4-title">我的订单</h4>
  </div>
</template>

<script>
import tokenService from '@/assets/js/tokenService'
import clientService from '@/assets/js/clientService'
export default {
  name: 'Order',
  data () {
    return {}
  },
  methods: {
    getOrderList () {
      let userId = tokenService.decodeToken().id
      clientService.getOrderList(userId).then(res => {
        console.log(res)
      })
    }
  },
  created () {
    this.getOrderList()
  }
}
</script>

<style>

</style>
