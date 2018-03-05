<template>
  <div>
    <h4 class="admin-title">操作日志</h4>

    <div>
      <el-tabs type="border-card" value="balanceOperationLogs" @tab-click="selectLog($event)">
        <el-tab-pane label="余额操作日志" name="balanceOperationLogs">
          <el-tabs :tab-position="tabPosition" value="topUp" @tab-click="selectBalanceOperationType($event)">
            <el-tab-pane label="充值" name="topUp">
              <operation-logs-table v-on:selectPage="topUpBalancePage($event)"
                                    :total-page="balanceTopUpLogsList.totalPages"
                                    :operation-logs="balanceTopUpLogsList.balanceOperationLogList">
              </operation-logs-table>
            </el-tab-pane>
            <el-tab-pane label="提现" name="withdraw">
              <operation-logs-table v-on:selectPage="withdrawBalancePage($event)"
                                    :total-page="balanceWithdrawLogsList.totalPages"
                                    :operation-logs="balanceWithdrawLogsList.balanceOperationLogList">
              </operation-logs-table>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>

        <el-tab-pane label="种蛋操作日志" name="breedingEggOperationLogs">
          <el-tabs :tab-position="tabPosition" value="topUp" @tab-click="selectBreedingEggOperationType($event)">
            <el-tab-pane label="充值" name="topUp">
              <operation-logs-table v-on:selectPage="topUpBreedingEggPage($event)"
                                    :total-page="breedingEggTopUpLogsList.totalPages"
                                    :operation-logs="breedingEggTopUpLogsList.chickenAndEggOperationLogList">
              </operation-logs-table>
            </el-tab-pane>
            <el-tab-pane label="提现" name="withdraw">
              <operation-logs-table v-on:selectPage="withdrawBreedingEggPage($event)"
                                    :total-page="breedingEggWithdrawLogsList.totalPages"
                                    :operation-logs="breedingEggWithdrawLogsList.chickenAndEggOperationLogList">
              </operation-logs-table>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>

        <el-tab-pane label="种鸡操作日志" name="breedingHensOperationLogs">
          <el-tabs :tab-position="tabPosition" value="topUp" @tab-click="selectBreedingHensOperationType($event)">
            <el-tab-pane label="充值" name="topUp">
              <operation-logs-table v-on:selectPage="topUpBreedingHensPage($event)"
                                    :total-page="breedingHensTopUpLogsList.totalPages"
                                    :operation-logs="breedingHensTopUpLogsList.chickenAndEggOperationLogList">
              </operation-logs-table>
            </el-tab-pane>
            <el-tab-pane label="提现" name="withdraw">
              <operation-logs-table v-on:selectPage="withdrawBreedingHensPage($event)"
                                    :total-page="breedingHensWithdrawLogsList.totalPages"
                                    :operation-logs="breedingHensWithdrawLogsList.chickenAndEggOperationLogList">
              </operation-logs-table>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>

        <el-tab-pane label="商品蛋操作日志" name="commodityEggOperationLogs">
          <el-tabs :tab-position="tabPosition" value="topUp" @tab-click="selectCommodityEggOperationType($event)">
            <el-tab-pane label="充值" name="topUp">
              <operation-logs-table v-on:selectPage="topUpCommodityEggPage($event)"
                                    :total-page="commodityEggTopUpLogsList.totalPages"
                                    :operation-logs="commodityEggTopUpLogsList.chickenAndEggOperationLogList">
              </operation-logs-table>
            </el-tab-pane>
            <el-tab-pane label="提现" name="withdraw">
              <operation-logs-table v-on:selectPage="withdrawCommodityEggPage($event)"
                                    :total-page="commodityEggWithdrawLogsList.totalPages"
                                    :operation-logs="commodityEggWithdrawLogsList.chickenAndEggOperationLogList">
              </operation-logs-table>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>

        <el-tab-pane label="商品鸡操作日志" name="commodityChickenOperationLogs">
          <el-tabs :tab-position="tabPosition" value="topUp" @tab-click="selectCommodityChickenOperationType($event)">
            <el-tab-pane label="充值" name="topUp">
              <operation-logs-table v-on:selectPage="topUpCommodityChickenPage($event)"
                                    :total-page="commodityChickenUpLogsList.totalPages"
                                    :operation-logs="commodityChickenUpLogsList.chickenAndEggOperationLogList">
              </operation-logs-table>
            </el-tab-pane>
            <el-tab-pane label="提现" name="withdraw">
              <operation-logs-table v-on:selectPage="withdrawCommodityChickenPage($event)"
                                    :total-page="commodityChickenWithdrawLogsList.totalPages"
                                    :operation-logs="commodityChickenWithdrawLogsList.chickenAndEggOperationLogList">
              </operation-logs-table>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import operationLogsTable from './operationLogsTable.vue'
