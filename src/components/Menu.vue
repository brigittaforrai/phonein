<template>

  <div class="main-menu">
    <div class="menu-tabs">
      <router-link to="/projects" class="menu-tab">PHONEIN</router-link>
    </div>
    <div class="user">
      <span @click="signout" class="signout button" >Sign out</span>
      <!-- <span class="username">{{ username }}</span> -->
      <img class="avatar" :src="avatar"></img>
    </div>
  </div>

</template>


<script>
import fb from './../firebase.js';
/* eslint-disable */
export default {
  methods: {
    signout: function() {
      fb.signOut();
    },
  },
  computed: {
    username() {
      return this.$store.getters.g_username;
    },
    avatar() {
      return this.$store.getters.g_avatar;
    },
  },
};
</script>

<style scoped>
  .main-menu {
    height: 150px;
    width: 100%;
    top: 0;
    left:0;
    background-color: white;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    color: black;
    align-items: center;
    font-size: 3em;
    position: fixed;
  }

  .menu-tabs, .user {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    margin-left: 50px;
  }

  .avatar {
    height: 120px;
    width: 120px;
    margin-left: 10px;
    margin-right: 15px;
  }

  .username, .signout {
    height: 120px;
    padding: 40px;
    margin-right: 10px;
    border: 1px solid black;
    font-size: 0.7em;
  }
  .signout:active {
    border: 0px solid black;
    color: white;
    background-color: rgb(221, 111, 137);
  }

  .menu-tab {
    margin-right: 40px;
    text-decoration: none;
    letter-spacing: 3px;
    color: rgba(23, 146, 175, 1);
  }
</style>
