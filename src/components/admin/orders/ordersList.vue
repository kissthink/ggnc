<template>
  <div>
    <h4 class="admin-title">
      订单列表
      <!-- <a href="javascript:void(0);" @click="toMatchedOrdersList()">已匹配列表</a> -->
      <!-- <a href="javascript:void(0);" @click="config = true">修改充值时间</a> -->
      <a href="javascript:void(0);" @click="alipayFlag = true">修改支付宝</a>
    </h4>

    <el-tabs v-model="defaultTab" type="border-card" @tab-click="orderTypeSelected()">
      <el-tab-pane label="充值列表" name="topUp">

        <el-tabs :tab-position="'left'" v-model="defaultTopUpChildTab" @tab-click="topUpTypeSelected()">
          <el-tab-pane label="待匹配" name="tobeMatch">
            <table class="table table-hover">
              <thead class="table-active">
                <th>ID</th>
                <th>日期</th>
                <th>用户</th>
                <th>金额</th>
                <th>状态</th>
                <th>匹配</th>
              </thead>
              <tbody v-if="tobeMatchTopUpList.length > 0">
                <tr v-for="item of tobeMatchTopUpList" :key="item.id" v-if='messageTopupShow'>
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

          <el-tab-pane label="已匹配" name="Matched">
            <table class="table table-hover">
              <thead class="table-active">
                <th>ID</th>
                <th>日期</th>
                <th>用户</th>
                <th>金额</th>
                <th>状态</th>
                <th>验证码</th>
              </thead>
              <tbody v-if="matchedTopUpList.length > 0">
                <tr v-for="item of matchedTopUpList" :key="item.id">
                  <td>{{item.id}}</td>
                  <td>{{item.createTime | transformTime}}</td>
                  <td>
                    {{item.user.nickName}}
                    ({{item.user.mobile}})
                  </td>
                  <td>{{item.amount}}</td>
                  <td>{{item.status | transformBillStatus}}</td>
                  <td>{{matching.captcha}}</td>
                </tr>
              </tbody>
            </table>
          </el-tab-pane>

          <el-tab-pane label="已付款" name="alreadyPaid">
            <table class="table table-hover">
              <thead class="table-active">
                <th>ID</th>
                <th>日期</th>
                <th>用户</th>
                <th>金额</th>
                <th>状态</th>
                <th>操作</th>
              </thead>
              <tbody v-if="alreadyPaidTopUpList.length > 0">
                <tr v-for="item of alreadyPaidTopUpList" :key="item.id">
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
                            v-if="item.status === 2"
                            @click="completedTopUp(item)">
                            付款完成
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </el-tab-pane>

          <el-tab-pane label="成功" name="successTransfer">
            <table class="table table-hover">
              <thead class="table-active">
                <th>ID</th>
                <th>日期</th>
                <th>用户</th>
                <th>金额</th>
                <th>状态</th>
              </thead>
              <tbody v-if="successTransferTopUpList.length > 0">
                <tr v-for="item of successTransferTopUpList" :key="item.id">
                  <td>{{item.id}}</td>
                  <td>{{item.createTime | transformTime}}</td>
                  <td>
                    {{item.user.nickName}}
                    ({{item.user.mobile}})
                  </td>
                  <td>{{item.amount}}</td>
                  <td>{{item.status | transformBillStatus}}</td>
                </tr>
              </tbody>
            </table>
          </el-tab-pane>

          <el-tab-pane label="失败" name="failedTransfer">
            <table class="table table-hover">
              <thead class="table-active">
                <th>ID</th>
                <th>日期</th>
                <th>用户</th>
                <th>金额</th>
                <th>状态</th>
              </thead>
              <tbody v-if="failedTransferTopUpList.length > 0">
                <tr v-for="item of failedTransferTopUpList" :key="item.id">
                  <td>{{item.id}}</td>
                  <td>{{item.createTime | transformTime}}</td>
                  <td>
                    {{item.user.nickName}}
                    ({{item.user.mobile}})
                  </td>
                  <td>{{item.amount}}</td>
                  <td>{{item.status | transformBillStatus}}</td>
                </tr>
              </tbody>
            </table>
          </el-tab-pane>
        </el-tabs>

      </el-tab-pane>

      <el-tab-pane label="提现列表" name="withdraw">
        <el-tabs :tab-position="'left'" v-model="defaultWithdrawChildTab" @tab-click="withdrawTypeSelected()">
          <el-tab-pane label="待匹配" name="tobeMatch">
            <table class="table table-hover">
              <thead class="table-active">
                <th>ID</th>
                <th>日期</th>
                <th>用户</th>
                <th>金额</th>
                <th>状态</th>
                <th>匹配</th>
                <th>用户信息</th>
              </thead>
              <tbody v-if="tobeMatchWithdrawList.length > 0">
                <tr v-for="item of tobeMatchWithdrawList" :key="item.id">
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
                  <td>
                    <button class="btn btn-info btn-sm"
                            v-if="item.status === 0"
                            @click="checkUserMessage(item)">
                            用户信息
                   </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </el-tab-pane>

          <el-tab-pane label="已匹配" name="Matched">
            <table class="table table-hover">
              <thead class="table-active">
                <th>ID</th>
                <th>日期</th>
                <th>用户</th>
                <th>金额</th>
                <th>状态</th>
                <th>匹配</th>
              </thead>
              <tbody v-if="matchedWithdrawList.length > 0">
                <tr v-for="item of matchedWithdrawList" :key="item.id">
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
                            @click="confirmWithdraw(item)">
                            提现完成
                   </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </el-tab-pane>

          <el-tab-pane label="成功" name="successTopup">
            <table class="table table-hover">
              <thead class="table-active">
                <th>ID</th>
                <th>日期</th>
                <th>用户</th>
                <th>金额</th>
                <th>状态</th>
              </thead>
              <tbody v-if="successWithdrawList.length > 0">
                <tr v-for="item of successWithdrawList" :key="item.id">
                  <td>{{item.id}}</td>
                  <td>{{item.createTime | transformTime}}</td>
                  <td>
                    {{item.user.nickName}}
                    ({{item.user.mobile}})
                  </td>
                  <td>{{item.amount}}</td>
                  <td>{{item.status | transformBillStatus}}</td>
                </tr>
              </tbody>
            </table>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="选择匹配对象" :visible.sync="dialogVisible" @close="closeDialog()">
      <!-- <div class="mb-2">
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
      </div> -->
      <b-form-group id="alipayWithdrawCode"
                        label="图片："
                        label-for="alipayWithdrawCode"
                        v-if="showPicMessage">
        <b-form-file accept=".jpg, .png, .gif" @change="alipayImgUpLoad($event)"
                         placeholder="选择图片"></b-form-file>
      </b-form-group>
      <label>
        请输入验证码:
        <el-input placeholder="请输入验证码" v-model="captcha"></el-input>
        <small style="color: red" v-if="showCaptchaMessage">请填写验证码</small>
      </label>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button type="danger" @click="platformMatch()" size="mini">平台匹配</el-button> -->
        <el-button type="primary" @click="saveMatching()" size="mini">确 定</el-button>
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
      </span>
    </el-dialog>

    <!-- <el-dialog title="设置充值时间段" :visible.sync="config">
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
    </el-dialog> -->
    <el-dialog title="请输入支付宝账号: " :visible.sync="alipayFlag" width="30%" >
      <label>
        <el-input v-model="alipayObj.alipayAccount"></el-input>
        <small style="color: red" v-if="showAlipayMessage">支付宝账号不能为空</small>
      </label>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveAlipayMessage()" size="mini">确 定</el-button>
        <el-button @click="alipayFlag = false" size="small">取 消</el-button>
      </span>
    </el-dialog>

    <b-modal v-model="showUserMessage" ok-title="确认" centered title='支付宝' ok-only>
       <img :src="userconfirmWithdrawUrl" width="100%">
       <p>支付宝: {{alipayObj.alipayAccount}}</p>
    </b-modal>
  </div>
