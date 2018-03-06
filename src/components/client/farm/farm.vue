<template>
  <div>
    <h4 class="h4-title">我的农场</h4>

    <div class="farm-wrap" v-if="user">
      <div class="farm-button">
        <div>
          <button class="btn btn-primary btn-block btn-lg" @click="goToTargetRouter('/hatch-room')">
            <i class="fas fa-arrow-left"></i> 孵化房
          </button>
        </div>
        <div>
          <button class="btn btn-primary btn-block btn-lg" @click="goToTargetRouter('/chicken-farm')">
            养鸡场 <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>

      <div class="farm-item">
        <div class="product">
          <p>种蛋</p>
          <p class="product-num">{{user.asset.breedingEgg}}只</p>
        </div>
        <div @click="showNumInput('buyEggs')">
          <p><img src="../../../assets/img/buy.png"></p>
          <p>买入</p>
        </div>
        <div @click="showNumInput('hatchEggs')">
          <p><img src="../../../assets/img/egg.png"></p>
          <p>孵化</p>
        </div>
      </div>

      <div class="farm-item">
        <div class="product">
          <p>种鸡</p>
          <p class="product-num">{{user.asset.breedingHens}}只</p>
        </div>
        <div @click="showNumInput('buyChicken')">
          <p><img src="../../../assets/img/buy.png"></p>
          <p>买入</p>
        </div>
        <div @click="showNumInput('stockingChicken')">
          <p><img src="../../../assets/img/ji.png"></p>
          <p>放养</p>
        </div>
      </div>

      <div class="farm-item">
        <div class="product">
          <p>在孵蛋</p>
          <p class="product-num">{{user.asset.hatchingEgg}}只</p>
        </div>
        <div>
          <!-- <p><img src="../../../assets/img/buy.png"></p>
          <p>买入</p> -->
        </div>
        <div>
          <!-- <p><img src="../../../assets/img/fy.png"></p>
          <p>卖出</p> -->
        </div>
      </div>

      <div class="farm-item">
        <div class="product">
          <p>在养鸡</p>
          <p class="product-num">{{user.asset.inHennery}}只</p>
        </div>
        <div>
          <!-- <p><img src="../../../assets/img/buy.png"></p>
          <p>买入</p> -->
        </div>
        <div>
          <!-- <p><img src="../../../assets/img/fy.png"></p>
          <p>卖出</p> -->
        </div>
      </div>

      <div class="farm-item">
        <div class="product">
          <p>商品蛋</p>
          <p class="product-num">{{user.asset.commodityEgg}}只</p>
        </div>
        <div>
          <!-- <p><img src="../../../assets/img/buy.png"></p>
          <p>买入</p> -->
        </div>
        <div @click="showNumInput('sellCommodityEggs')">
          <p><img src="../../../assets/img/fy.png"></p>
          <p>卖出</p>
        </div>
      </div>

      <div class="farm-item">
        <div class="product">
          <p>商品鸡</p>
          <p class="product-num">{{user.asset.commodityChicken}}只</p>
        </div>
        <div>
          <!-- <p><img src="../../../assets/img/buy.png"></p>
          <p>买入</p> -->
        </div>
        <div @click="showNumInput('sellCommodityChicken')">
          <p><img src="../../../assets/img/fy.png"></p>
          <p>卖出</p>
        </div>
      </div>
    </div>

    <b-modal ref="numInput" title="请输入数量" ok-title="确定" centered cancel-title="取消" @ok="saveNum()">
      请输入数量：<input type="text" class="number-input" v-model="inputNumber">
    </b-modal>
  </div>
</template>

