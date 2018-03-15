<template>
  <div class="transfer-account">
    <h4 class="h4-title">转账</h4>
    <back-history></back-history>

    <div class="mt-4 mb-4">
      <el-input placeholder="请输入对方的手机号码" v-model="mobile">
        <template slot="prepend">手机</template>
      </el-input>
      <small v-if="isShowMobileMessage">请输入正确的手机号码</small>
    </div>

    <div class="mt-4 mb-4">
      <el-input placeholder="请输入转账金额" v-model="acount">
        <template slot="prepend">金额</template>
      </el-input>
    </div>

    <button class="btn btn-primary btn-lg btn-block" @click="showModel()">下一步</button>

    <b-modal ref="password" title="请输入交易密码" ok-title="确定" centered cancel-title="取消">
      <el-input v-model="password" class="text-center"></el-input>
    </b-modal>
  </div>
</template>

<script>
import util from '@/assets/js/util'
export default {
  name: 'TransferAccount',
  data () {
    return {
      mobile: '',
      password: '',
      acount: '',
      isShowMobileMessage: false
    }
  },
  methods: {
    showModel () {
      this.isShowMobileMessage = false
      if (!util.regMobile(this.mobile)) {
        this.isShowMobileMessage = true
        return
      }
      this.$refs.password.show()
    }
  }
}
</script>

<style>
  .transfer-account {
    padding: 56px 1rem 1rem;
  }
  .transfer-account small {
    color: #dc3545;
  }
</style>
