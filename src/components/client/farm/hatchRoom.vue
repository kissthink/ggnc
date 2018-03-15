<template>
  <div class="hatch-room">
    <h4 class="h4-title">孵化房</h4>
    <back-history></back-history>

    <div class="sign-in">
      <button class="btn btn-danger btn-lg" @click="signIn()">
        <i class="fas fa-thermometer-half"></i> {{signInButtonTitle}}
      </button>
      <button class="btn btn-primary btn-lg" @click="inviterHatchRoom()">
        <i class="fas fa-home"></i> 师傅的孵化房
      </button>
      <button class="btn btn-info btn-lg record" @click="gotoHatched()">孵化记录</button>
    </div>

    <div class="hatch-room-list" v-if="hatchRooms.length > 0">
      <div class="hatch-room-item" v-for="hatchRoom of hatchRooms" :key="hatchRoom.id">
        <div class="hatch-room-pic"></div>
        <div class="hatch-room-content">
          <p>在孵蛋：{{hatchRoom.total}}</p>
          <p>温度：{{temperature}}℃</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import clientService from '@/assets/js/clientService'
export default {
  name: 'HatchRoom',
  data () {
    return {
      userId: '',
      hatchRooms: [],
      temperature: 35,
      signInButtonTitle: '签到加温'
    }
  },
  methods: {
    getHatchList () {
      this.userId = +this.$route.query.userId
      if (this.userId > 0) {
        clientService.getHatchList(this.userId).then(res => {
          this.hatchRooms = res
          this.signInButtonTitle = res[0].selfSignIn ? '已签到' : '签到加温'
          this.countTemperature(res[0])
        })
      }
    },
    gotoHatched () {
      this.$router.push({path: '/hatched', query: {userId: this.userId}})
    },
    signIn () {
      let user = this.hatchRooms[0].user
      if (user) {
        clientService.signInForSelf(user).then(res => {
          if (res.status === 200) {
            this.$message({message: '签到加温成功', type: 'success'})
            this.getHatchList()
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      }
    },
    countTemperature (hatchRoom) {
      if (hatchRoom.selfSignIn) {
        this.temperature++
      }
      let inviteeSignIn = JSON.parse(hatchRoom.inviteeSignIn)
      if (inviteeSignIn.length > 0) {
        this.temperature += inviteeSignIn.length
      }
    },
    inviterHatchRoom () {
      this.$router.push({path: 'inviter-hatch-room', query: {inviteeId: this.userId}})
    }
  },
  mounted () {
    this.getHatchList()
  }
}
</script>

<style scoped>
  .hatch-room {
    padding: 56px 0 0;
  }
  .sign-in {
    margin: 1rem 1rem 0;
    overflow: hidden;
  }
  .sign-in .record {
    float: right;
  }
  .hatch-room-list {
    padding: 1rem;
    overflow: hidden;
  }
  .hatch-room-list .hatch-room-item {
    float: left;
    padding: .5rem;
    width: 50%;
    text-align: center;
  }
  .hatch-room-item .hatch-room-pic {
    margin: 0 auto;
    width: 6.171rem;
    height: 6.171rem;
    background: url('../../../assets/img/house.png') no-repeat;
    background-size: 100%;
  }
  .hatch-room-item .hatch-room-content {
    font-size: 14px;
  }
</style>
