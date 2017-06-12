<template>
  <div class="container-settings">
    <div class="close" v-on:click="closePopup"></div>
    <div class="popup addProject">
      <h2>SETTINGS</h2>
      <div class="closeButton" @click="closePopup">x</div>

      <form>
          <label>Rename Building</label>
          <input type="text" v-model="newName"></input>

          <label>Change Address</label>
          <input type="text" v-model="newAddress"></input>

          <label>Edit users</label>
          <div class="add-user">
            <input class="add" type="text" placeholder="Add user email" v-model="newUser" v-on:keyup.enter="addUser"></input>
            <button class="add" @click="addUser">ADD</button>
          </div>

          <div class="users" v-if="userList.length">
            <ul>
              <li v-for="user in userList">{{user}}</li>
            </ul>
          </div>
      </form>
      <button class="save button" @click="save">SAVE</button>
      <button class="delete button"@click="deleteBuilding">DELETE BUILDING</button>
    </div>
</div>
</template>

<script>
  /* eslint-disable */
  export default {
    data: function() {
      return {
        newName: '',
        newUser: '',
        newAddress: '',
        newUserList: [],
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
          updates: {buildingName: this.newName, users: this.userList, address: this.newAddress, open: false },
          id: this.building.buildingId,
        }
        this.$store.dispatch('a_updateBuilding', data);
        this.closePopup();
      },
      addUser: function() {
        this.userList.push(this.newUser);
        this.newUser = '';
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
      userList() {
        return this.building.users;
      }
    },
  }
</script>

<style scoped lang="postcss">

.container-settings {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;

  .close {
    width: 100%;
    min-height: 100%;
    background-color: black;
    opacity: 0.7;
    transition: all 0.5s;
  }
  .closeButton {
    position: absolute;
    top: 0;
    right: 0;
    width: 150px;
    height: 150px;
    color: black;
    font-size: 6em;
    padding: 10px;
    text-align: center;
  }
}
.popup {
  width: 100%;
  height: auto;
  background-color: white;
  border-radius: 4px;
  position: absolute;
  top: 0;
  left: 0;
  padding: 50px;
  text-align: center;
}
h2 {
  font-size: 4em;
}
form {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 40px;
}
input, select {
  width: 100%;
  height: 150px;
  padding: 30px;
  border: 2px solid lightgray;
  font-size: 2.5em;
}
label {
  text-align: left;
  padding-left: 5px;
  margin-bottom: 10px;
  margin-top: 30px;
  font-size: 2.5em;
  font-weight: bold;
}
.button {
  width: 100%;
  height: 150px;
  border: 0px solid black;
  color: white;
  font-size: 3em;
}
.save {
  background-color: rgba(106, 196, 223, 1);
  margin-top: 70px;
}
.delete {
  background-color: rgb(221, 111, 137);
  margin-top: 20px;
}
.add-user {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  input.add {
    width: 80%;
    margin: 0px;
  }
  button.add {
    width: 20%;
    height: 150px;
    margin: 0px;
    font-size: 2.5em;
    background-color: rgba(23, 146, 175, 1);
    color: white;
    border: 0px solid black;
  }
}
.users {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 15px;
  margin-top: 20px;
  ul {
    padding: 20px;
    li{
      text-decoration: none;
      text-align: left;
      list-style: none;
      padding: 10px;
      font-size: 2em;
    }
  }
}

</style>
