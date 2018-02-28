<template>
  <div class="orders">
    <h4 class="h4-title">我的订单</h4>

    <div class="order-list">
      <div class="order-list-header">
        <span class="order-time">时间</span>
        <span>商品</span>
        <span>类型</span>
        <span>总数</span>
        <span>成交数</span>
      </div>
      <div class="order-list-content" v-if="orders.length > 0">
        <div class="order-list-item" v-for="order of orders" :key="order.id">
          <span class="order-time">{{order.createTime | transformTime}}</span>
          <span>{{order.commodity.name}}</span>
          <span>{{order.type | businessType}}</span>
          <span>{{order.total}}</span>
          <span>{{order.traded}}</span>
        </div>
      </div>
      <div class="order-list-tip" v-if="orders.length == 0">没有订单数据</div>
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
    margin: 1rem;
    padding: 4rem 1rem 1rem;
    max-height: 53.9rem;
    background: #fff;
    position: relative;
    overflow: scroll;
  }
  .order-list .order-list-header {
    position: absolute;
    top: 0;
    left: .5rem;
    right: .5rem;
    font-size: 0;
    border-bottom: 1px solid #ccc;
  }
  .order-list .order-list-item {
    font-size: 0;
  }
  .order-list .order-list-header span,
  .order-list .order-list-item span {
    display: inline-block;
    width: 17.5%;
    height: 3rem;
    line-height: 3rem;
    font-size: 14px;
    text-align: center;
  }
  .order-list .order-list-item span {
    font-size: 12px;
  }
  .order-list .order-list-header span.order-time,
  .order-list .order-list-item span.order-time {
    width: 30%;
  }
  .order-list .order-list-tip {
    text-align: center;
    font-size: 12px;
    color: #999;
  }
</style>
