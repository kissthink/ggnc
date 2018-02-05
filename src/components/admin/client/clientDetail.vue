<template>
  <div>
    <h4 class="dashboard-title">用户信息</h4>
  </div>
</template>

<script>
export default {
  name: 'ClientDetail',
  data () {
    return {
      user: ''
    }
  },
  methods: {

  },
  mounted () {
    // let id = +this.$route.params.id
    // if (id > 0) {
    //   axiosService.get(axiosService.USER_DETAIL, id).then(res => {
    //     this.user = res.data.user
    //   })
    // }
  }
}
</script>

<style>

</style>
