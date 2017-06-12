<template>
  <div class="container">
    <div class="close" v-on:click="closePopup"></div>
    <div class="popup addProject">
      <h2>Settings</h2>

      <form>
        <div class="column">
          <label>Rename Building</label>
          <input type="text" v-model="newName"></input>

          <label>Change Type</label>
          <select type="text" v-model="newType" required>
            <option value="" disabled hidden>Select</option>
            <option v-for="type in buildingTypes" v-bind:value="type" required>{{ type }}</option>
          </select>

          <input type="text" placeholder="Add your own type" v-if="building.type==='other'" v-model="newType" v-on:keyup.enter="addBuildingType(newType)" required></input>

          <label>Change Address</label>
          <input type="text" v-model="newAddress"></input>

        </div>

        <div class="column">
        </div>

      </form>
      <button @click="save">Save</button>
      <button @click="deleteBuilding">Delete Building</button>
    </div>
</div>
</template>

<script>
  /* eslint-disable */
  export default {
    data: function() {
      return {
        newName: '',
        newType: '',
        newAddress: '',
        newType: '',
      }
    },
    methods: {
      closePopup: function() {
        this.$emit('close-settings');
      },
      addBuildingType: function(type) {
        this.building.type = type;
        this.buildingTypes.splice(this.buildingTypes.length-1, 0, type);
      },
      save: function() {
        let data = {
          updates: {buildingName: this.newName, type: this.newType, address: this.newAddress},
          id: this.building.buildingId,
        }
        this.$store.dispatch('a_updateBuilding', data);
        this.closePopup();
      },
      deleteBuilding: function() {
        this.closePopup();
        this.$store.dispatch('a_deleteBuilding', this.building.buildingId);
      },
    },
    computed: {
      building() {
        this.newName = this.$store.getters.g_selectedBuilding.buildingName;
        this.newAddress = this.$store.getters.g_selectedBuilding.address;
        this.newType = this.$store.getters.g_selectedBuilding.type;
        return this.$store.getters.g_selectedBuilding;
      },
      buildingTypes() {
        return this.$store.getters.g_getBuildingTypes;
      }
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
  width: 50%;
  height: auto;
  background-color: white;
  opacity: 0.95;
  border-radius: 4px;
  position: absolute;
  top: 15%;
  left: 25%;
  padding: 30px;
}
form {
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  margin-top: 20px;
}
.column {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-left: 20px;
}
input, label, select {
  width: 80%;
}
button {
  display: block;
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
}

</style>
