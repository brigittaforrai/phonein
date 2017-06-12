<template>
  <div class="container-popup">
    <div class="close" v-on:click="closePopup"></div>
    <div class="popup addProject">
      <h2>Add new Building</h2>
      <div class="closeButton" @click="closePopup">x</div>

      <form>
        <label>Building name</label>
        <input type="text" v-model="buildingName"></input>

        <label>Add address</label>
        <input class="add" type="text" v-model="buildingLocation"></input>

        <label>Add users</label>
        <div class="add-user">
          <input class="add" type="text" placeholder="Add user email" v-model="newUser" v-on:keyup.enter="addUser"></input>
          <button class="add" @click="addUser">Add</button>
        </div>

        <div class="users" v-if="userList.length">
          <ul>
            <li v-for="user in userList">{{user}}</li>
          </ul>
        </div>

        <button class="save-button" @click="addBuilding">Save</button>
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
        newUser: '',
        userList: [],

      }
    },
    methods: {
      closePopup: function() {
        this.$emit('close-popup');
      },
      addUser: function() {
        this.userList.push(this.newUser);
        this.newUser = '';
      },
      addBuilding: function() {
        this.userList.push(this.userEmail);
        let data = {
          users: this.userList,
          buildingName: this.buildingName,
          address: this.buildingLocation,
          open: false,
          calling: false,
        }
        this.$store.dispatch('a_addBuilding', data);
        this.closePopup();
      },
    },
    computed: {
      userEmail() {
        return this.$store.getters.g_email;
      }
    }
  }
</script>

<style scoped lang="postcss">
.container-popup {
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

.save-button {
  background-color: rgba(106, 196, 223, 1);
  margin-top: 70px;
  width: 100%;
  height: 150px;
  border: 0px solid black;
  color: white;
  font-size: 3em;
}
</style>
