<template>
  <div class="add"> + </div>
</template>

<script>
  /* eslint-disable */
  export default {
  };
</script>

<style scoped>
  .add {
    position: absolute;
    right: 20px;
    top: 80px;
    width: 40px;
    height: 40px;
    border-radius: 50px;
    background-color: black;
    color: white;
    text-align: center;
    font-size: 30px;
    transition: all 0.2s ease;
    transform-origin: 50% 50%;
    transition: background-color 0.1s;
    z-index: 100;
  }
  .add:hover {
    width: 50px;
    height: 50px;
    font-size: 36px;
    right: 15px;
    top: 75px;
  }
  .add:active {
    background-color: pink;
  }
</style>
