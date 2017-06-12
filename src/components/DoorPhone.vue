<template>
  <div class="doorPhone">
    <div class="device">
      <div class="speaker">
        <div class="dotRow" v-for="dot in y">
          <div class="dot" v-for="dot in x"></div>
        </div>
      </div>

      <div class="flats">
        <div class="flat" v-for="company in companies">
          <div class="label">{{company}}</div>
          <div class="button" @click="ring(company)"></div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
/* eslint-disable */
import fb from './../firebase.js';
export default {
  data: function() {
    return {
      companies: ['Euedge Office', 'PhoneIn Office', 'Startup Weekend', 'A66'],
      x: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      y: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    }
  },
  methods: {
    ring: function(company) {
      if(company === 'Euedge Office') {
        let id = '-Klp3j6JbayG2zp7PpY9';
        let data = {
          id: id,
          updates: {calling: true}
        }
        this.$store.dispatch('a_updateBuilding', data);
        this.$store.commit('m_startCall');
        console.log('Ring-ring');
      }
    },
  },
};
</script>


<style scoped lang="postcss">

.doorPhone {
  margin-top: -150px;
  width: 100%;
  height: 100vh;
  background-color: rgb(245, 245, 245);

  .device {
    width: 100%;
    height: 100%;
    background-color: rgb(200, 200, 200);
    box-shadow: 1px 1px 10px #555;
    position: relative;
    border-radius: 4px;
    padding: 80px;

    .speaker {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      border-radius: 40px;
      overflow: hidden;
      box-sizing: border-box;
      background-color: rgba(0,0,0,0.03);
      box-shadow: 0px 0px 20px rgba(0,0,0,0.03);
      height: 40%;
      .dotRow {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        .dot {
          width: 4px;
          height: 4px;
          background-color: gray;
          border-radius: 5px;
          margin: 2px;
          box-shadow: 2px 0px 2px #888888;
        }
      }
    }

    .flats {
      width: 100%;
      height: 50%;
      background-color: rgb(215, 215, 215);
      box-shadow: 1px 1px 2px #888888;
      border-radius: 2px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-top: 120px;
      padding-top: 70px;
      padding-bottom: 70px;
      .flat {
        height: 20%;
        width: 80%;
        margin-left: 10%;
        margin-top: 2%;
        margin-bottom: 2%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .label {
          border: 2px solid lightgray;
          box-shadow: 1px 1px 7px gray;
          background-color: white;
          width: 80%;
          height: 100%;
          max-height: 120px;
          min-height: 80px;
          color: rgb(100, 100, 100);
          padding: 20px;
          font-size: 35px;
        }
        .button {
          width: 90px;
          height: 90px;
          border-radius: 300px;
          box-shadow: 1px 1px 7px rgb(100, 0, 0);
          background-color: tomato;
          background-image: url('./../assets/icon.svg');
          background-size: 40%;
          background-repeat: no-repeat;
          background-position: center center;
        }
      }
    }
  }

}
</style>
