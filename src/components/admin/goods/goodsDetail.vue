<template>
  <div>
    <h4 class="admin-title">商品详情</h4>

    <div class="container-fluid">

      <div class="row">
        <div class="col-4">
          <div class="form-group">
            <label for="name">商品名称</label>
            <input type="text" class="form-control" id="name" v-model="goods.name">
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-4">
          <div class="form-group">
            <label for="price">商品价格</label>
            <input type="text" class="form-control" id="price" v-model="goods.price">
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-4">
          <div class="form-group">
            <label for="dayLimit">日限额</label>
            <input type="number" class="form-control" id="dayLimit" v-model="goods.dayLimit">
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-4">
          <div class="form-group">
            <label for="monthLimit">月限额</label>
            <input type="number" class="form-control" id="monthLimit" v-model="goods.monthLimit">
          </div>
        </div>
      </div>

      <button class="btn btn-info" @click="saveGoods()">保存</button>
      <button class="btn btn-outline-dark" @click="backToGoodsList()">返回列表</button>

    </div>
  </div>
</template>

<script>
import adminService from '@/assets/js/adminService.js'
import util from '@/assets/js/util.js'
export default {
  name: 'GoodsDetail',
  data () {
    return {
      goods: ''
    }
  },
  methods: {
    getGoodsDetail () {
      let id = +this.$route.params.id
      if (id > 0) {
        adminService.getGoodsDetail(id).then(res => {
          this.goods = res
        })
      }
    },
    saveGoods () {
      if (!util.regAmount(this.goods.price)) {
        this.$message({message: '请输入正确的价格', type: 'error'})
        return
      }
      if (!util.regInteger(this.goods.dayLimit) || !util.regInteger(this.goods.monthLimit)) {
        this.$message({message: '请输入正确的数量', type: 'error'})
        return
      }
      adminService.updateGoodsDetail(this.goods).then(res => {
        if (res.status > 200) {
          this.$message({message: '修改商品信息失败', type: 'error'})
        } else {
          this.$message({message: '修改商品信息成功', type: 'success'})
          this.$router.push('/admin/goods-list')
        }
      })
    },
    backToGoodsList () {
      this.$router.push('/admin/goods-list')
    }
  },
  mounted () {
    this.getGoodsDetail()
  }
}
</script>

<style>

</style>
