<template>
  <div>
    <h4 class="admin-title">首页图片管理</h4>

    <div class="add mb-3">
      <button class="btn btn-info btn-lg" @click="addIndexImg()">新增图片</button>
    </div>

    <table class="table table-hover">
      <thead class="table-active">
        <th>序号</th>
        <th>路径</th>
        <th>描述</th>
        <th>操作</th>
      </thead>
      <tbody v-if="images.length > 0">
        <tr v-for="(image, index) of images" :key="image.id">
          <td>{{index + 1}}</td>
          <td>{{image.imageUrl}}</td>
          <td>{{image.remark}}</td>
          <td>
            <button class="btn btn-primary" @click="changeImage(image)">修改</button>
            <button class="btn btn-danger" @click="delImage(image)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import adminService from '@/assets/js/adminService'
export default {
  name: 'IndexImgs',
  data () {
    return {
      images: []
    }
  },
  methods: {
    getIndexImgs () {
      adminService.getIndexImgs().then(res => {
        this.images = res
      })
    },
    addIndexImg () {
      this.$router.push('/admin/new-index-img')
    },
    changeImage (img) {
      this.$router.push(`/admin/index-img-detail/${img.id}`)
    },
    delImage (img) {
      if (!window.confirm('确定删除该图片吗？')) return
      adminService.delIndexImage(img.id).then(res => {
        if (res.status === 200) {
          this.$message({message: '删除成功', type: 'success'})
          this.getIndexImgs()
        } else {
          this.$message({message: res.message, type: 'error'})
        }
      })
    }
  },
  created () {
    this.getIndexImgs()
  }
}
</script>

<style scoped>

</style>
