<template>
  <div>
    <h4 class="h4-title">我的农场</h4>
  </div>
</template>

<script>
import tokenService from '@/assets/js/tokenService'
import clientService from '@/assets/js/clientService'
export default {
  name: 'Fram',
  data () {
    return {
      user: ''
    }
  },
  methods: {
    getUserInfo () {
      let userId = tokenService.decodeToken().id
      clientService.getUserInfo(userId).then(res => {
        this.user = res
        console.log(res.asset)
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style>

</style>
