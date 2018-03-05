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
          <td>{{user.asset.balance}} {{isBlocked(user)}}</td>
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
    getUserList () {
      adminService.getUserList().then(res => {
        this.userList = res
      })
    },
    selectClient (user) {
      this.$router.push(`/admin/client-detail/${user.id}`)
    },
    isRealName (user) {
      return user.userInfo ? '是' : '否'
    },
    isEnable (user) {
      return user.enable ? '禁用' : '启用'
    },
    isBlocked (user) {
      return user.asset.blocked ? '(已冻结)' : ''
    },
    switchEnable (user) {
      user.enable = !user.enable
      adminService.switchUserEnable(user).then(res => {
        if (res.status > 200) {
          this.$message({message: `禁用/启用用户“${user.nickName}”失败`, type: 'success'})
        } else {
          if (!res.data.enable) {
            this.$message({message: `已禁用用户“${user.nickName}”`, type: 'success'})
          } else {
            this.$message({message: `已启用用户“${user.nickName}”`, type: 'success'})
          }
        }
      })
    },
    switchAsset (user) {
      user.blocked = !user.blocked
      adminService.switchAssetUser(user).then(res => {
        if (res.status > 200) {
          this.$message({message: `冻结/解冻“${user.nickName}”的余额失败`, type: 'error'})
        } else {
          if (res) {
            this.$message({message: `成功冻结“${user.nickName}”的余额`, type: 'success'})
            this.getUserList()
          } else {
            this.$message({message: `成功解冻“${user.nickName}”的余额`, type: 'success'})
            this.getUserList()
          }
        }
      })
    }
  },
  created () {
    this.getUserList()
  }
}
</script>

<style>

</style>
