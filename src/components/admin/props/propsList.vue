<template>
  <div>
    <h4 class="admin-title">道具列表</h4>

    <table class="table table-hover table-bordered">
      <thead class="table-active">
        <th>ID</th>
        <th>名称</th>
        <th>价格</th>
      </thead>
      <tbody v-if="propsList.length > 0">
        <tr v-for="props of propsList" :key="props.id">
          <td>{{props.id}}</td>
          <td><a href="jvascript:void(0);" @click="selectProps(props)">{{props.name}}</a></td>
          <td>{{props.price}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import adminService from '@/assets/js/adminService'
export default {
  name: 'PropsList',
  data () {
    return {
      propsList: []
    }
  },
  methods: {
    getPropsList () {
      adminService.getPropsList().then(res => {
        this.propsList = res
      })
    },
    selectProps (props) {
      this.$router.push(`/admin/props-detail/${props.id}`)
    }
  },
  created () {
    this.getPropsList()
  }
}
</script>

<style>

</style>
