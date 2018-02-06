<template>
  <div>
    <h4 class="admin-title">商品列表</h4>

    <table class="table table-hover table-bordered">
      <thead class="table-active">
        <th>id</th>
        <th>商品名称</th>
        <th>售价</th>
        <th>日限额</th>
        <th>月限额</th>
      </thead>
      <tbody>
        <tr v-for="goods of goodsList" :key="goods.id">
          <td>{{goods.id}}</td>
          <td><a href="javascript:void(0);" @click="selectGoods(goods.id)">{{goods.name}}</a></td>
          <td>{{goods.price}}</td>
          <td>{{goods.dayLimit}}</td>
          <td>{{goods.monthLimit}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import adminService from '@/assets/js/adminService'
export default {
  name: 'GoodsList',
  data () {
    return {
      goodsList: ''
    }
  },
  methods: {
    selectGoods (id) {
      this.$router.push(`/admin/goods-detail/${id}`)
    }
  },
  beforeCreate () {
    adminService.getGoodsList().then(res => {
      this.goodsList = res
    })
  }
}
</script>

<style>

</style>
