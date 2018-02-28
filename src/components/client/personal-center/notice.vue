<template>
  <div class="notice-wrap">
    <h4 class="h4-title">系统公告</h4>
    <back-history></back-history>

    <div class="notice-list" v-if="noticeList.length > 0">
      <div class="notice-item" v-for="notice of noticeList" :key="notice.id">
        <h5 class="notice-name">{{notice.title}}</h5>
        <p class="notice-time">{{notice.createTime | transformTime}}</p>
        <div class="notice-content">
          {{notice.content}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import clientService from '@/assets/js/clientService'
export default {
  name: 'Notice',
  data () {
    return {
      noticeList: []
    }
  },
  methods: {
    getNoticeList () {
      clientService.getNoticeList().then(res => {
        this.noticeList = res
      })
    }
  },
  created () {
    this.getNoticeList()
  }
}
</script>

<style>
  .notice-wrap {
    padding: 56px 1rem 0;
  }
  .notice-list {
    padding: 2rem 1rem;
  }
  .notice-list .notice-item {
    margin-bottom: 1rem;
    padding: .8rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
    background: #fff;
  }
  .notice-list .notice-item:last-child {
    margin-bottom: 0;
  }
  .notice-item .notice-name {
    font-weight: bold;
    font-size: 16px;
  }
  .notice-item .notice-time {
    font-size: 12px;
  }
  .notice-item .notice-content {
    margin-top: .5rem;
    text-align: left;
    text-indent: 24px;
  }
</style>
