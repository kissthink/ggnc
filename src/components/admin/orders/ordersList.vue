<template>
  <div>
    <h4 class="admin-title">
      订单列表
      <a href="javascript:void(0);" @click="toMatchedOrdersList()">已匹配列表</a>
      <a href="javascript:void(0);" @click="config = true">修改充值时间</a>
    </h4>

    <el-tabs v-model="defaultTab" type="border-card" @tab-click="orderTypeSelected()">
      <el-tab-pane label="充值列表" name="topUp">

        <el-tabs :tab-position="'left'" v-model="defaultTopUpChildTab" @tab-click="topUpTypeSelected()">
          <el-tab-pane label="支付宝" name="alipay">
            <table class="table table-hover">
              <thead class="table-active">
                <th>ID</th>
                <th>日期</th>
                <th>用户</th>
                <th>金额</th>
                <th>状态</th>
                <th>匹配</th>
              </thead>
              <tbody v-if="alipayTopUpList.length > 0">
                <tr v-for="item of alipayTopUpList" :key="item.id">
                  <td>{{item.id}}</td>
                  <td>{{item.createTime | transformTime}}</td>
                  <td>
                    {{item.user.nickName}}
                    ({{item.user.mobile}})
                  </td>
                  <td>{{item.amount}}</td>
                  <td>{{item.status | transformBillStatus}}</td>
                  <td>
                    <button class="btn btn-info btn-sm"
                            v-if="item.status === 0"
                            @click="selectedWithdrawMatchList(item)">
                            匹配
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </el-tab-pane>

          <el-tab-pane label="微信" name="wechat">
            <table class="table table-hover">
              <thead class="table-active">
                <th>ID</th>
                <th>日期</th>
                <th>用户</th>
                <th>金额</th>
                <th>状态</th>
                <th>匹配</th>
              </thead>
              <tbody v-if="wechatTopUpList.length > 0">
                <tr v-for="item of wechatTopUpList" :key="item.id">
                  <td>{{item.id}}</td>
                  <td>{{item.createTime | transformTime}}</td>
                  <td>
                    {{item.user.nickName}}
                    ({{item.user.mobile}})
                  </td>
                  <td>{{item.amount}}</td>
                  <td>{{item.status | transformBillStatus}}</td>
                  <td>
                    <button class="btn btn-info btn-sm"
                            v-if="item.status === 0"
                            @click="selectedWithdrawMatchList(item)">
                            匹配
                   </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </el-tab-pane>
        </el-tabs>

      </el-tab-pane>

      <el-tab-pane label="提现列表" name="withdraw">
        <el-tabs :tab-position="'left'" v-model="defaultWithdrawChildTab" @tab-click="withdrawTypeSelected()">
          <el-tab-pane label="支付宝" name="alipay">
            <table class="table table-hover">
              <thead class="table-active">
                <th>ID</th>
                <th>日期</th>
                <th>用户</th>
                <th>金额</th>
                <th>状态</th>
                <th>匹配</th>
              </thead>
              <tbody v-if="alipayWithdrawList.length > 0">
                <tr v-for="item of alipayWithdrawList" :key="item.id">
                  <td>{{item.id}}</td>
                  <td>{{item.createTime | transformTime}}</td>
                  <td>
                    {{item.user.nickName}}
                    ({{item.user.mobile}})
                  </td>
                  <td>{{item.amount}}</td>
                  <td>{{item.status | transformBillStatus}}</td>
                  <td>
                    <button class="btn btn-info btn-sm"
                            v-if="item.status === 0"
                            @click="selectTopUpMatchList(item)">
                            匹配
                   </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </el-tab-pane>

          <el-tab-pane label="微信" name="wechat">
            <table class="table table-hover">
              <thead class="table-active">
                <th>ID</th>
                <th>日期</th>
                <th>用户</th>
                <th>金额</th>
                <th>状态</th>
                <th>匹配</th>
              </thead>
              <tbody v-if="wechatWithdrawList.length > 0">
                <tr v-for="item of wechatWithdrawList" :key="item.id">
                  <td>{{item.id}}</td>
                  <td>{{item.createTime | transformTime}}</td>
                  <td>
                    {{item.user.nickName}}
                    ({{item.user.mobile}})
                  </td>
                  <td>{{item.amount}}</td>
                  <td>{{item.status | transformBillStatus}}</td>
                  <td>
                    <button class="btn btn-info btn-sm"
                            v-if="item.status === 0"
                            @click="selectTopUpMatchList(item)">
                            匹配
                   </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="选择匹配对象" :visible.sync="dialogVisible" @close="closeDialog()">
      <div class="mb-2">
        <el-table :data="matchList" max-height="250" style="width: 100%" size="small">
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="createTime" label="日期">
            <template slot-scope="scope">
              <span>{{scope.row.createTime | transformTime}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="金额"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="selectMatchOrder(scope.row)">选择</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="display-order mb-2" v-if="showSelectedOrder">
        <p>您已选择： </p>
        <span>ID: {{showSelectedOrder.id}}, </span>
        <span>日期: {{showSelectedOrder.createTime | transformTime}},</span>
        <span>金额: {{showSelectedOrder.amount}}</span>
      </div>
      <label>
        请输入验证码:
        <el-input placeholder="请输入验证码" v-model="captcha"></el-input>
        <small style="color: red" v-if="showCaptchaMessage">请填写验证码</small>
      </label>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="platformMatch()" size="mini">平台匹配</el-button>
        <el-button type="primary" @click="saveMatching()" size="mini">确 定</el-button>
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog title="设置充值时间段" :visible.sync="config">
      <span>开始时间:</span>
      <el-select v-model="configObj.topUpStartTime" placeholder="请选择">
        <el-option
          v-for="item in timeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <span class="ml-3">结束时间:</span>
      <el-select v-model="configObj.topUpEndTime" placeholder="请选择">
        <el-option
          v-for="item in timeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveConfig()" size="mini">确 定</el-button>
        <el-button @click="config = false"  size="mini">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import adminService from '@/assets/js/adminService'
import { timeOptions as options } from '@/assets/js/timeOptions'
export default {
  name: 'OrdersList',
  data () {
    return {
      defaultTab: 'topUp',
      defaultTopUpChildTab: 'alipay',
      defaultWithdrawChildTab: 'alipay',
      topUpType: {
        type: 0
      },
      withdrawType: {
        type: 0
      },
      captcha: '',
      alipayTopUpList: [],
      wechatTopUpList: [],
      alipayWithdrawList: [],
      wechatWithdrawList: [],
      matchList: [],
      matching: {
        topUpId: '',
        withdrawId: '',
        captcha: ''
      },
      adminMatching: {
        type: '',
        captcha: '',
        id: ''
      },
      showSelectedOrder: null,
      dialogVisible: false,
      // 是否按下了充值列表的匹配按钮
      isTopUpMatchButton: true,
      showCaptchaMessage: false,
      config: false,
      configObj: {
        topUpStartTime: '',
        topUpEndTime: ''
      },
      timeOptions: options
    }
  },
  methods: {
    getMathTopUpList () {
      adminService.getMathTopUpList(this.topUpType).then(res => {
        if (this.topUpType.type === 0) {
          this.alipayTopUpList = res
        } else {
          this.wechatTopUpList = res
        }
        this.matchList = res
      })
    },
    getMathWithdrawList () {
      adminService.getMathWithdrawList(this.withdrawType).then(res => {
        if (this.withdrawType.type === 0) {
          this.alipayWithdrawList = res
        } else {
          this.wechatWithdrawList = res
        }
        this.matchList = res
      })
    },
    getAdminConfig () {
      adminService.getAdminConfig().then(res => {
        if (res.status === 200) {
          this.configObj.topUpStartTime = res.data.config.topUpStartTime
          this.configObj.topUpEndTime = res.data.config.topUpEndTime
        } else {
          this.$message({message: res.message, type: 'error'})
        }
      })
    },
    orderTypeSelected () {
      if (this.defaultTab === 'topUp') {
        this.topUpTypeSelected()
      } else {
        this.withdrawTypeSelected()
      }
    },
    topUpTypeSelected () {
      if (this.defaultTopUpChildTab === 'alipay') {
        this.topUpType.type = 0
      } else {
        this.topUpType.type = 1
      }
      this.getMathTopUpList()
    },
    withdrawTypeSelected () {
      if (this.defaultWithdrawChildTab === 'alipay') {
        this.withdrawType.type = 0
      } else {
        this.withdrawType.type = 1
      }
      this.getMathWithdrawList()
    },
    selectedWithdrawMatchList (order) {
      this.dialogVisible = true
      this.isTopUpMatchButton = true
      this.matching.topUpId = order.id
      this.withdrawType.type = order.type
      this.adminMatching.type = 'topUp'
      this.adminMatching.id = order.id
      this.getMathWithdrawList()
    },
    selectTopUpMatchList (order) {
      this.dialogVisible = true
      this.isTopUpMatchButton = false
      this.matching.withdrawId = order.id
      this.topUpType.type = order.type
      this.adminMatching.type = 'withdraw'
      this.adminMatching.id = order.id
      this.getMathTopUpList()
    },
    selectMatchOrder (order) {
      if (this.isTopUpMatchButton) {
        this.matching.withdrawId = order.id
      } else {
        this.matching.topUpId = order.id
      }
      this.showSelectedOrder = order
    },
    saveMatching () {
      if (this.captcha === '') {
        this.showCaptchaMessage = true
        return
      }
      this.matching.captcha = this.captcha
      adminService.matchOrder(this.matching).then(res => {
        this.dialogVisible = false
        if (res.status === 200) {
          this.$message({message: '匹配成功', type: 'success'})
          this.orderTypeSelected()
        } else {
          this.$message({message: res.message, type: 'error'})
        }
      })
    },
    platformMatch () {
      if (this.captcha === '') {
        this.showCaptchaMessage = true
        return
      }
      this.adminMatching.captcha = this.captcha
      adminService.adminMatch(this.adminMatching).then(res => {
        this.dialogVisible = false
        if (res.status === 200) {
          this.$message({message: '匹配成功', type: 'success'})
          this.orderTypeSelected()
        } else {
          this.$message({message: res.message, type: 'error'})
        }
      })
    },
    closeDialog () {
      this.showSelectedOrder = null
      this.captcha = ''
    },
    toMatchedOrdersList () {
      this.$router.push('matched-orders-list')
    },
    saveConfig () {
      if (this.configObj.topUpStartTime > this.configObj.topUpEndTime) {
        this.$message({message: '开始时间不能大过结束时间', type: 'error'})
        return
      }
      adminService.updateAdminConfig(this.configObj).then(res => {
        this.config = false
        if (res.status === 200) {
          this.$message({message: '修改成功', type: 'success'})
        } else {
          this.$message({message: res.message, type: 'error'})
        }
      })
    }
  },
  created () {
    this.getMathTopUpList()
    this.getAdminConfig()
  }
}
</script>

<style scoped>
  .admin-title a {
    margin-left: 15px;
    font-size: 16px;
    font-weight: normal;
  }
  .display-order {
    color: #dc3545;
  }
  .display-order span {
    margin-left: 2em;
    color: #000;
  }
</style>
