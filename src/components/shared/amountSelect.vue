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
        {id: 1, amount: 500, isSelected: false},
        {id: 2, amount: 1000, isSelected: false},
        {id: 3, amount: 1500, isSelected: false},
        {id: 4, amount: 2000, isSelected: false}
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
