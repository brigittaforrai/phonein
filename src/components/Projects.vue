<template>
  <div class="container">

    <h1 v-if="username">Welcome {{username}}</h1>
    <h1 v-if="!username">Your Projects</h1>

    <div class="tile" v-for="building in buildings" v-if="buildings">
        <div class="lock" @click="openDoor(building.buildingId)"></div>
      <div class="editProject" @click="openProjectSettings(building.buildingId)"></div>

      <input type="text" class="project-name" v-on:keyup.enter="updateProjectName(building.buildingId, building.buildingName)" v-model="building.buildingName" :placeholder="building.buildingName">
    </div>

    <add-button v-on:click.native="openAddBuilding"></add-button>

    <transition name="component-fade" mode="out-in">
      <add-project-form v-if="addBuilding" v-on:close-popup="closeAddBuilding"></add-project-form>
    </transition>

    <transition name="component-fade" mode="out-in">
      <project-settings v-if="buildingSettings" v-on:close-settings="closeProjectSettings"></project-settings>
    </transition>
  </div>


</template>

<script>
  /* eslint-disable */
  import AddButton from './AddButton';
  import AddProjectForm from './AddProjectForm';
  import ProjectSettings from './ProjectSettings';

  export default {
    data: function() {
      return {
        addBuilding: false,
        buildingSettings: false,
      };
    },
    methods: {
      updateProjectName: function(id, newName) {
        let data = {
          id: id,
          updates: {buildingName: newName}
        }
        this.$store.dispatch('a_updateBuilding', data);
        event.target.blur();
      },
      openAddBuilding: function() {
        this.addBuilding = true;
      },
      closeAddBuilding: function() {
        this.addBuilding = false;
      },
      openProjectSettings: function(id) {
        this.buildingSettings = true;
        this.$store.commit('m_selectBuildingId', id);
      },
      closeProjectSettings: function(id) {
        this.buildingSettings = false;
      },
      openDoor: function(id) {
        let s = this.$store;
        this.$store.dispatch('a_updateBuilding', {id: id, updates: {open: true}});
        // if(id !== '-KlA2O_KPF586DjABCjn') {
          setTimeout(function(){
            s.dispatch('a_updateBuilding', {id: id, updates: {open: false}})
          }, 3000);
        // }
        console.log('door is opened');
      },
    },
    computed: {
      buildings() {
        return this.$store.getters.g_getBuildingsByEmail;
      },
      username() {
        return this.$store.getters.g_username;
      },
    },
    components: {
      AddButton,
      AddProjectForm,
      ProjectSettings,
    }
  };
</script>


<style scoped lang="postcss">

  .container {
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  h1 {
    text-align: center;
    min-height: 200px;
    margin-bottom: 20px;
    font-size: 3.5em;
    height: auto;
    padding: 40px;
    letter-spacing: 3px;
    color: white;
    font-weight: 100;
    background-color: black;
    padding-top: 70px;
  }
  .tile {
    display: inline-block;
    width: 100%;
    height: 200px;
    position: flex;
    flex-direction: column;
    position: relative;
    position: relative;
    padding-top: 50px;
    margin-bottom: 10px;
    /*border-bottom: 2px solid gray;*/
    background-color: rgba(240, 240, 240, 0.9);
    /*border-bottom: 10px solid rgba(23, 146, 175, 1);*/
  }

  .editProject {
    position: absolute;
    top: 0;
    right: 200px;
    width: 200px;
    height: 100%;
    background-color: rgba(23, 146, 175, 0.5);
    background-image: url('./../assets/settings.svg');
    background-size: 45%;
    background-repeat: no-repeat;
    background-position: center center;
  }
  .project-name {
    box-sizing: border-box;
    display: inline-block;
    width: calc(100% - 400px);
    height: auto;
    text-align: left;
    border: 0px solid white;
    border-bottom: 1px solid rgba(0, 0, 0, 0);
    color: black;
    padding-left: 50px;
    padding-right: 50px;
    background-color: transparent;
    font-size: 3.5em;
  }
  .project-name:focus {
    border: 0px solid white;
    color: black;
    outline-width: 0px;
  }
  .lock {
    position: absolute;
    top: 0;
    right: 0px;
    width: 200px;
    height: 100%;
    background-color: rgb(221, 111, 137);
    margin:0px;
    font-size: 3em;
    background-image: url('./../assets/padlock.svg');
    background-size: 45%;
    background-repeat: no-repeat;
    background-position: center center;
  }

</style>
