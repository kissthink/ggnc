<template>
  <div>
    <h4 class="admin-title">用户信息</h4>

    <div class="container-fluid" v-if="userInfo != ''">
      <div class="row mb-2">
        <div class="col-12">用户昵称：{{userInfo.nickName}}</div>
      </div>

      <div class="row mb-2">
        <div class="col-12">用户手机号：{{userInfo.mobile}}</div>
      </div>

      <div class="row mb-2">
        <div class="col-12">在孵蛋：{{userInfo.asset.hatchingEgg}}</div>
      </div>

      <div class="row mb-2">
        <div class="col-12">在养鸡：{{userInfo.asset.inHennery}}</div>
      </div>

      <div class="row">
        <div class="col-12 mb-2">余额：{{userInfo.asset.balance}}</div>
        <div class="col-12 mb-2">
          <amount-select v-on:amountSelected="selectedTopUpBalance($event)" :isSaved="!isTopUpBalance"></amount-select>
          <button class="btn btn-info" @click="topUpBalance()" :disabled="isTopUpBalance">
            充值<span v-if="isTopUpBalance">中...</span>
          </button>
        </div>
        <div class="col-12 mb-2">
          <amount-select v-on:amountSelected="selectedWithdrawBalance($event)" :isSaved="!isWithdrawBalance"></amount-select>
          <button class="btn btn-info" @click="withdrawBalance()" :disabled="isWithdrawBalance">
            提现<span v-if="isWithdrawBalance">中...</span>
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-12 mb-2">种蛋：{{userInfo.asset.breedingEgg}}</div>
        <div class="col-3">
          <div class="input-group mb-3">
            <input type="number" class="form-control" v-model="topUpBreedingEggOfNum">
            <button class="btn btn-info" @click="topUpBreedingEgg()" :disabled="isTopUpBreedingEgg">
              充值<span v-if="isTopUpBreedingEgg">中...</span>
            </button>
          </div>
        </div>
        <div class="col-3">
          <div class="input-group mb-3">
            <input type="number" class="form-control" v-model="withdrawBreedingEggOfNum">
            <button class="btn btn-info" @click="withdrawBreedingEgg()" :disabled="isWithdrawBreedingEgg">
              提现<span v-if="isWithdrawBreedingEgg">中...</span>
            </button>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 mb-2">种鸡：{{userInfo.asset.breedingHens}}</div>
        <div class="col-3">
          <div class="input-group mb-3">
            <input type="number" class="form-control" v-model="topUpBreedingHensOfNum">
            <button class="btn btn-info" @click="topUpBreedingHens()" :disabled="isTopUpBreedingHens">
              充值<span v-if="isTopUpBreedingHens">中...</span>
            </button>
          </div>
        </div>
        <div class="col-3">
          <div class="input-group mb-3">
            <input type="number" class="form-control" v-model="withdrawBreedingHensOfNum">
            <button class="btn btn-info" @click="withdrawBreedingHens()" :disabled="isWithdrawBreedingHens">
              提现<span v-if="isWithdrawBreedingHens">中...</span>
            </button>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 mb-2">商品蛋：{{userInfo.asset.commodityEgg}}</div>
        <div class="col-3">
          <div class="input-group mb-3">
            <input type="number" class="form-control" v-model="topUpCommodityEggOfNum">
            <button class="btn btn-info" @click="topUpCommodityEgg()" :disabled="isTopUpCommodityEgg">
              充值<span v-if="isTopUpCommodityEgg">中...</span>
            </button>
          </div>
        </div>
        <div class="col-3">
          <div class="input-group mb-3">
            <input type="number" class="form-control" v-model="withdrawCommodityEggOfNum">
            <button class="btn btn-info" @click="withdrawCommodityEgg()" :disabled="isWithdrawCommodityEgg">
              提现<span v-if="isWithdrawCommodityEgg">中...</span>
            </button>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 mb-2">商品鸡：{{userInfo.asset.commodityChicken}}</div>
        <div class="col-3">
          <div class="input-group mb-3">
            <input type="number" class="form-control" v-model="topUpCommodityChickenOfNum">
            <button class="btn btn-info" @click="topUpCommodityChicken()" :disabled="isTopUpCommodityChicken">
              充值<span v-if="isTopUpCommodityChicken">中...</span>
            </button>
          </div>
        </div>
        <div class="col-3">
          <div class="input-group mb-3">
            <input type="number" class="form-control" v-model="withdrawCommodityChickenOfNum">
            <button class="btn btn-info" @click="withdrawCommodityChicken()" :disabled="isWithdrawCommodityChicken">
              提现<span v-if="isWithdrawCommodityChicken">中...</span>
            </button>
          </div>
        </div>
      </div>

      <button class="btn btn-outline-dark" @click="backToUserList()">返回列表</button>
    </div>
  </div>