</template>

<script>
import adminService from '@/assets/js/adminService'
import { timeOptions as options } from '@/assets/js/timeOptions'
import axios from 'axios'
export default {
  name: 'OrdersList',
  data () {
    return {
      userconfirmWithdrawUrl: '',
      baseUrl: axios.defaults.baseURL.slice(0, -1),
      checkCaptcha: '',
      showUserMessage: false,
      showPicMessage: true,
      defaultTab: 'topUp',
      defaultTopUpChildTab: 'tobeMatch',
      defaultWithdrawChildTab: 'tobeMatch',
      topUpStatus: {
        status: 0
      },
      withdrawStatus: {
        status: 0
      },
      captcha: '',
      tobeMatchTopUpList: [],
      matchedTopUpList: [],
      alreadyPaidTopUpList: [],
      successTransferTopUpList: [],
      failedTransferTopUpList: [],
      tobeMatchWithdrawList: [],
      matchedWithdrawList: [],
      successWithdrawList: [],
      messageTopupShow: true,
      matchList: [],
      matching: {
        id: '',
        withdrawCode: '',
        captcha: ''
      },
      adminMatching: {
        type: '',
        captcha: '',
        id: ''
      },
      alipayImgFile: '',
      alipayImgObj: {
        alipayUrl: ''
      },
      showSelectedOrder: null,
      dialogVisible: false,
      // 是否按下了充值列表的匹配按钮
      isTopUpMatchButton: true,
      showCaptchaMessage: false,
      config: false,
      alipayFlag: false,
      alipayObj: {
        alipayAccount: ''
      },
      showAlipayMessage: false,
      configObj: {
        topUpStartTime: '',
        topUpEndTime: ''
      },
      timeOptions: options
    }
  },
  methods: {
    getMathTopUpList () {
      adminService.getMathTopUpList(this.topUpStatus).then(res => {
        if (this.topUpStatus.status === 0) {
          this.tobeMatchTopUpList = res
        } else if (this.topUpStatus.status === 1) {
          this.matchedTopUpList = res
        } else if (this.topUpStatus.status === 2) {
          this.alreadyPaidTopUpList = res
        } else if (this.topUpStatus.status === 3) {
          this.successTransferTopUpList = res
        } else if (this.topUpStatus.status === 4) {
          this.failedTransferTopUpList = res
        }
        this.matchList = res
      })
    },
    getMathWithdrawList () {
      adminService.getMathWithdrawList(this.withdrawStatus).then(res => {
        if (this.withdrawStatus.status === 0) {
          this.tobeMatchWithdrawList = res
        } else if (this.withdrawStatus.status === 1) {
          this.matchedWithdrawList = res
        } else {
          this.successWithdrawList = res
        }
        this.matchList = res
      })
    },
    getAdminConfig () {
      adminService.getAdminConfig().then(res => {
        if (res.status === 200) {
          this.configObj.topUpStartTime = res.data.config.topUpStartTime
          this.configObj.topUpEndTime = res.data.config.topUpEndTime
          this.alipayObj.alipayAccount = res.data.config.alipayAccount
        } else {
          this.$message({message: res.message, type: 'error'})
        }
      })
    },
    orderTypeSelected () {
      if (this.defaultTab === 'topUp') {
        this.topUpTypeSelected()
        this.showPicMessage = true
      } else {
        this.withdrawTypeSelected()
        this.showPicMessage = false
      }
    },
    topUpTypeSelected () {
      if (this.defaultTopUpChildTab === 'tobeMatch') {
        this.topUpStatus.status = 0
      } else if (this.defaultTopUpChildTab === 'Matched') {
        this.topUpStatus.status = 1
      } else if (this.defaultTopUpChildTab === 'alreadyPaid') {
        this.topUpStatus.status = 2
      } else if (this.defaultTopUpChildTab === 'successTransfer') {
        this.topUpStatus.status = 3
      } else {
        this.topUpStatus.status = 4
      }
      this.getMathTopUpList()
    },
    withdrawTypeSelected () {
      if (this.defaultWithdrawChildTab === 'tobeMatch') {
        this.withdrawStatus.status = 0
      } else if (this.defaultWithdrawChildTab === 'Matched') {
        this.withdrawStatus.status = 1
      } else {
        this.withdrawStatus.status = 2
      }
      this.getMathWithdrawList()
    },
    selectedWithdrawMatchList (order) {
      this.dialogVisible = true
      this.isTopUpMatchButton = true
      this.withdrawStatus.status = order.type
      this.adminMatching.type = 'topUp'
      this.adminMatching.id = order.id
      this.matching.id = order.id
      this.getMathWithdrawList()
    },
    selectTopUpMatchList (order) {
      this.dialogVisible = true
      this.isTopUpMatchButton = false
      this.topUpStatus.status = order.type
      this.adminMatching.type = 'withdraw'
      this.adminMatching.id = order.id
      this.matching.id = order.id
      this.getMathTopUpList()
    },
    saveMatching () {
      if (this.captcha === '') {
        this.showCaptchaMessage = true
        return
      }
      this.matching.captcha = this.captcha
      if (this.defaultTab === 'topUp') {
        if (this.alipayImgFile.length < 1) {
          return
        }
        adminService.uploadWithdraw(this.alipayImgFile[0]).then(res => {
          if (res.status === 200) {
            this.alipayImgObj.alipayUrl = res.data.filePath
            this.matching.withdrawCode = res.data.filePath
            adminService.matchTopUpOrder(this.matching).then(res => {
              this.dialogVisible = false
              if (res.status === 200) {
                this.$message({message: '匹配成功', type: 'success'})
                this.getMathTopUpList()
              } else {
                this.$message({message: res.message, type: 'error'})
              }
            })
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      } else {
        adminService.matchWithdrawOrder(this.matching).then(res => {
          this.dialogVisible = false
          if (res.status === 200) {
            this.$message({message: '匹配成功', type: 'success'})
            this.getMathWithdrawList()
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      }
    },
    saveAlipayMessage () {
      if (this.alipayObj.alipayAccount === '') {
        this.showAlipayMessage = true
        return
      }
      adminService.updateAlipayConfig(this.alipayObj).then(res => {
        this.showAlipayMessage = false
        if (res.status === 200) {
          this.$message({message: '修改支付宝账号成功', type: 'success'})
          this.alipayFlag = false
        } else {
          this.$message({message: res.message, type: 'error'})
        }
      })
    },
    alipayImgUpLoad (file) {
      this.alipayImgFile = file.target.files
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
    },
    completedTopUp (order) {
      this.matching.id = order.id
      let data = {id: this.matching.id + '/'}
      adminService.topUpPass(data).then(res => {
        console.log(res)
        if (res.status === 200) {
          this.$message({message: '完成充值', type: 'success'})
          this.getMathTopUpList()
        } else {
          this.$message({message: res.message, type: 'error'})
        }
      })
    },
    checkUserMessage (order) {
      this.checkCaptcha = order.captcha
      this.showUserMessage = true
      this.userconfirmWithdrawUrl = this.baseUrl + order.user.userInfo.alipayWithdrawCode
    },
    confirmWithdraw (order) {
      this.matching.id = order.id
      this.matching.captcha = order.captcha
      let data = {id: this.matching.id + '/' + this.matching.captcha}
      adminService.userconfirmWithdraw(data).then(res => {
        if (res.status === 200) {
          this.$message({message: '提现完成', type: 'success'})
          this.getMathWithdrawList()
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
