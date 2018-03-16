<template>
  <div class="top-up">
    <h4 class="h4-title">账号充值</h4>
    <back-history></back-history>

    <div class="amount">
      <p>请选择充值金额:</p>
      <div class="amount-item">
        <client-amount-select v-on:selectAmount="selectTopUpAmount($event)"></client-amount-select>
      </div>
      <button class="btn btn-info btn-lg btn-block" @click="confirmAmount()">下一步</button>
    </div>

    <b-modal ref="password" title="请输入交易密码" ok-title="确定" centered cancel-title="取消">
      <el-input v-model="password" class="text-center"></el-input>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'TopUp',
  data () {
    return {
      amount: 0,
      password: ''
    }
  },
  methods: {
    selectTopUpAmount (amount) {
      this.amount = amount
    },
    confirmAmount () {
      this.$refs.password.show()
    }
  }
}
</script>

<style scoped>
  .top-up {
    padding-top: 56px;
  }
  .amount {
    margin-top: 1rem;
    padding: 1rem;
  }
  .amount p {
    color: #dc3545;
    font-size: 14px;
  }
  .amount .amount-item {
    padding: 1rem 0;
  }
</style>
