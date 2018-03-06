<template>
  <div>
    <h4 class="h4-title">市场</h4>

    <div class="tab-wrap">
      <el-tabs value="supply" @tab-click="handleClick($event)">
        <el-tab-pane label="市场供应" name="supply">
          <table class="table table-hover">
            <thead class="table-active">
              <th>时间</th>
              <th>商品</th>
              <th>成交数/总数</th>
              <th>状态</th>
            </thead>
            <tbody v-if="supply.length > 0">
              <tr v-for="order of supply" :key="order.id">
                <td>{{order.createTime | transformTime}}</td>
                <td>{{order.commodity.name}}</td>
                <td>{{order.traded}}/{{order.total}}</td>
                <td>{{order.status | orderStatus}}</td>
              </tr>
            </tbody>
          </table>
        </el-tab-pane>
        <el-tab-pane label="市场需求" name="demand">
          <table class="table table-hover">
            <thead class="table-active">
              <th>时间</th>
              <th>商品</th>
              <th>成交数/总数</th>
              <th>状态</th>
            </thead>
            <tbody v-if="demand.length > 0">
              <tr v-for="order of demand" :key="order.id">
                <td>{{order.createTime | transformTime}}</td>
                <td>{{order.commodity.name}}</td>
                <td>{{order.traded}}/{{order.total}}</td>
                <td>{{order.status | orderStatus}}</td>
              </tr>
            </tbody>
          </table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import clientService from '@/assets/js/clientService'
export default {
  name: 'Market',
  data () {
    return {
      supply: [],
      demand: []
    }
  },
  methods: {
    getOrderDemand () {
      clientService.orderDemand().then(res => {
        this.demand = res
      })
    },
    getOrderSupply () {
      clientService.orderSupply().then(res => {
        this.supply = res
      })
    },
    handleClick (tab) {
      if (tab.name === 'supply') {
        this.getOrderSupply()
      } else {
        this.getOrderDemand()
      }
    }
  },
  mounted () {
    this.getOrderSupply()
  }
}
</script>

<style>
  .tab-wrap {
    padding: 1rem;
  }
</style>
