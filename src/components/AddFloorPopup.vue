<template>
  <div class="container">
    <div class="close" v-on:click="closePopup"></div>
    <div class="popup add-floor">
      <h2>Add new floor</h2>

      <form>
        <label>Floor name</label>
        <input type="text" v-model="floorName" required></input>

        <label>Floor sign</label>
        <input type="text" v-model="floorSign" required></input>

        <button @click="save" v-on:keyup.enter="save">Save</button>
      </form>

    </div>
</div>
</template>

<script>
  /* eslint-disable */
  export default {
    data: function() {
      return {
        floorName: '',
        floorSign: '',
      }
    },
    methods: {
      closePopup: function() {
        this.$emit('close-popup');
      },
      save: function() {
        let data = {
          floor: {
            floorName: this.floorName,
            floorSign: this.floorSign,
          },
        };
        this.$store.dispatch('a_addFloor', data);
        this.closePopup();
      },
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

button {
  margin-top: 20px;
}
</style>
