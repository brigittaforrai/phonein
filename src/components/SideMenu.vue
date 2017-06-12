<template>

  <div class="side-menu">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>

</template>


<script>
/* eslint-disable */
export default {
  data: function() {
    return {
    };
  },
};
</script>


<style scoped lang="postcss">
  .side-menu {
    height: 100%;
    width: 50px;
    background-color: gray;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    padding-top: 5px;
    padding-left: 3px;
    padding-right: 4px;
    color: white;
    align-items: center;
    position: absolute;
    left: 0px;
    top: 50px;

    div {
      width: 100%;
      height: 45px;
      border-bottom: 1px solid white;
    }
  }


</style>
