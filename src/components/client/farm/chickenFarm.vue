<template>
  <div class="hennery-warp">
    <h4 class="h4-title">养鸡场</h4>
    <back-history></back-history>

    <div class="btn-wrap">
      <button class="btn btn-danger btn-lg" @click="feedAllHennery()">喂养全部</button>
      <button class="btn btn-info btn-lg" @click="getGranary()">我的道具</button>
      <button class="btn btn-info btn-lg" @click="buyProps()">购买</button>
      <div class="history-btn">
        <button class="btn btn-primary btn-lg" @click="harvestList()">收获列表</button>
      </div>
    </div>

    <div class="hennery">
      <div class="in-hennery-list">
        <div class="in-hennery-item"
             v-for="hennery of henneries"
             :key="hennery.id"
             @click="feedHennery(hennery)">
          <div class="hennery-room">{{hennery.total}}只</div>
          <div class="hennery-detail">
            <p>放养时间： {{hennery.createDate | transformTime}}</p>
            <p>
              <span>喂养天数： {{hennery.validDays}}</span>
              <span v-if="hennery.illDays > 0">(已生病{{hennery.illDays}}天)</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <b-modal ref="granary" title="鸡粮和道具" ok-title="确定" ok-only centered>
      <div class="granary-list">
        <p>剩余鸡粮：{{granary.grain}}</p>
        <p>剩余急救包：{{granary.aidKit}}</p>
      </div>
    </b-modal>

    <b-modal ref="buyProps" title="购买鸡粮或道具" ok-title="确定" cancel-title="取消" centered @ok="saveBuyProps()">
      <div class="buy-props">
        <button class="btn" :class="{'btn-primary': isBuyGrain}" @click="isBuyGrain = true">鸡粮</button>
        <button class="btn" :class="{'btn-primary': !isBuyGrain}" @click="isBuyGrain = false">急救包</button>
        <div class="form-group mt-1">
          <label for="propsNumber">请输入数量:</label>
          <input type="number" class="form-control" v-model="propsNumber">
          <small v-if="!isShowMessage">
            单价是：
            <span v-if="isBuyGrain">{{grainDetail.price}}</span>
            <span v-if="!isBuyGrain">{{aidkitDetail.price}}</span>,
            总价是：
            <span v-if="isBuyGrain">{{totalGrainPrice}}</span>
            <span v-if="!isBuyGrain">{{totalAidkitPrice}}</span>
          </small>
          <small v-if="isShowMessage">请输入正确的数量</small>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import clientService from '@/assets/js/clientService'
import util from '@/assets/js/util'
export default {
  name: 'ChickenFarm',
  data () {
    return {
      henneries: [],
      granary: {},
      isBuyGrain: true,
      propsNumber: '',
      grainDetail: {},
      aidkitDetail: {},
      isShowMessage: false
    }
  },
  computed: {
    totalGrainPrice () {
      return this.grainDetail.price * (this.propsNumber || 0)
    },
    totalAidkitPrice () {
      return this.aidkitDetail.price * (this.propsNumber || 0)
    }
  },
  watch: {
    propsNumber (newNumber) {
      this.isShowMessage = !util.regInteger(newNumber)
    }
  },
  methods: {
    getInHennery () {
      clientService.getInHenneryList().then(res => {
        this.henneries = res
      })
    },
    getGrainDetail () {
      clientService.getGrainDetail().then(res => {
        this.grainDetail = res
      })
    },
    getAidkitDetail () {
      clientService.getAidkitDetail().then(res => {
        this.aidkitDetail = res
      })
    },
    feedHennery (hennery) {
      if (hennery.status === 2) {
        if (window.confirm(`是否使用急救包?`)) {
          clientService.aidkitHennery(hennery.id).then(res => {
            if (res.status === 200) {
              this.$message({message: '使用急救包成功', type: 'success'})
              this.getInHennery()
            } else {
              this.$message({message: res.message, type: 'error'})
            }
          })
        }
      } else if (window.confirm(`确定喂养这${hennery.total}只鸡？`)) {
        clientService.feedHennery(hennery.id).then(res => {
          if (res.status === 200) {
            this.$message({message: '喂养成功', type: 'success'})
            this.getInHennery()
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      }
    },
    feedAllHennery () {
      if (window.confirm('确定喂养全部鸡？')) {
        clientService.feedAllHennery().then(res => {
          if (res.status === 200) {
            this.$message({message: '喂养成功', type: 'success'})
            this.getInHennery()
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      }
    },
    getGranary () {
      clientService.getUserGranary().then(res => {
        this.granary = res
        this.$refs.granary.show()
      })
    },
    buyProps () {
      this.getGrainDetail()
      this.getAidkitDetail()
      this.$refs.buyProps.show()
    },
    saveBuyProps () {
      if (this.isShowMessage) {
        this.$message({message: '请输入正确的数量', type: 'error'})
        return
      }
      let propsNumberObject = {number: this.propsNumber}
      if (this.isBuyGrain) {
        clientService.buyGrain(propsNumberObject).then(res => {
          if (res.status === 200) {
            this.$message({message: '购买成功', type: 'success'})
            this.propsNumber = 0
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      } else {
        clientService.buyAidKit(propsNumberObject).then(res => {
          if (res.status === 200) {
            this.$message({message: '购买成功', type: 'success'})
            this.propsNumber = 0
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      }
    },
    harvestList () {
      this.$router.push('/harvest-list')
    }
  },
  created () {
    this.getInHennery()
  }
}
</script>

<style>
  .btn-wrap {
    margin: 1rem;
    overflow: hidden;
  }
  .history-btn {
    float: right;
    margin-right: 1rem;
  }
  .hennery-warp {
    padding: 56px 0 0;
  }
  .hennery {
    padding: 1rem;
  }
  .hennery .in-hennery-list {
    overflow: hidden;
  }
  .hennery .in-hennery-item {
    float: left;
    margin-bottom: .8rem;
    width: 50%;
    text-align: center;
  }
  .hennery .hennery-room {
    margin: 0 auto;
    width: 6.171rem;
    height: 6.171rem;
    line-height: 7.171rem;
    background: url('../../../assets/img/house.png') no-repeat;
    background-size: 100%;
    font-size: 16px;
    color: #dc3545;
    font-weight: 600;
  }
  .granary-list,
  .buy-props {
    font-size: 14px;
  }
  .buy-props small {
    color: #dc3545;
  }
</style>
