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
        <div class="col-3">
          <div class="input-group mb-3">
            <input type="number" class="form-control" v-model="topUpBalanceOfNum">
            <button class="btn btn-info" @click="topUpBalance()">充值</button>
          </div>
        </div>
        <div class="col-3">
          <div class="input-group mb-3">
            <input type="number" class="form-control">
            <button class="btn btn-info">提现</button>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 mb-2">种蛋：{{userInfo.asset.breedingEgg}}</div>
        <div class="col-3">
          <div class="input-group mb-3">
            <input type="number" class="form-control" v-model="topUpBreedingEggOfNum">
            <button class="btn btn-info" @click="topUpBreedingEgg()">充值</button>
          </div>
        </div>
        <div class="col-3">
          <div class="input-group mb-3">
            <input type="number" class="form-control" v-model="withdrawBreedingEggOfNum">
            <button class="btn btn-info" @click="withdrawBreedingEgg()">提现</button>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 mb-2">种鸡：{{userInfo.asset.breedingHens}}</div>
        <div class="col-3">
          <div class="input-group mb-3">
            <input type="number" class="form-control" v-model="topUpBreedingHensOfNum">
            <button class="btn btn-info" @click="topUpBreedingHens()">充值</button>
          </div>
        </div>
        <div class="col-3">
          <div class="input-group mb-3">
            <input type="number" class="form-control" v-model="withdrawBreedingHensOfNum">
            <button class="btn btn-info" @click="withdrawBreedingHens()">提现</button>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 mb-2">商品蛋：{{userInfo.asset.commodityEgg}}</div>
        <div class="col-3">
          <div class="input-group mb-3">
            <input type="number" class="form-control" v-model="topUpCommodityEggOfNum">
            <button class="btn btn-info" @click="topUpCommodityEgg()">充值</button>
          </div>
        </div>
        <div class="col-3">
          <div class="input-group mb-3">
            <input type="number" class="form-control" v-model="withdrawCommodityEggOfNum">
            <button class="btn btn-info" @click="withdrawCommodityEgg()">提现</button>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 mb-2">商品鸡：{{userInfo.asset.commodityChicken}}</div>
        <div class="col-3">
          <div class="input-group mb-3">
            <input type="number" class="form-control" v-model="topUpCommodityChickenOfNum">
            <button class="btn btn-info" @click="topUpCommodityChicken()">充值</button>
          </div>
        </div>
        <div class="col-3">
          <div class="input-group mb-3">
            <input type="number" class="form-control" v-model="withdrawCommodityChickenOfNum">
            <button class="btn btn-info" @click="withdrawCommodityChicken()">提现</button>
          </div>
        </div>
      </div>

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
      topUpBreedingEggOfNum: 0,
      withdrawBreedingEggOfNum: 0,
      topUpBreedingHensOfNum: 0,
      withdrawBreedingHensOfNum: 0,
      topUpCommodityEggOfNum: 0,
      withdrawCommodityEggOfNum: 0,
      topUpCommodityChickenOfNum: 0,
      withdrawCommodityChickenOfNum: 0
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
    topUpBalance () {

    },
    // 充值、提现种蛋
    topUpBreedingEgg () {
      if (!this.checkNum(this.topUpBreedingEggOfNum)) {
        return
      }
      adminService.topUpBreedingEgg(this.userInfo, {number: +this.topUpBreedingEggOfNum}).then(res => {
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
      if (!this.checkNum(this.withdrawBreedingEggOfNum)) {
        return
      }
      adminService.withdrawBreedingEggOfNum(this.userInfo, {number: +this.withdrawBreedingEggOfNum}).then(res => {
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
      if (!this.checkNum(this.topUpBreedingHensOfNum)) {
        return
      }
      adminService.topUpBreedingHens(this.userInfo, {number: +this.topUpBreedingHensOfNum}).then(res => {
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
      if (!this.checkNum(this.withdrawBreedingHensOfNum)) {
        return
      }
      adminService.WithdrawBreedingHens(this.userInfo, {number: +this.withdrawBreedingHensOfNum}).then(res => {
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
      if (!this.checkNum(this.topUpCommodityEggOfNum)) {
        return
      }
      adminService.topUpCommodityEgg(this.userInfo, {number: +this.topUpCommodityEggOfNum}).then(res => {
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
      if (!this.checkNum(this.withdrawCommodityEggOfNum)) {
        return
      }
      adminService.withdrawCommodityEgg(this.userInfo, {number: +this.withdrawCommodityEggOfNum}).then(res => {
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
      if (!this.checkNum(this.topUpCommodityChickenOfNum)) {
        return
      }
      adminService.topUpCommodityChicken(this.userInfo, {number: +this.topUpCommodityChickenOfNum}).then(res => {
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
      if (!this.checkNum(this.withdrawCommodityChickenOfNum)) {
        return
      }
      adminService.withdrawCommodityChicken(this.userInfo, {number: +this.withdrawCommodityChickenOfNum}).then(res => {
        if (res.status > 200) {
          this.$message({message: '提现失败', type: 'error'})
        } else {
          this.$message({message: '提现商品鸡成功', type: 'success'})
          this.withdrawCommodityChickenOfNum = 0
          this.getUserDetail()
        }
      })
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
