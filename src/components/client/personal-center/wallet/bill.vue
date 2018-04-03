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
              <tr v-for="item of topUpRecord" :key="item.id" @click="selectedTopUpRecord(item)">
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
              <tr v-for="item of withDrawRecord" :key="item.id" @click="selectedWithdrawRecord(item)">
                <td>{{item.createTime | transformTime}}</td>
                <td>{{item.amount}}</td>
                <td>{{item.type | transformPayMethod}}</td>
                <td>{{item.status | transformWithrawBillStatus}}</td>
              </tr>
            </tbody>
          </table>
        </el-tab-pane>
      </el-tabs>
    </div>

    <b-modal v-model="showTopUpConfrim" title="付款信息" ok-title="上传付款凭据" v-if="topupMessageShow"
             centered cancel-title="取消" @ok="uploadPayCode()" :hide-footer="!showConfirmTopUpButton">
      <p><img :src="topupimgShow" width="100%"></p>
      <p>支付宝账号：{{topupMessage.alipayAccount}}</p>
      <p>验证码：{{topupMessage.captcha}}</p>
      <small>请在付款备注中输入验证码</small>
    </b-modal>
    <b-modal ref="withdrawConfrim" title="确认收款" ok-title="确定"
             centered cancel-title="取消" @ok="saveWithdrawConfrim()">
      <label>
        输入验证码:
        <el-input v-model="withdrawConfrim" class="text-center" type="text"></el-input>
      </label>
    </b-modal>
  </div>
</template>

<script>
import clientService from '@/assets/js/clientService'
import tokenService from '@/assets/js/tokenService'
import axios from 'axios'
export default {
  name: 'Bill',
  data () {
    return {
      defaultTab: 'transfer',
      topUpFlag: true,
      transferRecord: [],
      topUpRecord: [],
      withDrawRecord: [],
      userId: tokenService.decodeToken().id,
      withdrawConfrim: '',
      withDrawRecordId: '',
      receiptCode: '',
      verificationCode: '',
      topUpRecordId: '',
      showReceiptCode: false,
      topupimgShow: false,
      showTopUpConfrim: false,
      baseUrl: axios.defaults.baseURL.slice(0, -1),
      topupMessage: {
        alipayAccount: '',
        withdrawCodeUrl: '',
        captcha: ''
      },
      topupMessageShow: true,
      showConfirmTopUpButton: true
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
    getCode () {
      clientService.getWithdrawCode(this.topUpRecordId).then(res => {
        this.verificationCode = res.captcha
        if (res.status === 0) {
          this.receiptCode = this.baseUrl + res.withdraw.user.userInfo.alipayWithdrawCode
        } else {
          this.receiptCode = this.baseUrl + res.withdraw.user.userInfo.wechatWithdrawCode
        }
        this.showReceiptCode = true
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
    },
    selectedWithdrawRecord (record) {
      if (record.status !== 1) {
        this.$message('该单未匹配成功或已经完成')
        return
      }
      this.$refs.withdrawConfrim.show()
      this.withDrawRecordId = record.id
    },
    selectedTopUpRecord (record) {
      if (record.status !== 1 && record.status !== 2) {
        this.$message('该单未匹配成功或已经完成')
        return
      }
      if (record.status === 2) {
        this.showConfirmTopUpButton = false
      }
      this.topUpRecordId = record.id
      if (this.showReceiptCode) {
        this.showReceiptCode = false
      }
      this.showTopUpConfrim = true
      this.topupMessage.alipayAccount = record.alipayAccount
      this.topupMessage.withdrawCodeUrl = record.withdrawCodeUrl
      this.topupMessage.captcha = record.captcha
      this.topupimgShow = this.baseUrl + record.withdrawCodeUrl
    },
    uploadPayCode () {
      this.$router.push({path: 'reg-receipt-code', query: { recordId: this.topUpRecordId }})
    },
    saveWithdrawConfrim () {
      if (this.withdrawConfrim === '') {
        this.$message({message: '请输入验证码', type: 'error'})
        return
      }
      let data = {id: this.withDrawRecordId + '/' + this.withdrawConfrim}
      clientService.confirmWithdraw(data).then(res => {
        this.withdrawConfrim = ''
        if (res.status === 200) {
          this.getUserWithDrawRecord()
          this.$message({message: '收款成功', type: 'success'})
        } else {
          this.$message({message: res.message, type: 'error'})
        }
      })
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
  .code-img img {
    width: 100%;
  }
  .code-img p {
    color: red;
    font-size: 16px;
  }
</style>
