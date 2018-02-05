<template>
  <div class="new-mamber">
    <h4 class="h4-title">注册新会员</h4>
    <back-history></back-history>

    <div class="form-wrap">
      <b-form>
        <b-form-group id="refereesId"
                    label="推荐人ID："
                    label-for="refereesId">
          <b-form-input id="refereesId" size="lg" type="text" readonly></b-form-input>
        </b-form-group>

        <b-form-group id="memberName"
                    label="会员昵称："
                    label-for="memberName">
          <b-form-input id="memberName" size="lg" type="text" placeholder="请输入会员昵称"></b-form-input>
        </b-form-group>

        <b-form-group id="memberPhone"
                    label="会员手机号："
                    label-for="memberPhone">
          <b-form-input id="memberPhone" size="lg" type="number" placeholder="请输入会员手机号"></b-form-input>
        </b-form-group>

        <b-form-group id="memberPassword"
                    label="会员登陆密码："
                    label-for="memberPassword">
          <b-form-input id="memberPassword" size="lg" type="password" placeholder="请输入会员登陆密码"></b-form-input>
        </b-form-group>

        <b-form-group id="payPassword1"
                    label="会员交易密码："
                    label-for="payPassword1">
          <b-form-input id="payPassword1" size="lg" type="password" placeholder="请输入交易密码"></b-form-input>
        </b-form-group>

        <b-form-group id="payPassword2"
                    label="确认密码："
                    label-for="payPassword2">
          <b-form-input id="payPassword2" size="lg" type="password" placeholder="请再次输入交易密码"></b-form-input>
        </b-form-group>

        <button class="btn btn-block btn-info btn-lg mb-3">保存</button>
        <button class="btn btn-block btn-default btn-lg" @click.prevent="cancelForm()">取消</button>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewMamber',
  data () {
    return {

    }
  },
  methods: {
    cancelForm () {
      this.$router.push('/my/information')
    }
  }
}
</script>

<style>
  .new-mamber {
    padding: 56px 1.5rem 0;
    font-size: 14px;
  }
  .form-wrap {
    margin-top: 1.5rem;
  }
  .form-wrap button {
    font-size: 14px;
  }
</style>
