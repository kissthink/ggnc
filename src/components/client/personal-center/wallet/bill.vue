<template>
  <div class="bill">
    <h4 class="h4-title">账单</h4>
    <back-history></back-history>

    <div class="record-tab">
      <el-tabs @tab-click="selectTab($event)" v-model="defaultTab">
        <el-tab-pane label="转账记录" name="transfer">
          <div class="transfer-wrap" v-if="transferRecord.length > 0">
            <div class="transfer-item" v-for="item of transferRecord" :key="item.id">
              <div class="name">{{displayOtherName(item)}}</div>
              <div class="time">{{item.createTime | tansfromToTime}}</div>
              <span class="amount">
                <span>{{displayAmountIcon(item)}}</span>
                {{item.amount}}
              </span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="充值记录" name="topUp">
          <table class="table table-hover">
            <thead class="table-active">
              <th>日期</th>
              <th>金额</th>
              <th>支付方式</th>
              <th>状态</th>
            </thead>
            <tbody v-if="topUpRecord.length > 0">
              <tr v-for="item of topUpRecord" :key="item.id">
                <td>{{item.createTime | transformTime}}</td>
                <td>{{item.amount}}</td>
                <td>{{item.type | transformPayMethod}}</td>
                <td>{{item.status | transformBillStatus}}</td>
              </tr>
            </tbody>
          </table>
        </el-tab-pane>
        <el-tab-pane label="提现记录" name="withdraw">
          <table class="table table-hover">
            <thead class="table-active">
              <th>日期</th>
              <th>金额</th>
              <th>支付方式</th>
              <th>状态</th>
            </thead>
            <tbody v-if="withDrawRecord.length > 0">
              <tr v-for="item of withDrawRecord" :key="item.id">
                <td>{{item.createTime | transformTime}}</td>
                <td>{{item.amount}}</td>
                <td>{{item.type | transformPayMethod}}</td>
                <td>{{item.status | transformBillStatus}}</td>
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
import tokenService from '@/assets/js/tokenService'
export default {
  name: 'Bill',
  data () {
    return {
      defaultTab: 'transfer',
      transferRecord: [],
      topUpRecord: [],
      withDrawRecord: [],
      userId: tokenService.decodeToken().id
    }
  },
  methods: {
    getUserTransferRecord () {
      clientService.getTransferRecord().then(res => {
        this.transferRecord = res
      })
    },
    getUserTopUpRecord () {
      clientService.getUserTopUpRecord().then(res => {
        this.topUpRecord = res
      })
    },
    getUserWithDrawRecord () {
      clientService.getUserWithDrawRecord().then(res => {
        this.withDrawRecord = res
      })
    },
    selectTab (val) {
      switch (val.name) {
        case 'transfer':
          this.getUserTransferRecord()
          break
        case 'topUp':
          this.getUserTopUpRecord()
          break
        case 'withdraw':
          this.getUserWithDrawRecord()
          break
      }
    },
    judgeUserId (id) {
      return id === this.userId
    },
    displayOtherName (record) {
      if (this.judgeUserId(record.expense.id)) {
        return record.income.nickName
      } else {
        return record.expense.nickName
      }
    },
    displayAmountIcon (record) {
      return this.judgeUserId(record.expense.id) ? '-' : '+'
    }
  },
  created () {
    this.getUserTransferRecord()
  }
}
</script>

<style scoped>
  .bill {
    padding: 56px 0 0 0;
    font-size: 14px;
  }
  .record-tab {
    padding: 1rem;
  }
  .transfer-item {
    position: relative;
    padding: 15px;
    background: #fff;
    border-bottom: 1px solid #ccc;
    font-size: 14px;
  }
  .transfer-item:last-child {
    border: none;
  }
  .transfer-item .time {
    margin-top: 5px;
    font-size: 12px;
    color: #666;
  }
  .transfer-item .amount {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 16px;
    font-weight: bold;
    color: #000;
  }
</style>
