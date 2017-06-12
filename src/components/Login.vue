<template>
  <div class="login">
    <div class="logo"></div>
    <button v-on:click.stop="signin()"></button>
  </div>
</template>

<script>
/* eslint-disable */
import fb from './../firebase.js';
export default {
  name: 'hello',
  methods: {
    signin: function() {
      fb.signIn();
    },
  },
};
</script>


<style scoped lang="postcss">

.login {
  width: 100%;
  height: 100vh;
  margin-top: -150px;
  text-align: center;
  background-color: white;
  /*background-image: url('./../assets/bg.jpeg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;*/
  text-align: center;
  padding-top: 50%;
  .logo {
    background-image: url('./../assets/Phoneinlogo.png');
    background-size: contain;
    width: 100%;
    height: 500px;
    background-repeat: no-repeat;
    background-position: center center;
  }
  button {
    position: absolute;
    left: 10%;
    opacity: 0.8;
    bottom: 100px;
    width: 80%;
    height: 200px;
    font-size: 40px;
    background-image: url('./../assets/google3.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-color: rgba(0, 0, 0, 0);
    border: 0px solid black;
    background-position: center center;
  }
  button:active, button:visited {
    opacity: 1;
  }
}
</style>