</template>

<script>
import adminService from '@/assets/js/adminService.js'
import util from '@/assets/js/util.js'
export default {
  name: 'ClientDetail',
  data () {
    return {
      userInfo: '',
      topUpBalanceOfNum: 0,
      withdrawBalanceOfNum: 0,
      isTopUpBalance: false,
      isWithdrawBalance: false,
      topUpBreedingEggOfNum: 0,
      withdrawBreedingEggOfNum: 0,
      isTopUpBreedingEgg: false,
      isWithdrawBreedingEgg: false,
      topUpBreedingHensOfNum: 0,
      withdrawBreedingHensOfNum: 0,
      isTopUpBreedingHens: false,
      isWithdrawBreedingHens: false,
      topUpCommodityEggOfNum: 0,
      withdrawCommodityEggOfNum: 0,
      isTopUpCommodityEgg: false,
      isWithdrawCommodityEgg: false,
      topUpCommodityChickenOfNum: 0,
      withdrawCommodityChickenOfNum: 0,
      isTopUpCommodityChicken: false,
      isWithdrawCommodityChicken: false
    }
  },
  methods: {
    getUserDetail () {
      let id = +this.$route.params.id
      if (id > 0) {
        adminService.getUserDetail(id).then(res => {
          this.userInfo = res
        })
      }
    },
    checkNum (num) {
      if (util.regInteger(num)) {
        return true
      } else {
        this.$message({message: '请输入正确的数量', type: 'error'})
        return false
      }
    },
    // 接收选择的金额
    selectedTopUpBalance (value) {
      this.topUpBalanceOfNum = value
    },
    selectedWithdrawBalance (value) {
      this.withdrawBalanceOfNum = value
    },
    // 充值、提现余额
    topUpBalance () {
      if (this.isTopUpBalance) {
        return
      }
      if (!this.checkNum(this.topUpBalanceOfNum)) {
        return
      }
      this.isTopUpBalance = true
      adminService.topUpBalance(this.userInfo, {amount: +this.topUpBalanceOfNum}).then(res => {
        this.isTopUpBalance = false
        if (res.status > 200) {
          this.$message({message: '充值失败', type: 'error'})
        } else {
          this.$message({message: '充值余额成功', type: 'success'})
          this.topUpBalanceOfNum = 0
          this.getUserDetail()
        }
      })
    },
    withdrawBalance () {
      if (this.isWithdrawBalance) {
        return
      }
      if (!this.checkNum(this.withdrawBalanceOfNum)) {
        return
      }
      this.isWithdrawBalance = true
      adminService.withdrawBalance(this.userInfo, {amount: +this.withdrawBalanceOfNum}).then(res => {
        this.isWithdrawBalance = false
        if (res.status > 200) {
          this.$message({message: '提现失败', type: 'error'})
        } else {
          this.$message({message: '提现余额成功', type: 'success'})
          this.withdrawBalanceOfNum = 0
          this.getUserDetail()
        }
      })
    },
    // 充值、提现种蛋
    topUpBreedingEgg () {
      if (this.isTopUpBreedingEgg) {
        return
      }
      if (!this.checkNum(this.topUpBreedingEggOfNum)) {
        return
      }
      this.isTopUpBreedingEgg = true
      adminService.topUpBreedingEgg(this.userInfo, {number: +this.topUpBreedingEggOfNum}).then(res => {
        this.isTopUpBreedingEgg = false
        if (res.status > 200) {
          this.$message({message: '充值失败', type: 'error'})
        } else {
          this.$message({message: '充值种蛋成功', type: 'success'})
          this.topUpBreedingEggOfNum = 0
          this.getUserDetail()
        }
      })
    },
    withdrawBreedingEgg () {
      if (this.isWithdrawBreedingEgg) {
        return
      }
      if (!this.checkNum(this.withdrawBreedingEggOfNum)) {
        return
      }
      this.isWithdrawBreedingEgg = true
      adminService.withdrawBreedingEgg(this.userInfo, {number: +this.withdrawBreedingEggOfNum}).then(res => {
        this.isWithdrawBreedingEgg = false
        if (res.status > 200) {
          this.$message({message: '提现失败', type: 'error'})
        } else {
          this.$message({message: '提现种蛋成功', type: 'success'})
          this.withdrawBreedingEggOfNum = 0
          this.getUserDetail()
        }
      })
    },
    // 充值、提现种鸡
    topUpBreedingHens () {
      if (this.isTopUpBreedingHens) {
        return
      }
      if (!this.checkNum(this.topUpBreedingHensOfNum)) {
        return
      }
      this.isTopUpBreedingHens = true
      adminService.topUpBreedingHens(this.userInfo, {number: +this.topUpBreedingHensOfNum}).then(res => {
        this.isTopUpBreedingHens = false
        if (res.status > 200) {
          this.$message({message: '充值失败', type: 'error'})
        } else {
          this.$message({message: '充值种鸡成功', type: 'success'})
          this.topUpBreedingHensOfNum = 0
          this.getUserDetail()
        }
      })
    },
    withdrawBreedingHens () {
      if (this.isWithdrawBreedingHens) {
        return
      }
      if (!this.checkNum(this.withdrawBreedingHensOfNum)) {
        return
      }
      this.isWithdrawBreedingHens = true
      adminService.WithdrawBreedingHens(this.userInfo, {number: +this.withdrawBreedingHensOfNum}).then(res => {
        this.isWithdrawBreedingHens = false
        if (res.status > 200) {
          this.$message({message: '提现失败', type: 'error'})
        } else {
          this.$message({message: '提现种鸡成功', type: 'success'})
          this.withdrawBreedingHensOfNum = 0
          this.getUserDetail()
        }
      })
    },
    // 充值、提现商品蛋
    topUpCommodityEgg () {
      if (this.isTopUpCommodityEgg) {
        return
      }
      if (!this.checkNum(this.topUpCommodityEggOfNum)) {
        return
      }
      this.isTopUpCommodityEgg = true
      adminService.topUpCommodityEgg(this.userInfo, {number: +this.topUpCommodityEggOfNum}).then(res => {
        this.isTopUpCommodityEgg = false
        if (res.status > 200) {
          this.$message({message: '充值失败', type: 'error'})
        } else {
          this.$message({message: '充值商品蛋成功', type: 'success'})
          this.topUpCommodityEggOfNum = 0
          this.getUserDetail()
        }
      })
    },
    withdrawCommodityEgg () {
      if (this.isWithdrawCommodityEgg) {
        return
      }
      if (!this.checkNum(this.withdrawCommodityEggOfNum)) {
        return
      }
      this.isWithdrawCommodityEgg = true
      adminService.withdrawCommodityEgg(this.userInfo, {number: +this.withdrawCommodityEggOfNum}).then(res => {
        this.isWithdrawCommodityEgg = false
        if (res.status > 200) {
          this.$message({message: '提现失败', type: 'error'})
        } else {
          this.$message({message: '提现商品蛋成功', type: 'success'})
          this.withdrawCommodityEggOfNum = 0
          this.getUserDetail()
        }
      })
    },
    // 充值、提现商品鸡
    topUpCommodityChicken () {
      if (this.isTopUpCommodityChicken) {
        return
      }
      if (!this.checkNum(this.topUpCommodityChickenOfNum)) {
        return
      }
      this.isTopUpCommodityChicken = true
      adminService.topUpCommodityChicken(this.userInfo, {number: +this.topUpCommodityChickenOfNum}).then(res => {
        this.isTopUpCommodityChicken = false
        if (res.status > 200) {
          this.$message({message: '充值失败', type: 'error'})
        } else {
          this.$message({message: '充值商品鸡成功', type: 'success'})
          this.topUpCommodityChickenOfNum = 0
          this.getUserDetail()
        }
      })
    },
    withdrawCommodityChicken () {
      if (this.isWithdrawCommodityChicken) {
        return
      }
      if (!this.checkNum(this.withdrawCommodityChickenOfNum)) {
        return
      }
      this.isWithdrawCommodityChicken = true
      adminService.withdrawCommodityChicken(this.userInfo, {number: +this.withdrawCommodityChickenOfNum}).then(res => {
        this.isWithdrawCommodityChicken = false
        if (res.status > 200) {
          this.$message({message: '提现失败', type: 'error'})
        } else {
          this.$message({message: '提现商品鸡成功', type: 'success'})
          this.withdrawCommodityChickenOfNum = 0
          this.getUserDetail()
        }
      })
    },
    // 返回按钮方法
    backToUserList () {
      this.$router.push('/admin/client-list')
    }
  },
  mounted () {
    this.getUserDetail()
  }
}
</script>

<style scoped>
  .container-fluid {
    font-size: 14px;
  }
  .form-control {
    margin-right: 5px;
    border-radius: 3px!important;
  }
</style>
