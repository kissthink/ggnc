<template>
  <div class="notice-wrap">
    <h4 class="h4-title">系统公告</h4>
    <back-history></back-history>

    <div class="notice-list">
      <div class="notice-item">
        <h5 class="notice-name">第一个系统公告</h5>
        <p class="notice-time">2018-02-01 11:00</p>
        <div class="notice-content">
          第一个系统公告已经发布了，请知悉！
        </div>
      </div>

      <div class="notice-item">
        <h5 class="notice-name">第二个系统公告</h5>
        <p class="notice-time">2018-02-01 11:10</p>
        <div class="notice-content">
          第二个系统公告已经发布了，请知悉！
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Notice',
  data () {
    return {}
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
    padding: .5rem;
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
  }
</style>
