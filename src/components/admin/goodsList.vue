<template>
  <div>
    <h4 class="dashboard-title">商品列表</h4>

    <table class="table table-hover table-bordered">
      <thead class="table-active">
        <th>id</th>
        <th>商品名称</th>
        <th>售价</th>
        <th>日限额</th>
        <th>月限额</th>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td><a href="/dashboard/user-detail">鸡</a></td>
          <td>4</td>
          <td>100</td>
          <td>3100</td>
        </tr>
        <tr>
          <td>2</td>
          <td><a href="/dashboard/goods-detail">蛋</a></td>
          <td>0.5</td>
          <td>100</td>
          <td>3100</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'GoodsList',
  data () {
    return {}
  },
  methods: {

  }
}
</script>

<style>

</style>
