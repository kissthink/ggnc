<template>
  <div>
    <h4 class="admin-title">用户列表</h4>

    <table class="table table-hover table-bordered">
      <thead class="table-active">
        <th>id</th>
        <th>昵称</th>
        <th>手机号码</th>
        <th>账户余额</th>
        <th>是否实名</th>
        <th>操作</th>
      </thead>
      <tbody>
        <tr v-for="user of userList" :key="user.id">
          <td>{{user.id}}</td>
          <td><a href="javascript:void(0);" @click="selectClient(user)">{{user.nickName}}</a></td>
          <td>{{user.mobile}}</td>
          <td>{{user.asset.balance}} {{switchAssetMessage}}</td>
          <td>{{isRealName(user)}}</td>
          <td>
            <button class="btn btn-info btn-sm" @click="switchEnable(user)">{{isEnable(user)}}</button>
            <button class="btn btn-danger btn-sm" @click="switchAsset(user)">冻结/解冻余额</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import adminService from '@/assets/js/adminService'
export default {
  name: 'UserList',
  data () {
    return {
      userList: '',
      switchAssetMessage: ''
    }
  },
  methods: {
    selectClient (user) {
      this.$router.push(`/admin/client-detail/${user.id}`)
    },
    isRealName (user) {
      return user.userInfo ? '是' : '否'
    },
    isEnable (user) {
      return user.enable ? '禁用' : '启用'
    },
    switchEnable (user) {
      user.enable = !user.enable
      adminService.switchUserEnable(user).then(res => {
        if (!res) {
          this.$message({message: `成功禁用用户“${user.nickName}”`, type: 'success'})
        } else {
          this.$message({message: `成功启用用户“${user.nickName}”`, type: 'success'})
        }
      })
    },
    switchAsset (user) {
      user.blocked = !user.blocked
      adminService.switchAssetUser(user).then(res => {
        if (res) {
          this.switchAssetMessage = '(已冻结)'
          this.$message({message: `成功冻结“${user.nickName}”的余额`, type: 'success'})
        } else {
          this.switchAssetMessage = ''
          this.$message({message: `成功解冻“${user.nickName}”的余额`, type: 'success'})
        }
      })
    }
  },
  beforeCreate () {
    adminService.getUserList().then(res => {
      this.userList = res
    })
  }
}
</script>

<style>

</style>
