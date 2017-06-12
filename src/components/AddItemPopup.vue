<template>
  <div class="container">
    <div class="close" v-on:click="closePopup"></div>
    <div class="popup addItem">
      <h2>Add new item</h2>

      <form>
        <label>Item name</label>
        <input type="text" v-model="itemName" required></input>

        <label>Item serial</label>
        <input type="text" v-model="serial" required></input>

        <label>Owner</label>
        <input type="text" v-model="owner" required></input>

        <label>User</label>
        <input type="text" v-model="user" required></input>

        <label>Invoice</label>
        <input type="text" v-model="invoice" required></input>

        <label>Size (cm)</label>
        <input type="text" v-model="x" required></input>
        <input type="text" v-model="y" required></input>
        <input type="text" v-model="z" required></input>

        <tag-field v-on:add-tags="addTags"></tag-field>

        <button @click="addItem">Save</button>
      </form>


    </div>
</div>
</template>

<script>
  /* eslint-disable */
  import TagField from './TagField';
  export default {
    data: function() {
      return {
        itemName: '',
        serial: null,
        owner: '',
        user: '',
        invoice: '',
        x: null,
        y: null,
        z: null,
        tags: [],
      }
    },
    methods: {
      closePopup: function() {
        this.$emit('close-popup');
      },
      addTags: function(tagList) {
        this.tags = tagList;
      },
      addItem: function() {
        let data = {
          itemName: this.itemName,
          serial: this.serial,
          invoice: this.invoice,
          owner: this.owner,
          user: this.user,
          size: {
            x: this.x,
            y: this.y,
            z: this.z,
          },
          location: {
            roomId: this.room.roomId,
            floorId: this.floor.floorId,
            buildingId: this.building.buildingId,
            roomName: this.room.roomName,
            floorName: this.floor.floorName,
            buildingName: this.building.buildingName,
          },
          tags: this.tags,
        }
        this.$store.dispatch('a_addItem', data);
        this.closePopup();
      },
    },
    computed: {
      building: function() {
        return this.$store.getters.g_selectedBuilding;

      },
      floor: function() {
        return this.$store.getters.g_selectedFloor;
      },
      room: function() {
        return this.$store.getters.g_selectedRoom;
      },
    },
    components: {
      TagField,
    },
  }
</script>

<style scoped lang="postcss">
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;

  .close {
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.7;
    transition: all 0.5s;
  }
}

.popup {
  width: 40%;
  height: auto;
  background-color: white;
  opacity: 0.95;
  border-radius: 4px;
  position: absolute;
  top: 10%;
  left: 53%;
  padding: 50px;
}
form {
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 20px;;
}
input, label, select {
  width: 100%;
}

button {
  margin-top: 20px;
}
</style>
