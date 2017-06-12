<template>
  <div id="building" v-if="building">

    <h2>{{ building.buildingName }}</h2>
    <side-menu></side-menu>
    <add-button @click.native="openAddFloor"></add-button>

    <div class="building-container" v-if="building">

      <div class="floor" v-for="floor in building.floors">
        <div class="add-room" @click="openAddRoom(floor.floorId)"> + </div>
        <div class="floor-data" @click="expandFloor(floor)">
          <div class="sign data">{{floor.floorSign}}</div>
          <div class="name data">{{floor.floorName}}</div>
          <div class="expand-button" v-if="floor.rooms"></div>
        </div>

        <div class="floor-expanded" v-if="floor.rooms">
          <table-component :floorId="floor.floorId" :buildingId="building.buildingId" ></table-component>
        </div>
      </div>
    </div>

    <transition name="component-fade" mode="out-in">
      <add-room-popup v-if="addRoom" v-on:close-popup="closeAddRoom" v-on:close-props="closeAddProps" v-on:open-props="openAddProps"></add-room-popup>
    </transition>

    <transition name="component-fade" mode="out-in">
      <add-floor-popup v-if="addFloor" v-on:close-popup="closeAddFloor"></add-floor-popup>
    </transition>

    <transition name="component-fade" mode="out-in">
      <add-room-property v-if="addProps" v-on:close-props="closeAddProps"></add-room-property>
    </transition>

  </div>
</template>


<script>
/* eslint-disable */
import AddButton from './AddButton';
import SideMenu from './SideMenu';
import AddRoomPopup from './AddRoomPopup';
import AddFloorPopup from './AddFloorPopup';
import TableComponent from './Table';
import AddRoomProperty from './AddRoomProperty';

export default {
  data: function() {
    return {
      addProps: false,
      addRoom: false,
      floorId: '',
      addFloor: false,
      showRooms: true,
      showItems: false,
    };
  },
  methods: {
    expandFloor(floor) {
      if(floor.rooms) {
        let parent = event.target.offsetParent.children;
        parent[2].classList.toggle("opened");
      }
    },
    openAddRoom: function(id) {
      this.addRoom = true;
      this.$store.commit('m_selectFloorId', id);
    },
    closeAddRoom: function() {
      this.addRoom = false;
    },
    openAddFloor: function() {
      this.addFloor = true;
    },
    closeAddFloor: function() {
      this.addFloor = false;
    },
    closeAddProps: function() {
      this.addProps = false;
      console.log('close');
    },
    openAddProps: function() {
      this.addProps = true;
      console.log('open');
    },
  },
  computed: {
    building: function() {
      return this.$store.getters.g_selectedBuilding;
    }
  },
  components: {
    AddButton,
    SideMenu,
    AddRoomPopup,
    AddFloorPopup,
    TableComponent,
    AddRoomProperty,
  }
};
</script>


<style scoped lang="postcss">
  #building{
    width: 100%;
    height: auto;
    padding: 50px;

    h2 {
      text-align: center;
    }

    .building-container {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      margin-top: 42px;
      margin-left: 40px;

      .floor {
        min-height: 50px;
        width: 100%;
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;

        background-color: rgb(250, 250, 250);
        position: relative;
        border: 1px solid rgb(230, 230, 230);
        border-radius: 4px;

        .floor-data {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          height: 50px;
          .data {
            min-width: 35px;
            text-align: center;
            padding-top: 5px;
            margin: 7px;
          }
          .level, .sign {
            background-color: black;
            color: white;
            border-radius: 4px;
          }
        }
        .floor-expanded {
          display: none;
          width: 100%;
          height: auto;
          margin-top: 10px;
          overflow: scroll;
        }
        .expand-button {
          background-image: url("http://www.pngmart.com/files/3/Down-Arrow-PNG-Clipart.png");
          background-size: 50%;
          background-repeat: no-repeat;
          background-position: 50% 50%;
          margin: 7px;
          width: 35px;
          height: 35px;
        }
        .add-room {
          background-color: gray;
          border-radius: 100%;
          background-repeat: no-repeat;
          background-position: 50% 50%;
          position: absolute;
          right: 0px;
          top: 0px;
          margin: 7px;
          width: 35px;
          height: 35px;
          text-align: center;
          font-size: 1.3em;
          color: white;
        }
        .opened {
          display: flex;
          justify-content: flex-start;
          flex-direction: row;
        }
      }
    }
  }
</style>
