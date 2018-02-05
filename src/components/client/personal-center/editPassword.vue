<template>
  <div class="edit-pw">
    <h4 class="h4-title">修改密码</h4>
    <back-history></back-history>

    <div class="form-wrap mt-2">
      <b-form>
        <b-form-group id="oldPassword"
                    label="旧密码："
                    label-for="oldPassword">
          <b-form-input id="oldPassword"
                        type="password"
                        required
                        placeholder="请输入旧密码">
          </b-form-input>
        </b-form-group>

        <b-form-group id="newPassword1"
                    label="新密码："
                    label-for="newPassword1">
          <b-form-input id="newPassword1"
                        type="password"
                        required
                        placeholder="请输入新密码">
          </b-form-input>
        </b-form-group>

        <b-form-group id="newPassword2"
                    label="确认新密码："
                    label-for="newPassword2">
          <b-form-input id="newPassword2"
                        type="password"
                        required
                        placeholder="请再次输入密码：">
          </b-form-input>
        </b-form-group>

        <button class="btn btn-block btn-info mb-3">保存</button>
        <button class="btn btn-block btn-default" @click.prevent="cancelForm()">取消</button>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditPassword',
  data () {
    return {}
  },
  methods: {
    cancelForm () {
      this.$router.push('/my/information')
    }
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
