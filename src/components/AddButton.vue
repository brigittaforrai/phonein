<template>
  <div class="add">ADD NEW BUILDING</div>
</template>

<script>
  /* eslint-disable */
  export default {
  };
</script>

<style scoped>
  .add {
    position: fixed;
    bottom: 0;
    left:0;
    width: 100%;
    margin-top: 100px;
    height: 190px;
    background-color: rgba(23, 146, 175, 0.5);
    border: 0px solid white;
    color: white;
    text-align: center;
    font-size: 3.5em;
    padding-top: 60px;
    transition: all 0.2s ease;
    transform-origin: 50% 50%;
    transition: background-color 0.1s;
    letter-spacing: 3px;
  }

  .add:active {
    background-color: white;
    color: black;
  }
</style>
