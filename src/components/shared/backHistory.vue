<template>
  <div class="back-history" @click="backHistory()">
    <i class="fas fa-angle-left"></i>
  </div>
</template>

<script>
export default {
  name: 'BackHistory',
  data () {
    return {}
  },
  methods: {
    backHistory: function () {
      window.history.back()
    }
  }
}
</script>

<style>
  .back-history {
    position: fixed;
    top: 0;
    left: 0;
    width: 56px;
    height: 56px;
    line-height: 61px;
    text-align: center;
    z-index: 1000;
  }
  .back-history i {
    color: #fafafa;
    font-size: 26px;
  }
</style>
