<template>
  <div class="call" v-if="building">
    <div class="logo"></div>
    <h1>{{building.buildingName}}</h1>
    <span>Someone is at the door</span>
    <div class="bell"></div>
    <div class="buttons">
      <button class="open" @click="openDoor"></button>
      <button class="cancel" @click="finish"></button>
      <button class="answer" @click="answer"></button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: 'hello',
  methods: {
    finish() {
      let data = {
        id: this.building.buildingId,
        updates: {calling: false}
      }
      this.$store.dispatch('a_updateBuilding', data);
      this.$store.commit('m_finishCall');
    },
    openDoor() {
      let s = this.$store;
      let data = {
        id: this.building.buildingId,
        updates: {open: true, calling: false}
      }
      s.dispatch('a_updateBuilding', data);
      s.commit('m_finishCall');
      console.log('door is opened');
      setTimeout(function(){
        s.dispatch('a_updateBuilding', {id: data.id, updates: {open: false}})
      }, 3000);
    },
    answer() {
      console.log('calling feature coming soon :)');
    }
  },
  computed: {
    building() {
      return this.$store.getters.g_getBuildingsByCalling;
    }
  }
};
</script>


<style scoped lang="postcss">
  .call {
    width: 100%;
    height: 100%;
    background-color: rgba(23, 146, 175, 1);
    background-size: 100%;
    color: white;
    z-index: 100;
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
    padding: 50px;
    .logo {
      margin-top: 50px;
      background-image: url('./../assets/Phoneinlogo.png');
      background-size: contain;
      width: 100%;
      height: 300px;
      background-repeat: no-repeat;
      background-position: center center;
    }
    .bell {
      position: absolute;
      left: calc(50% - 100px);
      top: 50%;
      background-image: url('./../assets/bell.svg');
      background-size: contain;
      width: 150px;
      height:150px;
      background-repeat: no-repeat;
      background-position: center center;
      display: block;
      animation: ringing 2s infinite ease;
      transform-origin: 50% top;
    }

    }
    h1 {
      font-size: 5em;
      font-weight: 100;
      width: 100%;
      height: auto;
      padding: 50px;
      padding-bottom: 20px;
    }
    span {
      font-size: 2.5em;
      font-weight: 100;
    }
    .buttons {
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding-left: 90px;
      padding-right: 90px;
      position: absolute;
      bottom: 150px;
      width: 100%;
      left: 0px;
      button {
        width: 200px;
        height: 200px;
        border-radius: 100px;
        font-size: 2em;
        border: 0px solid white;
        background-size: 40%;
        background-repeat: no-repeat;
        background-position: center center;
      }
      .open {
        background-color: rgb(106, 196, 223);
        background-image: url('./../assets/padlock.svg');
      }
      .cancel {
        background-color: tomato;
        background-size: 50%;
        background-image: url('./../assets/endcall.svg');
      }
      .answer {
        background-color: #54C68A;
        background-image: url('./../assets/phone-receiver.svg');
      }
    }
    @keyframes ringing {
      0% {
        width: 180px;
        height:180px;
        transform: rotate(15deg);
      }
      50% {
        transform: rotate(-15deg);
      }
      100% {
        width: 180px;
        height:180px;
        transform: rotate(15deg);
      }
  }

</style>
