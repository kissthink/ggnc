<template>
  <div class="client-amount-wrap">
    <div class="client-amount-item"
         v-for="amount of amountArray"
         :class="{'default': !amount.isSelected, 'btn-primary': amount.isSelected}"
         @click="selectAmount(amount)"
         :key="amount.id">
      {{amount.amount}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClientAmountSelect',
  data () {
    return {
      amountArray: [
        {id: 1, amount: 500, isSelected: false},
        {id: 2, amount: 600, isSelected: false},
        {id: 3, amount: 700, isSelected: false},
        {id: 4, amount: 800, isSelected: false},
        {id: 5, amount: 1000, isSelected: false}
      ]
    }
  },
  methods: {
    selectAmount (selectAmount) {
      this.amountArray.map(amount => {
        amount.isSelected = false
      })
      this.amountArray.find(amount => amount.id === selectAmount.id).isSelected = true
      this.$emit('selectAmount', selectAmount.amount)
    }
  }
}
</script>

<style scoped>
  .client-amount-wrap {
    width: 100%;
    overflow: hidden;
    user-select: none;
  }
  .client-amount-item {
    float: left;
    margin: 0 5% 5% 0;
    width: 47.5%;
    height: 10rem;
    line-height: 10rem;
    text-align: center;
    font-size: 14px;
    border-radius: 5px;
  }
  .default {
    color: #666;
    border: 1px solid #868e96;
  }
  .active {
    color: #fff;
    border: 1px solid #007bff;
    background: #007bff;
  }
  .client-amount-item:nth-child(even) {
    margin-right: 0;
  }
</style>
