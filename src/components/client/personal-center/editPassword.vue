<template>
  <div class="edit-pw">
    <h4 class="h4-title">修改登录密码</h4>
    <back-history></back-history>

    <div class="form-wrap mt-2">
      <b-form>
        <b-form-group id="oldPassword"
                    label="旧密码："
                    label-for="oldPassword">
          <b-form-input id="oldPassword"
                        type="password"
                        required
                        placeholder="请输入旧密码"
                        v-model="userPassword.oldPassword">
          </b-form-input>
        </b-form-group>

        <b-form-group id="newPassword1"
                    label="新密码："
                    label-for="newPassword1">
          <b-form-input id="newPassword1"
                        type="password"
                        required
                        placeholder="请输入新密码"
                        v-model="userPassword.newPassword">
          </b-form-input>
        </b-form-group>

        <b-form-group id="newPassword2"
                    label="确认新密码："
                    label-for="newPassword2">
          <b-form-input id="newPassword2"
                        type="password"
                        required
                        placeholder="请再次输入密码："
                        v-model="regNewPassword">
          </b-form-input>
        </b-form-group>

        <button class="btn btn-block btn-info mb-3" @click.prevent="changePassword()">保存</button>
        <button class="btn btn-block btn-default" @click.prevent="cancelForm()">取消</button>
      </b-form>
    </div>
  </div>
</template>

<script>
import clientService from '@/assets/js/clientService'
export default {
  name: 'EditPassword',
  data () {
    return {
      userPassword: {
        userId: '',
        oldPassword: '',
        newPassword: ''
      },
      regNewPassword: ''
    }
  },
  methods: {
    changePassword () {
      if (this.userPassword.oldPassword === '') return
      if (this.userPassword.newPassword === '') return
      if (this.userPassword.newPassword !== this.regNewPassword) {
        this.$message({message: '两次输入的密码不一致', type: 'error'})
        return
      }
      clientService.changePassword(this.userPassword).then(res => {
        if (res.status === 200) {
          this.$message({message: '修改密码成功', type: 'success'})
          this.$router.push('/my/information')
        } else {
          this.$message({message: res.message, type: 'error'})
        }
      })
    },
    cancelForm () {
      this.$router.push('/my/information')
    }
  },
  mounted () {
    this.userPassword.userId = +this.$route.query.userId
  }
}
</script>

<style>
  .edit-pw {
    padding: 56px 1rem 0;
    font-size: 14px;
  }
  .form-wrap {
    padding: 1rem;
  }
  .form-wrap button {
    font-size: 14px;
  }
</style>
