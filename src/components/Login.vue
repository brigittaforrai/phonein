<template>
  <div class="login">
    <button v-on:click.stop="signin()">login</button>
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

</style>
