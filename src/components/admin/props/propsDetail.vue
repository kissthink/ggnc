<template>
  <div>
    <div class="admin-title">道具详情</div>

    <div class="container-fluid">

      <div class="row">
        <div class="col-4">
          <div class="form-group">
            <label for="name">道具名称</label>
            <input type="text" class="form-control" id="name" v-model="props.name">
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-4">
          <div class="form-group">
            <label for="price">道具价格</label>
            <input type="number" class="form-control" id="price" v-model="props.price">
          </div>
        </div>
      </div>

      <button class="btn btn-info" @click="saveProps()" :disabled="isSaveing">
        保存<span v-if="isSaveing">中...</span>
      </button>
      <button class="btn btn-outline-dark" @click="backToList()">返回列表</button>
    </div>
  </div>
</template>

<script>
import adminService from '@/assets/js/adminService'
import util from '@/assets/js/util'
export default {
  name: 'PropsDetail',
  data () {
    return {
      props: '',
      isSaveing: false
    }
  },
  methods: {
    getPropsDetail () {
      let id = +this.$route.params.id
      if (id > 0) {
        adminService.getPropsDetail(id).then(res => {
          this.props = res
        })
      }
    },
    saveProps () {
      if (this.isSaveing) {
        return
      }
      if (!util.regAmount(this.props.price)) {
        return
      }
      this.isSaveing = true
      adminService.updatePropsDetail(this.props).then(res => {
        this.isSaveing = false
        if (res.status > 200) {
          this.$message({message: '保存失败', type: 'error'})
        } else {
          this.$message({message: '保存成功', type: 'success'})
          this.$router.push('/admin/props-list')
        }
      })
    },
    backToList () {
      this.$router.push('/admin/props-list')
    }
  },
  mounted () {
    this.getPropsDetail()
  }
}
</script>

<style>

</style>
