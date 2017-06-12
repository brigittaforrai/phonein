<template>
  <div id="app" v-if>
    <main-menu v-if="login && path !== 'Doorphone' && !calling"></main-menu>
    <div class="opening" v-if="opening">{{opening.buildingName}} door is opening</div>
    <div class="mainContainer">
      <router-view></router-view>
    </div>
    <call v-if="calling && path !== 'Doorphone'"></call>
  </div>
</template>

<script>
/* eslint-disable */
import MainMenu from './components/Menu';
import Projects from './components/Projects';
import Login from './components/Login';
import Doorphone from './components/DoorPhone';
import Call from './components/Calling';
import router from './router';

export default {
  data: function() {
    return {
    }
  },
  methods: {
  },
  computed: {
    login() {
      return this.$store.getters.g_loginState;
    },
    path() {
      return router.history.current.name;
    },
    calling() {
      return this.$store.getters.g_callingState;
    },
    doorPhone() {
      return router.history.current.name !== "Doorphone";
    },
    opening() {
      return this.$store.getters.g_getBuildingsByOpen;
    }
  },
  components: {
    MainMenu,
    Projects,
    Login,
    Doorphone,
    Call,
  },
};
</script>


<style lang="postcss">
  *, html, body {
    margin: 0px;
    box-sizing: border-box;
    font-family: "helvetica";
  }
  html, #app {
    height: 100%;
  }

  body {
    width: 100%;
    height: calc(100% - 150px);
  }

  .opening {
    width: 100%;
    height: 200px;
    background-color: crimson;
    color: white;
    position: absolute;
    top: 150px;
    left: 0px;
    font-size: 3em;
    letter-spacing: 3px;
    padding: 40px;
    text-align: center;
    padding-top: 65px;
  }

  .mainContainer {
    margin-top: 150px;
    width: 100%;
    min-height: 100%;
    height: auto;
    background-color: white;
  }

  button {
    width: 100px;
    height: 30px;
    background-color: white;
    border: 1px solid black;
    outline: none;
  }

  .inputButtonContainer {
    height: 30px;
    display: flex;
    flex-direction: row;
    button.add {
      width: 20%;
      background-color: lightgray;
      border: 0px solid gray;
      height: 100%;
    }
    button.add:hover {
      background-color: blue;
      color: white;
    }
    input.add {
      width: 80%;
      height: 100%;
      margin-top: 0px;
      margin-bottom: 0px;
    }
  }

  .button:hover {
    cursor: pointer;
  }

  input, select{
    padding: 5px;
    margin-top: 5px;
    margin-bottom: 5px;
    outline: none;
  }
  label {
    margin-top: 15px;
  }
  select {
    height: 28px;
    background-color: white;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border-radius: 0px;
    border: 1px solid lightgray;
    background-image: url("http://www.pngmart.com/files/3/Down-Arrow-PNG-Clipart.png");
    background-size: 5%;
    background-position-x: 98%;
    background-position-y: 50%;
    background-repeat: no-repeat;
    outline: none;
  }
  input:focus, select:focus {
    border: 2px solid lightgray;
  }

  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .4s ease;
  }
  .component-fade-enter, .component-fade-leave-to {
    opacity: 0;
  }

</style>