<script>
import tokenService from '@/assets/js/tokenService'
import clientService from '@/assets/js/clientService'
import util from '@/assets/js/util'
export default {
  name: 'Fram',
  data () {
    return {
      user: undefined,
      inputNumber: '',
      saveType: '',
      order: {
        userId: '',
        commodityId: 1,
        type: 'supply',
        total: 0
      },
      hatch: {
        userId: '',
        total: 0
      },
      hennery: {
        number: 0
      }
    }
  },
  methods: {
    getUserInfo () {
      let userId = tokenService.decodeToken().id
      clientService.getUserInfo(userId).then(res => {
        this.user = res
      })
    },
    goToTargetRouter (url) {
      this.$router.push({path: url, query: {userId: this.user.id}})
    },
    showNumInput (clickType) {
      this.$refs.numInput.show()
      this.saveType = clickType
    },
    saveNum () {
      if (!util.regInteger(this.inputNumber)) {
        this.$message({message: '请输入正确的数量', type: 'error'})
        return
      }
      this.order.total = +this.inputNumber
      this.order.userId = this.user.id
      switch (this.saveType) {
        case 'buyEggs':
          this.saveBuyEggs()
          break
        case 'hatchEggs':
          this.saveHatchEggs()
          break
        case 'buyChicken':
          this.saveBuyChicken()
          break
        case 'stockingChicken':
          this.saveStockingChicken()
          break
        case 'sellCommodityEggs':
          this.saveSellCommodityEggs()
          break
        case 'sellCommodityChicken':
          this.saveSellCommodityChicken()
          break
      }
    },
    saveBuyEggs () { // 购买种蛋
      this.order.type = 'demand'
      this.order.commodityId = 2
      clientService.createOrder(this.order).then(res => {
        if (res.status === 200) {
          this.$message({message: '购买成功', type: 'success'})
          this.inputNumber = 0
          this.getUserInfo()
        } else {
          this.$message({message: res.message, type: 'error'})
        }
      })
    },
    saveHatchEggs () { // 添蛋到孵化房
      this.hatch.total = +this.inputNumber
      this.hatch.userId = this.user.id
      clientService.hatchEggs(this.hatch).then(res => {
        if (res.status === 200) {
          this.$message({message: '添蛋到孵化房成功', type: 'success'})
          this.inputNumber = 0
          this.getUserInfo()
        } else {
          this.$message({message: res.message, type: 'error'})
        }
      })
    },
    saveBuyChicken () { // 购买种鸡
      this.order.type = 'demand'
      this.order.commodityId = 1
      clientService.createOrder(this.order).then(res => {
        if (res.status === 200) {
          this.$message({message: '购买成功', type: 'success'})
          this.inputNumber = 0
          this.getUserInfo()
        } else {
          this.$message({message: res.message, type: 'error'})
        }
      })
    },
    saveStockingChicken () { // 放养鸡
      this.hennery.number = +this.inputNumber
      clientService.saveHennery(this.hennery).then(res => {
        if (res.status === 200) {
          this.$message({message: '放养成功', type: 'success'})
          this.inputNumber = 0
          this.getUserInfo()
        } else {
          this.$message({message: res.message, type: 'error'})
        }
      })
    },
    saveSellCommodityEggs () { // 出售商品蛋
      this.order.type = 'supply'
      this.order.commodityId = 2
      clientService.createOrder(this.order).then(res => {
        if (res.status === 200) {
          this.$message({message: '出售成功', type: 'success'})
          this.inputNumber = 0
          this.getUserInfo()
        } else {
          this.$message({message: res.message, type: 'error'})
        }
      })
    },
    saveSellCommodityChicken () { // 出售商品鸡
      this.order.type = 'supply'
      this.order.commodityId = 1
      clientService.createOrder(this.order).then(res => {
        if (res.status === 200) {
          this.$message({message: '出售成功', type: 'success'})
          this.inputNumber = 0
          this.getUserInfo()
        } else {
          this.$message({message: res.message, type: 'error'})
        }
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style>
  .farm-wrap {
    margin-top: 1rem;
  }
  .farm-button {
    margin-bottom: 1rem;
    overflow: hidden;
  }
  .farm-button div {
    float: left;
    padding: 0.5rem;
    width: 50%;
  }
  .farm-item {
    margin-bottom: 1rem;
    padding: 0.8rem 1rem;
    background: #fff;
    overflow: hidden;
  }
  .farm-item > div {
    float: left;
    width: 33.33%;
    text-align: center;
    font-size: 16px;
  }
  .farm-item .product p {
    font-size: 20px;
  }
  .farm-item p.product-num {
    color: #ff5155;
  }
  .farm-item p img {
    width: 3rem;
    height: 3rem;
  }
  .number-input {
    padding: 0.3rem;
    height:26px;
    font-size: 16px;
    border: 1px solid #ccc;
    outline: none;
    border-radius: 3px;
    vertical-align: middle;
  }
</style>
