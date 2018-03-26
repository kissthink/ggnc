<template>
  <div>
    <h4 class="admin-title">已匹配列表</h4>

    <div>
      <table class="table table-hover">
        <thead class="table-active">
          <th>ID</th>
          <th>日期</th>
          <th>充值方</th>
          <th>提现方</th>
          <th>充值方式</th>
          <th>金额</th>
          <th>状态</th>
          <th>查看凭证</th>
          <th>操作</th>
        </thead>
        <tbody v-if="ordersList.length > 0">
          <tr v-for="order of ordersList" :key="order.id">
            <td>{{order.id}}</td>
            <td>{{order.createTime | transformTime}}</td>
            <td>
              {{order.topUp.user.nickName}}
              ({{order.topUp.user.mobile}})
            </td>
            <td>
              {{order.withdraw.user.nickName}}
              ({{order.withdraw.user.mobile}})
            </td>
            <td>{{order.type | transformPayMethod}}</td>
            <td>{{order.amount}}</td>
            <td>{{order.status | transformMatchOrderType}}</td>
            <td>
              <button class="btn btn-primary btn-sm" v-if="order.credential" @click="viewCredential(order)">查看凭证</button>
            </td>
            <td>
              <button class="btn btn-info btn-sm"
                      v-if="order.status === 1"
                      @click="topUpPass(order)">完成充值</button>
              <button class="btn btn-warning btn-sm"
                      v-if="order.status === 2"
                      @click="completeMatch(order)">完成订单</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <el-dialog title="付款凭证" :visible.sync="dialogVisible">
      <img :src="credentialUrl" style="width: 100%">

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import adminService from '@/assets/js/adminService'
import axios from 'axios'
export default {
  name: 'MatchedordersList',
  data () {
    return {
      ordersList: [],
      dialogVisible: false,
      credentialUrl: ''
    }
  },
  methods: {
    getMatchedOrdersList () {
      adminService.getMatchedList().then(res => {
        this.ordersList = res
      })
    },
    topUpPass (order) {
      this.$confirm('确认充值已到账？').then(_ => {
        adminService.topUpPass(order).then(_ => {
          this.getMatchedOrdersList()
        })
      })
    },
    completeMatch (order) {
      this.$confirm('确认完成此订单？').then(_ => {
        adminService.completeMatch(order).then(_ => {
          this.getMatchedOrdersList()
        })
      })
    },
    viewCredential (order) {
      this.credentialUrl = axios.defaults.baseURL.slice(0, -1) + order.credential
      this.dialogVisible = true
    }
  },
  created () {
    this.getMatchedOrdersList()
  }
}
</script>

<style>

</style>
