<template>
  <div class="my-team">
    <h4 class="h4-title">我的团队</h4>
    <back-history></back-history>

    <div class="team">
      <div class="master">
        <p>我的师傅：</p>
        <div class="list" v-if="inviter">
          <p>
            <strong>{{inviter.nickName}}</strong>
            <span class="right">{{inviter.mobile}}</span>
          </p>
          <p>
            <span>在养鸡: {{inviter.asset.inHennery}}</span>
            <span class="right">在孵蛋: {{inviter.asset.hatchingEgg}}</span>
          </p>
          <p>
            <span>商品鸡: {{inviter.asset.commodityChicken}}</span>
            <span class="right">商品蛋: {{inviter.asset.commodityEgg}}</span>
          </p>
        </div>
      </div>

      <div class="disciple">
        <p>我的徒弟：</p>
        <div class="list" v-for="invitee of invitees" :key="invitee.id">
          <p>
            <strong>{{invitee.nickName}}</strong>
            <span class="right">{{invitee.mobile}}</span>
          </p>
          <p>
            <span>在养鸡: {{invitee.asset.inHennery}}</span>
            <span class="right">在孵蛋: {{invitee.asset.hatchingEgg}}</span>
          </p>
          <p>
            <span>商品鸡: {{invitee.asset.commodityChicken}}</span>
            <span class="right">商品蛋: {{invitee.asset.commodityEgg}}</span>
          </p>
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
      invitees: [],
      inviter: ''
    }
  },
  methods: {
    getTeacherAndPupil () {
      this.inviter = JSON.parse(this.$route.query.inviter)
      this.invitees = JSON.parse(this.$route.query.invitee)
      console.log(this.inviter)
    }
  },
  mounted () {
    this.getTeacherAndPupil()
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
  .team p:last-child {
    border-bottom: 0;
  }
  .team .list {
    margin-top: .8rem;
    padding: .2rem .6rem;
    border: 1px solid #ccc;
    background: #fff;
  }
  .team .list span.right {
    float: right;
  }
  .team .disciple {
    margin-top: 2rem;
  }
</style>
