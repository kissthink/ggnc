<template>
  <div class="orders">
    <h4 class="h4-title">我的订单</h4>

    <div class="order-list">
      <table class="table table-hover">
        <thead class="table-active">
          <th>时间</th>
          <th>商品</th>
          <th>类型</th>
          <th>成交数/总数</th>
          <th>状态</th>
        </thead>
        <tbody v-if="orders.length > 0">
          <tr v-for="order of orders" :key="order.id">
            <td>{{order.createTime | transformTime}}</td>
            <td>{{order.commodity.name}}</td>
            <td>{{order.type | businessType}}</td>
            <td>{{order.traded}}/{{order.total}}</td>
            <td>{{order.status | orderStatus}}</td>
          </tr>
          <tr v-if="orders.length === 0">
            <td colspan="5" class="text-center">没有订单数据</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import tokenService from '@/assets/js/tokenService'
import clientService from '@/assets/js/clientService'
export default {
  name: 'Order',
  data () {
    return {
      orders: []
    }
  },
  methods: {
    getOrderList () {
      let userId = tokenService.decodeToken().id
      clientService.getOrderList(userId).then(res => {
        this.orders = res
      })
    }
  },
  created () {
    this.getOrderList()
  }
}
</script>

<style>
  .order-list {
    padding: 1rem;
  }
</style>
