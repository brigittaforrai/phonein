<template>
  <div class="addroom-container">
    <div class="close" v-on:click="closePopup"></div>
    <div class="popup addProject">
      <h2>Add new room</h2>

      <form>
        <label>Room name</label>
        <input type="text" v-model="roomName"></input>

        <label>Add room type</label>
        <select type="text" v-model="roomType">
          <option value="" disabled hidden>Select</option>
          <option v-for="type in roomTypes" required>{{type}}</option>
        </select>
        <transition name="component-fade" mode="out-in">
          <div class="inputButtonContainer" v-if="roomType===add">
            <input class="add" type="text" placeholder="Add your own type" v-model="newType" required></input>
            <button class="add" @click="addNewRoomType">Add</button>
          </div>
        </transition>

        <label>Add size (nm)</label>
        <input type="number" v-model="roomSize"></input>

        <button class="addProps" @click="openAddProps">Add property</button>

        <button class="saveButton" @click="save" v-on:keyup.enter="save">Save</button>
      </form>

    </div>
</div>
</template>

<script>
  /* eslint-disable */
  export default {
    data: function() {
      return {
        add: 'Add new',
        roomName: '',
        roomType: '',
        newType: '',
        balcony: '',
        doorsNum: '',
        windowsNum: '',
        roomSize: '',
      }
    },
    methods: {
      closePopup: function() {
        this.$emit('close-popup');
      },
      openAddProps: function() {
        console.log('emitopen');
        this.$emit('open-props');
      },
      closeAddProps: function() {
        this.$emit('close-props');
      },
      addNewRoomType: function() {
        if(this.roomType === this.add) {
          if(this.newType !== '') {
            this.roomType = this.newType;
            this.$store.dispatch('a_addNewRoomType', this.newType)
          };
        };
      },
      save: function() {
        let data = {
          room: {
            type: this.roomType.toLowerCase(),
            roomName: this.roomName,
            windows: this.windowsNum,
            doors: this.doorsNum,
            size: this.roomSize,
            balcony: this.balcony,
          },
        };
        this.$store.dispatch('a_addRoom', data);
        this.closePopup();
      },
    },
    computed: {
      roomTypes() {
        return this.$store.getters.g_getRoomTypes;
      },
    },
    // components: {
    //   AddRoomProperty,
    // }
  }
</script>

<style scoped lang="postcss">
.addroom-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;

  .close {
    position: absolute;
    top: 0px;
    left: 0px;
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
  right: 10%;
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

.saveButton {
  margin-top: 20px;
}
</style>
