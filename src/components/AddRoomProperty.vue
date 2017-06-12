<template>
  <div class="addRoomProp-container">
    <div class="close" v-on:click="closePopup"></div>

    <div class="popup">
      <label>Add new Property</label>
      <select type="text" v-model="roomProp" required>
        <option value="" disabled hidden>Select</option>
        <option v-for="prop in roomProps" required>{{prop}}</option>
      </select>
      <transition name="component-fade" mode="out-in">
        <div class="inputButtonContainer" v-if="roomProp===add">
          <input class="add" type="text" placeholder="Add your own property" v-model="newProp" required></input>
          <button class="add" @click="addNewRoomProp">Add</button>
        </div>
      </transition>
    </div>

  </div>
</template>

<script>
  /* eslint-disable */
  export default {
    data: function() {
      return {
        add: 'Add new',
        roomProp: '',
        newProp: '',
      }
    },
    methods: {
      closePopup: function() {
        this.$emit('close-props');
      },
      addNewRoomProp: function() {
        if(this.roomProp === this.add) {
          if(this.newProp !== '') {
            this.roomProp = this.newProp;
            this.$store.dispatch('a_addNewRoomProp', this.newProp)
          };
          this.$emit('close-props');
        };
      },
    },
    computed: {
      roomProps() {
        return this.$store.getters.g_getRoomProps;
      },
    },
  }
</script>

<style scoped lang="postcss">
.addRoomProp-container {
  width: 100%;
  min-height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 1000;

  .close {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.7;
    transition: all 0.5s;
    z-index: -1;
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
  left: 30%;
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
</style>
