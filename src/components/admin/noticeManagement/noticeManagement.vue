<template>
  <div>
    <h4 class="admin-title">系统公告管理</h4>

    <div class="add" @click="addNotice()">
      <button class="btn btn-info btn-lg">新增公告</button>
    </div>

    <table class="table table-hover table-bordered">
      <thead class="table-active">
        <th>发布时间</th>
        <th>公告标题</th>
        <th>公告内容</th>
        <th>操作</th>
      </thead>
      <tbody v-if="notices.length > 0">
        <tr v-for="item of notices" :key="item.id">
          <td>{{item.createTime | transformTime}}</td>
          <td><a href="javascript:void(0);" @click="toNoticeDetail(item)">{{item.title}}</a></td>
          <td>
            <span class="notice-content">{{item.content}}</span>
          </td>
          <td>
            <button class="btn btn-danger" @click="delNotice(item)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import adminService from '@/assets/js/adminService'
export default {
  name: 'NoticeManagement',
  data () {
    return {
      notices: []
    }
  },
  methods: {
    getNoticeList () {
      adminService.getNoticeList().then(res => {
        this.notices = res
      })
    },
    addNotice () {
      this.$router.push('/admin/new-notice')
    },
    delNotice (notice) {
      if (!window.confirm('确定删除？')) return
      adminService.deleteNotice(notice).then(res => {
        if (res.status === 200) {
          this.$message({message: '删除成功', type: 'success'})
          this.getNoticeList()
        } else {
          this.$message({message: res.message, type: 'error'})
        }
      })
    },
    toNoticeDetail (notice) {
      this.$router.push({path: `/admin/notice-detail/${notice.id}`})
    }
  },
  created () {
    this.getNoticeList()
  }
}
</script>

<style scoped>
  .add {
    margin: 0 0 20px;
  }
  .notice-content {
    display: inline-block;
    max-width: 300px;
    max-height: 20px;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
  }
</style>
