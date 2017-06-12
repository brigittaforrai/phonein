<template>
  <div id="room" v-if="room">

    <h2>{{ room.roomName }}</h2>
    <!-- <h3>buildingName + floor</h3> -->
    <side-menu></side-menu>
    <add-button @click.native="openPopup"></add-button>

    <div class="container" v-if="room">

      <table-component :roomId="room.roomId"></table-component>

    </div>

    <transition name="component-fade" mode="out-in">
      <add-item-popup v-if="popup" v-on:close-popup="closePopup"></add-item-popup>
    </transition>

  </div>
</template>


<script>
/* eslint-disable */
import AddButton from './AddButton';
import AddItemPopup from './AddItemPopup';
import SideMenu from './SideMenu';
import TableComponent from './Table';

export default {
  data: function() {
    return {
      popup: false,
    };
  },
  methods: {
    openPopup: function() {
      this.popup = true;
    },
    closePopup: function() {
      this.popup = false;
    },
  },
  computed: {
    room: function() {
      return this.$store.getters.g_selectedRoom;
    },
    items: function() {
      return this.$store.getters.g_itemsByLocation;
    },
  },
  components: {
    AddButton,
    SideMenu,
    AddItemPopup,
    TableComponent,
  }
};
</script>


<style scoped lang="postcss">

  #room {
    width: 100%;
    height: auto;
    padding: 50px;

    h2 {
      text-align: center;
    }
    .container {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      margin-top: 42px;
      margin-left: 40px;
    }
    table {
      border-collapse: collapse;
      font-size: 0.7em;
      font-weight: 100;
      width: 100%;
      td, th {
        resize: horizontal;
        overflow: auto;
        margin: 0px;
        border-spacing: 0px;
        padding-left: 15px;
        padding-right: 15px;
        text-align: left;
        height: 30px;
      }
      .table-content {

        margin-left: 200px;
        overflow-x: scroll;
      }
      .table-head {
        background-color: lightgray;
        color: black;
        height: 30px;
      }
      tr {
        border-bottom: 1px solid lightgray;
      }
    }

  }




</style>
