<template>
  <div class="not-found">
    <i class="fab fa-searchengin"></i>404 Not Found
  </div>
</template>

<script>
export default {
  name: 'PageNotFound'
}
</script>

<style>
  .not-found {
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -50px;
    margin-left: -250px;
    width: 500px;
    height: 100px;
    line-height: 100px;
    color: #343a40;
    font-size: 48px;
  }
  .not-found i {
    margin-right: 15px;
    font-size: 60px;
  }
</style>
