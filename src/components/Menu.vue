<template>

  <div class="main-menu">
    <div class="menu-tabs">
      <router-link to="/projects" class="menu-tab">Projects</router-link>
      <router-link to="/login" class="menu-tab">Other</router-link>
      <span @click="signout" class="signout button" >Sign out</span>
    </div>
    <div class="user">
      <span class="username">{{ username }}</span>
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
    height: 50px;
    background-color: black;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding: 10px;
    color: white;
    align-items: center;
  }

  .menu-tabs, .user {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    margin-left: 50px;
  }

  .avatar {
    height: 40px;
    margin-right: 10px;
    margin-left: 10px;
  }

  .username {
    padding-top: 10px;
    margin-right: 10px;
  }

  .menu-tab {
    margin-right: 20px;
    color: white;
    text-decoration: none;
  }
  .router-link-active {
    text-decoration: underline;
  }
</style>
