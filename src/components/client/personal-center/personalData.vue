<template>
  <div class="detail">
    <h4 class="h4-title">个人资料</h4>
    <back-history></back-history>

    <div class="user-detail">
      <b-form>
        <div class="form-title">基本信息</div>
        <b-form-group id="userName"
                    label="账号昵称："
                    label-for="userName">
          <b-form-input id="userName"
                        type="text"
                        required
                        placeholder="请输入昵称">
          </b-form-input>
        </b-form-group>

        <b-form-group id="mobilePhone"
                    label="手机号码："
                    label-for="mobilePhone">
          <b-form-input id="mobilePhone"
                        type="number"
                        required
                        placeholder="请输入手机号码">
          </b-form-input>
        </b-form-group>

        <b-form-group id="region"
                    label="地区："
                    label-for="region">
          <b-form-select v-model="selectedProvince" :options="provinceOptions" />
          <b-form-select class="mt-2" v-if="selectedProvince" v-model="selectedCity" :options="provinceOptions" />
        </b-form-group>

        <button class="btn btn-block btn-info mb-3">保存</button>
        <button class="btn btn-block btn-default" @click.prevent="cancelForm()">取消</button>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonalData',
  data () {
    return {
      selectedProvince: null,
      selectedCity: null,
      provinceOptions: [
        {value: null, text: '请选择省份', disabled: true},
        {value: '北京', text: '北京'},
        {value: '广东', text: '广东'},
        {value: '上海', text: '上海'},
        {value: '江苏', text: '江苏'},
        {value: '云南', text: '云南'}
      ]
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
  .detail {
    padding:56px 0 2.2rem;
    font-size: 14px;
  }
  .user-detail {
    padding: 1.5rem 1.5rem 0;
  }
  .user-detail .form-title {
    margin: 0 0 1rem;
    color: #17a2b8;
  }
  .user-detail button {
    font-size: 14px;
  }
</style>
