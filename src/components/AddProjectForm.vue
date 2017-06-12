<template>
  <div class="container">
    <div class="close" v-on:click="closePopup"></div>
    <div class="popup addProject">
      <h2>Add new project</h2>

      <form>
        <label>Building name</label>
        <input type="text" v-model="buildingName" required></input>

        <label>Choose building type</label>
        <select type="text" v-model="buildingType" required>
          <option value="" disabled hidden>Select</option>
          <option v-for="type in buildingTypes" required>{{type}}</option>
        </select>

        <input type="text" placeholder="Add your own type" v-if="buildingType==='other'" v-model="newType" v-on:keyup.enter="addBuildingType(newType)" required></input>

        <label>Add address</label>
        <input type="text" v-model="buildingLocation" required></input>

        <button @click="addBuilding">Save</button>
      </form>

    </div>
</div>
</template>

<script>
  /* eslint-disable */
  export default {
    data: function() {
      return {
        buildingName: '',
        buildingLocation: '',
        buildingType: '',
        newType: '',
      }
    },
    methods: {
      closePopup: function() {
        this.$emit('close-popup');
      },
      addBuildingType: function(type) {
        this.buildingType = type;
        this.buildingTypes.splice(this.buildingTypes.length-1, 0, type);
      },
      addBuilding: function() {
        let data = {
          type: this.buildingType.toLowerCase(),
          buildingName: this.buildingName,
          address: this.buildingLocation,
        }
        this.$store.dispatch('a_addBuilding', data);
        this.closePopup();
      },
    },
    computed: {
      buildingTypes() {
        return this.$store.getters.g_getBuildingTypes;
      }
    }
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
