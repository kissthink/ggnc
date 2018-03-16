<template>
  <div>
    <h4 class="admin-title">首页图片详情</h4>

    <div class="container-fluid">
      <div class="row">
        <div class="col-6">
          <b-form-group id="wechatWithdrawCode"
                        label="图片："
                        label-for="wechatWithdrawCode">
            <b-form-file accept=".jpg, .png, .gif" @change="selectImg($event)"
                         placeholder="选择图片"></b-form-file>
          </b-form-group>
        </div>
      </div>

      <div class="row" v-if="imgUrl">
        <div class="col-6">
          <div class="img-container">
            <img :src="imgUrl" alt="images">
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <b-form-group id="wechatWithdrawCode"
                        label="图片描述："
                        label-for="wechatWithdrawCode">
            <b-form-textarea id="textarea1"
                           label="text"
                           placeholder="请输入图片描述"
                           v-model="imageObj.remark"
                           :rows="3"
                           :max-rows="6">
            </b-form-textarea>
          </b-form-group>
        </div>
      </div>

      <button class="btn btn-info btn-lg" @click="saveIndexImg()">保存</button>
      <button class="btn btn-outline-dark btn-lg" @click="backImgList()">返回</button>
    </div>
  </div>
</template>

<script>
import adminService from '@/assets/js/adminService'
import axios from 'axios'
export default {
  name: 'IndeximgDetail',
  data () {
    return {
      imgUrl: null,
      imgFile: null,
      imgId: 0,
      imageObj: {
        id: '',
        imageUrl: '',
        remark: ''
      }
    }
  },
  methods: {
    getImgObj () {
      this.imgId = this.$route.params.id
      let url = axios.defaults.baseURL
      if (this.imgId > 0) {
        adminService.getIndexImageDetail(this.imgId).then(res => {
          this.imgUrl = `${url}${res.imageUrl}`
          this.imageObj.id = res.id
          this.imageObj.imageUrl = res.imageUrl
          this.imageObj.remark = res.remark
        })
      }
    },
    selectImg (file) { // 选择图片
      this.imgFile = file.target.files
      if (this.imgFile.length > 0) {
        this.viewImg(this.imgFile[0])
      }
    },
    viewImg (file) { // 展示图片
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
        this.imgUrl = event.target.result
      }
    },
    uploadImg (files) { // 上传图片
      adminService.uploadIndexImage(files[0]).then(res => {
        if (res.status === 200) {
          this.imageObj.imageUrl = res.data.filePath
          if (this.imgId > 0) {
            this.changeIndexImgDetail()
          } else {
            this.saveForm()
          }
        } else {
          this.$message({message: res.message, type: 'error'})
        }
      })
    },
    saveIndexImg () {
      if (this.imgFile) {
        this.uploadImg(this.imgFile)
      } else {
        this.changeIndexImgDetail()
      }
    },
    saveForm () { // 保存
      adminService.saveIndexImage(this.imageObj).then(res => {
        if (res.status === 200) {
          this.$message({message: '保存成功', type: 'success'})
          this.backImgList()
        } else {
          this.$message({message: res.message, type: 'error'})
        }
      })
    },
    changeIndexImgDetail () {
      adminService.changeIndexImageDetail(this.imageObj).then(res => {
        if (res.status === 200) {
          this.$message({message: '修改成功', type: 'success'})
          this.backImgList()
        } else {
          this.$message({message: res.message, type: 'error'})
        }
      })
    },
    backImgList () {
      this.$router.push('/admin/index-imgs')
    }
  },
  mounted () {
    this.getImgObj()
  }
}
</script>

<style scoped>
  .img-container img {
    max-width: 100%;
  }
</style>
