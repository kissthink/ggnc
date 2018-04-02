<template>
  <div class="amount-select">
    <button v-for="amount of amountArray"
            :key="amount.id"
            class="btn"
            :class="{'btn-outline-primary': !amount.isSelected, 'btn-primary': amount.isSelected}"
            @click="selectAmount(amount.id)">
      {{amount.amount}}
    </button>
  </div>
</template>

<script>
export default {
  name: 'AmountSelect',
  props: {
    isSaved: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      amountArray: [
        {id: 1, amount: 50, isSelected: false},
        {id: 2, amount: 100, isSelected: false},
        {id: 3, amount: 200, isSelected: false},
        {id: 4, amount: 300, isSelected: false},
        {id: 5, amount: 400, isSelected: false},
        {id: 6, amount: 500, isSelected: false},
        {id: 7, amount: 600, isSelected: false},
        {id: 8, amount: 700, isSelected: false},
        {id: 9, amount: 800, isSelected: false},
        {id: 10, amount: 900, isSelected: false},
        {id: 11, amount: 1000, isSelected: false},
        {id: 12, amount: 1500, isSelected: false},
        {id: 13, amount: 2000, isSelected: false}
      ],
      receiveIsSaved: false
    }
  },
  watch: {
    isSaved (newValue, oldValue) {
      if (newValue) {
        this.receiveIsSaved = newValue
        this.resetButton()
      }
    }
  },
  methods: {
    selectAmount (id) {
      this.amountArray.forEach(amount => {
        if (amount.id !== id) {
          amount.isSelected = false
        }
      })
      this.amountArray.forEach(amount => {
        if (amount.id === id) {
          if (amount.isSelected) {
            amount.isSelected = false
            this.$emit('amountSelected', 0)
          } else {
            amount.isSelected = true
            this.receiveIsSaved = false
            this.$emit('amountSelected', amount.amount)
          }
        }
      })
    },
    resetButton () {
      this.amountArray.forEach(amount => {
        amount.isSelected = false
      })
    }
  }
}
</script>

<style scoped>
  .amount-select {
    display: inline-block;
  }
  .btn {
    margin-right: 5px;
    cursor: pointer;
  }
</style>
