<template>
  <div class="reg-receipt-code-wrap">
    <h4 class="h4-title">上传付款凭证</h4>
    <back-history></back-history>

    <div class="reg-receipt-code">
      <b-form-group id="regReceiptCode"
                    label="付款凭证："
                    label-for="regReceiptCode">
        <b-form-file accept=".jpg, .png, .gif" @change="selectImg($event)"
                     placeholder="选择付款凭证"></b-form-file>
      </b-form-group>

      <div class="view-img">
        <img :src="imgUrl">
      </div>

      <button class="btn btn-primary btn-lg btn-block mt-3"
              @click="uploadImg()" :disabled="isUploading">
            上传
      </button>
    </div>
  </div>
</template>

<script>
import clientService from '@/assets/js/clientService'
export default {
  name: 'RegReceiptCode',
  data () {
    return {
      topUpId: '',
      selectFile: [],
      imgUrl: '',
      isUploading: false
    }
  },
  methods: {
    getTopUpId () {
      this.topUpId = this.$route.query.recordId
    },
    selectImg (file) {
      this.selectFile = file.target.files
      this.viewImg(this.selectFile[0])
    },
    viewImg (file) { // 展示图片
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
        this.imgUrl = event.target.result
      }
    },
    uploadImg () {
      this.isUploading = true
      clientService.uploadCredential(this.selectFile[0]).then(res => {
        if (res.status === 200) {
          this.saveCredential(res.data.filePath)
        } else {
          this.$message({message: '凭证上传失败', type: 'error'})
          this.isUploading = false
        }
      })
    },
    saveCredential (url) {
      clientService.saveCredential({id: this.topUpId}, {credential: url}).then(res => {
        this.isUploading = false
        if (res.status === 200) {
          this.$message({message: '上传成功', type: 'success'})
          window.history.back()
        } else {
          this.$message({message: res.message, type: 'success'})
        }
      })
    }
  },
  mounted () {
    this.getTopUpId()
  }
}
</script>

<style scoped>
  .reg-receipt-code-wrap {
    padding: 56px 0 0 0;
  }
  .reg-receipt-code {
    padding: 1rem;
  }
  .reg-receipt-code .view-img {
    max-width: 100%;
    max-height: 400px;
    overflow: hidden;
  }
  .reg-receipt-code .view-img img {
    width: 100%;
  }
</style>