import adminService from '@/assets/js/adminService'
export default {
  name: 'OperationLogs',
  components: {
    operationLogsTable
  },
  data () {
    return {
      tabPosition: 'left',
      balanceOperationType: 'topUp',
      breedingEggOperationType: 'topUp',
      breedingHensOperationType: 'topUp',
      commodityEggOperationType: 'topUp',
      commodityChickenOperationType: 'topUp',
      currentTopUpBalancePage: 1,
      currentWithdrawBalancePage: 1,
      currentTopUpBreedingEggPage: 1,
      currentWithdrawBreedingEggPage: 1,
      currentTopUpBreedingHensPage: 1,
      currentWithdrawBreedingHensPage: 1,
      currentTopUpCommodityEggPage: 1,
      currentWithdrawCommodityEggPage: 1,
      currentTopUpCommodityChickenPage: 1,
      currentWithdrawCommodityChickenPage: 1,
      balanceTopUpLogsList: {},
      balanceWithdrawLogsList: {},
      breedingEggTopUpLogsList: {},
      breedingEggWithdrawLogsList: {},
      breedingHensTopUpLogsList: {},
      breedingHensWithdrawLogsList: {},
      commodityEggTopUpLogsList: {},
      commodityEggWithdrawLogsList: {},
      commodityChickenUpLogsList: {},
      commodityChickenWithdrawLogsList: {}
    }
  },
  methods: {
    // 选择tabs大类
    selectLog (tab) {
      switch (tab.name) {
        case 'balanceOperationLogs':
          this.getBalanceOperationLogs()
          break
        case 'breedingEggOperationLogs':
          this.getBreedingEggOperationLogs()
          break
        case 'breedingHensOperationLogs':
          this.getBreedingHensOperationLogs()
          break
        case 'commodityEggOperationLogs':
          this.getCommodityEggOperationLogs()
          break
        case 'commodityChickenOperationLogs':
          this.getCommodityChickenOperationLogs()
          break
      }
    },
    // 获取选择的页码
    topUpBalancePage (page) {
      this.currentTopUpBalancePage = page
      this.getBalanceTopUpLogs()
    },
    withdrawBalancePage (page) {
      this.currentWithdrawBalancePage = page
      this.getBalanceWithdrawLogs()
    },
    topUpBreedingEggPage (page) {
      this.currentTopUpBreedingEggPage = page
      this.getBreedingEggTopUpLogs()
    },
    withdrawBreedingEggPage (page) {
      this.currentWithdrawBreedingEggPage = page
      this.getBreedingEggWithdrawLogs()
    },
    topUpBreedingHensPage (page) {
      this.currentTopUpBreedingHensPage = page
      this.getBreedingHensTopUpLogs()
    },
    withdrawBreedingHensPage (page) {
      this.currentWithdrawBreedingHensPage = page
      this.getBreedingHensWithdrawLogs()
    },
    topUpCommodityEggPage (page) {
      this.currentTopUpCommodityEggPage = page
      this.getCommodityEggTopUpLogs()
    },
    withdrawCommodityEggPage (page) {
      this.currentWithdrawCommodityEggPage = page
      this.getCommodityEggWithdrawLogs()
    },
    topUpCommodityChickenPage (page) {
      this.currentTopUpCommodityChickenPage = page
      this.getCommodityChickenTopUpLogs()
    },
    withdrawCommodityChickenPage (page) {
      this.currentWithdrawCommodityChickenPage = page
      this.getCommodityChickenWithdrawLogs()
    },
    // 执行选择tabs的事件
    getBalanceOperationLogs () {
      this.judgeSelectBalanceOperationType()
    },
    getBreedingEggOperationLogs () {
      this.judgeSelectBreedingEggOperationType()
    },
    getBreedingHensOperationLogs () {
      this.judgeSelectBreedingHensOperationType()
    },
    getCommodityEggOperationLogs () {
      this.judgeSelectCommodityEggOperationType()
    },
    getCommodityChickenOperationLogs () {
      this.judgeSelectCommodityChickenOperationType()
    },
    // 内嵌tabs点击事件
    selectBalanceOperationType (tab) {
      this.balanceOperationType = tab.name
      this.judgeSelectBalanceOperationType()
    },
    selectBreedingEggOperationType (tab) {
      this.breedingEggOperationType = tab.name
      this.judgeSelectBreedingEggOperationType()
    },
    selectBreedingHensOperationType (tab) {
      this.breedingHensOperationType = tab.name
      this.judgeSelectBreedingHensOperationType()
    },
    selectCommodityEggOperationType (tab) {
      this.commodityEggOperationType = tab.name
      this.judgeSelectCommodityEggOperationType()
    },
    selectCommodityChickenOperationType (tab) {
      this.commodityChickenOperationType = tab.name
      this.judgeSelectCommodityChickenOperationType()
    },
    // 调用接口
    getBalanceTopUpLogs () {
      let page = this.currentTopUpBalancePage > 1 ? this.currentTopUpBalancePage : 1
      adminService.getBalanceTopUpLog(page).then(res => {
        if (res.status === 200) {
          this.balanceTopUpLogsList = res.data.OperationLogList
        } else {
          this.$message({message: res.message, type: 'error'})
        }
      })
    },
    getBalanceWithdrawLogs () {
      let page = this.currentWithdrawBalancePage > 1 ? this.currentTopUpBalancePage : 1
      adminService.getBalanceWithdrawLog(page).then(res => {
        if (res.status === 200) {
          this.balanceWithdrawLogsList = res.data.OperationLogList
        } else {
          this.$message({message: res.message, type: 'error'})
        }
      })
    },
    getBreedingEggTopUpLogs () {
      let page = this.currentTopUpBreedingEggPage > 1 ? this.currentTopUpBreedingEggPage : 1
      adminService.getBreedingEggTopUpLog(page).then(res => {
        if (res.status === 200) {
          this.breedingEggTopUpLogsList = res.data.OperationLogList
        } else {
          this.$message({message: res.message, type: 'error'})
        }
      })
    },
    getBreedingEggWithdrawLogs () {
      let page = this.currentWithdrawBreedingEggPage > 1 ? this.currentWithdrawBreedingEggPage : 1
      adminService.getBreedingEggWithdrawLog(page).then(res => {
        if (res.status === 200) {
          this.breedingEggTopUpLogsList = res.data.OperationLogList
        } else {
          this.$message({message: res.message, type: 'error'})
        }
      })
    },
    getBreedingHensTopUpLogs () {
      let page = this.currentTopUpBreedingHensPage > 1 ? this.currentTopUpBreedingHensPage : 1
      adminService.getBreedingHensTopUpLog(page).then(res => {
        if (res.status === 200) {
          this.breedingHensTopUpLogsList = res.data.OperationLogList
        } else {
          this.$message({message: res.message, type: 'error'})
        }
      })
    },
    getBreedingHensWithdrawLogs () {
      let page = this.currentWithdrawBreedingHensPage > 1 ? this.currentWithdrawBreedingHensPage : 1
      adminService.getBreedingHensWithdrawLog(page).then(res => {
        if (res.status === 200) {
          this.breedingHensTopUpLogsList = res.data.OperationLogList
        } else {
          this.$message({message: res.message, type: 'error'})
        }
      })
    },
    getCommodityEggTopUpLogs () {
      let page = this.currentTopUpCommodityEggPage > 1 ? this.currentTopUpCommodityEggPage : 1
      adminService.getCommodityEggTopUpLog(page).then(res => {
        if (res.status === 200) {
          this.commodityEggTopUpLogsList = res.data.OperationLogList
        } else {
          this.$message({message: res.message, type: 'error'})
        }
      })
    },
    getCommodityEggWithdrawLogs () {
      let page = this.currentWithdrawCommodityEggPage > 1 ? this.currentWithdrawCommodityEggPage : 1
      adminService.getCommodityEggWithdrawLog(page).then(res => {
        if (res.status === 200) {
          this.commodityEggTopUpLogsList = res.data.OperationLogList
        } else {
          this.$message({message: res.message, type: 'error'})
        }
      })
    },
    getCommodityChickenTopUpLogs () {
      let page = this.currentTopUpCommodityChickenPage > 1 ? this.currentTopUpCommodityChickenPage : 1
      adminService.getCommodityChickenTopUpLog(page).then(res => {
        if (res.status === 200) {
          this.commodityChickenTopUpLogsList = res.data.OperationLogList
        } else {
          this.$message({message: res.message, type: 'error'})
        }
      })
    },
    getCommodityChickenWithdrawLogs () {
      let page = this.currentWithdrawCommodityChickenPage > 1 ? this.currentWithdrawCommodityChickenPage : 1
      adminService.getCommodityChickenWithdrawLog(page).then(res => {
        if (res.status === 200) {
          this.commodityChickenTopUpLogsList = res.data.OperationLogList
        } else {
          this.$message({message: res.message, type: 'error'})
        }
      })
    },
    // 判断选择的是否为充值日志
    judgeSelectBalanceOperationType () {
      if (this.balanceOperationType === 'topUp') {
        this.getBalanceTopUpLogs()
      } else {
        this.getBalanceWithdrawLogs()
      }
    },
    judgeSelectBreedingEggOperationType () {
      if (this.breedingEggOperationType === 'topUp') {
        this.getBreedingEggTopUpLogs()
      } else {
        this.getBreedingEggWithdrawLogs()
      }
    },
    judgeSelectBreedingHensOperationType () {
      if (this.breedingHensOperationType === 'topUp') {
        this.getBreedingHensTopUpLogs()
      } else {
        this.getBreedingHensWithdrawLogs()
      }
    },
    judgeSelectCommodityEggOperationType () {
      if (this.commodityEggOperationType === 'topUp') {
        this.getCommodityEggTopUpLogs()
      } else {
        this.getCommodityEggWithdrawLogs()
      }
    },
    judgeSelectCommodityChickenOperationType () {
      if (this.commodityChickenOperationType === 'topUp') {
        this.getCommodityChickenTopUpLogs()
      } else {
        this.getCommodityChickenWithdrawLogs()
      }
    }
  },
  mounted () {
    this.getBalanceTopUpLogs()
  }
}
</script>

<style>
  .card-header {
    background: #eee;
  }
</style>
