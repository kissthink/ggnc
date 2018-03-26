<template>
  <div class="new-mamber">
    <h4 class="h4-title">注册新会员</h4>
    <back-history></back-history>

    <div class="form-wrap">
      <b-form>
        <b-form-group id="refereesId"
                    label="推荐人昵称："
                    label-for="refereesName">
          <b-form-input id="refereesName" size="lg" type="text" readonly v-model="masterName"></b-form-input>
        </b-form-group>

        <b-form-group id="memberName"
                    label="会员昵称："
                    label-for="memberName">
          <b-form-input id="memberName" size="lg"
                        type="text" placeholder="请输入会员昵称"
                        v-model="newMamber.nickName"></b-form-input>
        </b-form-group>

        <b-form-group id="memberPhone"
                    label="会员手机号："
                    label-for="memberPhone">
          <b-form-input id="memberPhone" size="lg"
                        type="number" placeholder="请输入会员手机号"
                        v-model="newMamber.mobile"></b-form-input>
        </b-form-group>

        <b-form-group id="memberPassword"
                    label="会员登陆密码："
                    label-for="memberPassword">
          <b-form-input id="memberPassword" size="lg"
                        type="password" placeholder="请输入会员登陆密码"
                        v-model="newMamber.password"></b-form-input>
        </b-form-group>

        <b-form-group id="payPassword1"
                    label="会员交易密码："
                    label-for="payPassword1">
          <b-form-input id="payPassword1" size="lg"
                  type="password" placeholder="请输入交易密码"
                  v-model="newMamber.payPassword"></b-form-input>
        </b-form-group>

        <b-form-group id="payPassword2"
                    label="确认交易密码："
                    label-for="payPassword2">
          <b-form-input id="payPassword2" size="lg"
                        type="password" placeholder="请再次输入交易密码"
                        v-model="regPayPassword"></b-form-input>
        </b-form-group>

        <button class="btn btn-block btn-info btn-lg mb-3" @click.prevent="save()" :disabled="isSaving">
          保存<span v-if="isSaving">中...</span>
        </button>
        <button class="btn btn-block btn-default btn-lg" @click.prevent="cancelForm()">取消</button>
      </b-form>
    </div>
  </div>
</template>

<script>
import clientService from '@/assets/js/clientService'
import util from '@/assets/js/util'
export default {
  name: 'NewMamber',
  data () {
    return {
      masterName: '',
      newMamber: {
        nickName: '',
        mobile: '',
        password: '',
        payPassword: '',
        inviterId: ''
      },
      regPayPassword: '',
      isSaving: false
    }
  },
  methods: {
    getMasterInfo () {
      this.masterName = decodeURI(this.$route.query.masterName)
      this.newMamber.inviterId = this.$route.query.masterId
    },
    save () {
      if (this.isSaving) {
        return
      }
      if (!util.regMobile(this.newMamber.mobile)) {
        this.$message({message: '请输入正确的手机号码', type: 'error'})
        return
      }
      if (!util.regPassword(this.newMamber.password)) {
        this.$message({message: '请输入6~20位的密码', type: 'error'})
        return
      }
      if (!util.regPassword(this.newMamber.payPassword)) {
        this.$message({message: '请输入6~20位的交易密码', type: 'error'})
        return
      }
      if (this.newMamber.payPassword !== this.regPayPassword) {
        this.$message({message: '两次输入的密码不一致', type: 'error'})
        return
      }
      this.isSaving = true
      clientService.registerUser(this.newMamber).then(res => {
        this.isSaving = false
        if (res.status === 200) {
          this.$message({message: '注册用户成功', type: 'success'})
          this.newMamber.nickName = ''
          this.newMamber.mobile = ''
          this.newMamber.password = ''
          this.newMamber.payPassword = ''
          this.regPayPassword = ''
          this.$router.push('/login')
        } else if (res.status === 1000) {
          this.$message({message: '手机号已注册', type: 'error'})
        } else {
          this.$message({message: '注册用户失败', type: 'error'})
        }
      })
    },
    cancelForm () {
      this.$router.push('/my/information')
    }
  },
  mounted () {
    this.getMasterInfo()
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
