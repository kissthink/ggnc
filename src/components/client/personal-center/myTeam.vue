<template>
  <div class="my-team">
    <h4 class="h4-title">我的团队</h4>
    <back-history></back-history>

    <div class="team">
      <div class="master">
        <p>我的师傅：</p>
        <div class="list">
          <strong>Admin</strong>
          <span>13800138000</span>
        </div>
      </div>

      <div class="disciple">
        <p>我的徒弟：</p>
        <div class="list">
          <strong>disciple</strong>
          <span>12345678901</span>
        </div>
        <div class="list">
          <strong>disciple</strong>
          <span>12345678901</span>
        </div>
        <div class="list">
          <strong>disciple</strong>
          <span>12345678901</span>
        </div>
        <div class="list">
          <strong>disciple</strong>
          <span>12345678901</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyTeam',
  data () {
    return {

    }
  }
}
</script>

<style>
  .my-team {
    padding: 56px 1rem 0;
    font-size: 14px;
  }
  .team {
    margin: 1rem 0 0;
  }
  .team p {
    padding-bottom: .8rem;
    border-bottom: 1px solid #ccc;
  }
  .team .list {
    margin-top: .8rem;
    padding: 0 .6rem;
    border: 1px solid #ccc;
    background: #fff;
  }
  .team .list span {
    float: right;
  }
  .team .disciple {
    margin-top: 2rem;
  }
</style>
