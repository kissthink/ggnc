<template>
  <div>
    <h4 class="admin-title">系统公告详情</h4>

    <div class="container-fluid">
      <div class="row">
        <div class="col-4">
          <div class="form-group">
            <label for="name">公告标题</label>
            <input type="text" class="form-control" id="name" v-model="notice.title">
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label for="content">公告内容</label>
            <textarea id="content" class="form-control" cols="30" rows="10" v-model="notice.content"></textarea>
          </div>
        </div>
      </div>

      <button class="btn btn-info btn-lg" @click="saveNotice()" v-show="!noticeId">保存</button>
      <button class="btn btn-outline-dark btn-lg" @click="backToNoticeList()">返回</button>
    </div>
  </div>
</template>

<script>
import adminService from '@/assets/js/adminService'
export default {
  name: 'NoticeDetail',
  data () {
    return {
      noticeId: null,
      notice: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
    getNoticeDetail () {
      adminService.getNoticeDetail(this.noticeId).then(res => {
        this.notice.title = res.title
        this.notice.content = res.content
      })
    },
    saveNotice () {
      if (this.notice.title === '') {
        this.$message({message: '公告标题不能为空', type: 'error'})
        return
      }
      adminService.releaseNotice(this.notice).then(res => {
        if (res.status === 200) {
          this.$message({message: '发布成功', type: 'success'})
          this.$router.push('/admin/notice-management')
        } else {
          this.$message({message: res.message, type: 'success'})
        }
      })
    },
    backToNoticeList () {
      this.$router.push('/admin/notice-management')
    }
  },
  mounted () {
    this.noticeId = +this.$route.params.id
    if (this.noticeId > 0) {
      this.getNoticeDetail()
    }
  }
}
</script>

<style>

</style>
