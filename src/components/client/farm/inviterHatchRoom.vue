<template>
  <div class="hatch-room">
    <h4 class="h4-title">师傅的孵化房</h4>
    <back-history></back-history>

    <div class="sign-in">
      <button class="btn btn-danger btn-lg" @click="signIn()">
        <i class="fas fa-thermometer-half"></i> 签到加温
      </button>
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
  name: 'InviterHatchRoom',
  data () {
    return {
      inviteeId: '',
      hatchRooms: [],
      temperature: 35
    }
  },
  methods: {
    getInviterHatchList () {
      this.inviteeId = +this.$route.query.inviteeId
      this.temperature = 35
      if (this.inviteeId > 0) {
        clientService.getInviterHatchList(this.inviteeId).then(res => {
          this.hatchRooms = res
          this.countTemperature(res[0])
        })
      }
    },
    signIn () {
      let user = {id: this.inviteeId}
      if (user) {
        clientService.signInForInviter(user).then(res => {
          if (res.status === 200) {
            this.$message({message: '加温成功', type: 'success'})
            this.getInviterHatchList()
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
    }
  },
  mounted () {
    this.getInviterHatchList()
  }
}
</script>

<style scoped>
  .hatch-room {
    padding: 56px 0 0;
  }
  .sign-in {
    margin: 1rem 0 0 1rem;
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
