<template>
  <div class="my-team">
    <h4 class="h4-title">我的团队</h4>
    <back-history></back-history>

    <div class="team">
      <div class="master">
        <p>我的师傅：</p>
        <div class="list" v-if="inviter">
          <strong>{{inviter.nickName}}</strong>
          <span>{{inviter.mobile}}</span>
        </div>
      </div>

      <div class="disciple">
        <p>我的徒弟：</p>
        <div class="list" v-for="invitee of invitees" :key="invitee.id">
          <strong>{{invitee.nickName}}</strong>
          <span>{{invitee.mobile}}</span>
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
