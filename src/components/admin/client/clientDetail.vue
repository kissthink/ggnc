<template>
  <div>
    <h4 class="admin-title">用户信息</h4>
  </div>
</template>

<script>
import adminService from '@/assets/js/adminService.js'
export default {
  name: 'ClientDetail',
  data () {
    return {
      userInfo: ''
    }
  },
  methods: {

  },
  mounted () {
    let id = +this.$route.params.id
    if (id > 0) {
      adminService.getUserDetail(id).then(res => {
        this.userInfo = res
      })
    }
  }
}
</script>

<style>

</style>
