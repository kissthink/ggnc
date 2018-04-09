<template>
  <div>
    <h4 class="h4-title">市场</h4>

    <div class="tab-wrap">
      <el-tabs value="supply" @tab-click="handleClick($event)">
        <el-tab-pane label="市场供应" name="supply">
          <table class="table table-hover">
            <thead class="table-active">
              <th>时间</th>
              <th>昵称</th>
              <th>商品</th>
              <th>成交数/总数</th>
              <th>状态</th>
            </thead>
            <tbody v-if="supply.length > 0">
              <tr v-for="order of supply" :key="order.id">
                <td>{{order.createTime | transformTime}}</td>
                <td class="nick-name">{{order.user.nickName}}</td>
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
              <th>昵称</th>
              <th>商品</th>
              <th>成交数/总数</th>
              <th>状态</th>
            </thead>
            <tbody v-if="demand.length > 0">
              <tr v-for="order of demand" :key="order.id">
                <td>{{order.createTime | transformTime}}</td>
                <td class="nick-name">{{order.user.nickName}}</td>
                <td>{{order.commodity.name}}</td>
                <td>{{order.traded}}/{{order.total}}</td>
                <td>{{order.status | orderStatus}}</td>
              </tr>
            </tbody>
            <tbody v-if="isActive">
              <tr v-for="order of mockDemand" :key="order.id">
                <td>{{order.createTime | transformTime}}</td>
                <td class="nick-name">{{order.nickName}}</td>
                <td>{{order.commodityName}}</td>
                <td>{{order.traded}}/{{order.total}}</td>
                <td>{{order.status | orderStatus}}</td>
              </tr>
            </tbody>
          </table>

          <b-pagination v-if="isActive" size="lg"
                        align="center" :total-rows="100"
                        v-model="currentPage" :per-page="20"></b-pagination>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import clientService from '@/assets/js/clientService'
import { list as orderList } from '@/assets/js/mockDemandOrder'
export default {
  name: 'Market',
  data () {
    return {
      supply: [],
      demand: [],
      mockDemand: [],
      isActive: false,
      currentPage: 1
    }
  },
  methods: {
    getOrderDemand () {
      clientService.orderDemand().then(res => {
        this.demand = res.demand
        this.isActive = res.active
        if (res.demand.length < 20) {
          orderList.length = 20 - res.demand.length
          this.mockDemand = orderList
        } else {
          this.demand.length = 20
        }
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

<style scoped>
  td {
    width: auto;
  }
  .tab-wrap {
    padding: 1rem;
    font-size: 12px;
  }
  .nick-name {
    font-size: 12px;
  }
</style>
