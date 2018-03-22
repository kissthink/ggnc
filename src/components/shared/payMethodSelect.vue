<template>
  <div class="pay-method">
    <div class="pay-method-item" :class="{'active': payMethod}" @click="selectType(0)">
      支付宝
    </div>
    <div class="pay-method-item" :class="{'active': !payMethod}" @click="selectType(1)">
      微信
    </div>
  </div>
</template>

<script>
export default {
  name: 'PayMethodSelect',
  data () {
    return {
      payMethod: true
    }
  },
  methods: {
    selectType (type) {
      if (type === 0) {
        this.payMethod = true
      } else {
        this.payMethod = false
      }
      this.$emit('selectPayMethod', type)
    }
  },
  mounted () {
    this.$emit('selectPayMethod', 0)
  }
}
</script>

<style scoped>
  .pay-method {
    width: 100%;
    overflow: hidden;
    user-select: none;
  }
  .pay-method-item {
    float: left;
    margin: 0 5% 5% 0;
    width: 47.5%;
    height: 8rem;
    line-height: 8rem;
    text-align: center;
    font-size: 14px;
    border: 1px solid #868e96;
    border-radius: 5px;
  }
  .pay-method-item:nth-child(even) {
    margin-right: 0;
  }
  .active {
    color: #fff;
    border: 1px solid #007bff;
    background: #007bff;
  }
</style>
