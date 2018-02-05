<template>
  <div>
    <h4 class="dashboard-title">用户列表</h4>

    <table class="table table-hover table-bordered">
      <thead class="table-active">
        <th>id</th>
        <th>昵称</th>
        <th>手机号码</th>
        <th>是否实名</th>
        <th>操作</th>
      </thead>
      <tbody>
        <tr v-for="user of userList" :key="user.id">
          <td>{{user.id}}</td>
          <td><a href="javascript:void(0);" @click="selectClient(user.id)">{{user.nickName}}</a></td>
          <td>{{user.mobile}}</td>
          <td>是</td>
          <td>
            <button class="btn btn-info btn-sm" @click="toggerEnable(user.id)">禁用</button>
            <button class="btn btn-danger btn-sm">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import * as axiosService from '@/assets/js/axiosService.js'
export default {
  name: 'UserList',
  data () {
    return {
      userList: ''
    }
  },
  methods: {
    selectClient (userId) {
      this.$router.push(`/dashboard/client-detail/${userId}`)
    },
    toggerEnable (userId) {
      axiosService.patch(axiosService.USER_SWITCH, userId).then(res => {
        console.log(res)
      })
    }
  },
  beforeCreate () {
    axiosService.getAll(axiosService.USER_LIST).then(res => {
      this.userList = res.data.userList
    })
  }
}
</script>

<style>

</style>
