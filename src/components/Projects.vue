<template>
  <div class="container">
    <h1 v-if="username">{{username}}'s Projects</h1>
    <h1 v-if="!username">Your Projects</h1>
    <add-button v-on:click.native="openAddBuilding"></add-button>

    <div class="tile" v-for="building in buildings" v-if="buildings">
      <router-link :to="{ name: 'Building', params: { buildingId: building.buildingId } }" >
        <div class="tileImage" :class="building.type"></div>
      </router-link>
      <div class="editProject" @click="openProjectSettings(building.buildingId)"></div>

      <input type="text" class="project-name" v-on:keyup.enter="updateProjectName(building.buildingId, building.buildingName)" v-model="building.buildingName" :placeholder="building.buildingName">
    </div>

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
        //TODO if name changes, change item location names
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
      }
    },
    computed: {
      buildings() {
        return this.$store.getters.g_buildings;
      },
      username() {
        return this.$store.getters.g_username;
      }
    },
    components: {
      AddButton,
      AddProjectForm,
      ProjectSettings,
    }
  };
</script>


<style scoped lang="postcss">

  .contaner {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  .tile {
    display: inline-block;
    margin: 30px;
    width: 25%;
    position: flex;
    flex-direction: column;
    position: relative;
  }
  .tileImage {
    width: 100%;
    padding-bottom: 100%;
    height: 150px;
    background-size: 50%;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    border-radius: 4px;
    transition: all 0.1s ease;
    background-color: lightgray;
    background-image: url('https://image.flaticon.com/icons/svg/107/107052.svg');
  }

  .tile:hover {
    .tileImage {
      background-size: 60%;
    }
    .tileImage:before {
      background-color: black;
      opacity: 0.2;
    }
    .home:before {
      background-color: deeppink;
      opacity: 0.2;
    }
    .office:before {
      background-color: darkblue;
      opacity: 0.2;
    }
    .school:before {
      background-color: goldenrod;
      opacity: 0.2;
    }
  }

  .tileImage:before {
    content: "";
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: all 0.2s;
    border-radius: 4px;
  }
  .editProject {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 20px;
    background-image: url(https://image.flaticon.com/icons/svg/126/126472.svg);
    background-size: 50%;
    background-repeat: no-repeat;
    background-position: center center;
    &:hover {
      background-color: white;
    }
  }
  .project-name {
    box-sizing: border-box;
    display: inline-block;
    width: 100%;
    text-align: left;
    font-size: 1.1em;
    border: 0px solid white;
    border-bottom: 1px solid rgba(0, 0, 0, 0);
    color: gray;
    height: 25px;
    margin-top: 7px;
    padding-left: 5px;
    padding-right: 5px;
    padding-bottom: 3px;
  }
  .project-name:focus {
    border: 0px solid white;
    border-bottom: 1px solid gray;
    color: gray;
    outline-width: 0px;
  }
  .home {
    background-image: url("https://image.flaticon.com/icons/svg/351/351688.svg");
    background-color: darksalmon;
  }
  .office {
    background-image: url("https://image.flaticon.com/icons/svg/232/232487.svg");
    background-color: lightblue;
  }
  .school {
    background-image: url("https://image.flaticon.com/icons/svg/169/169856.svg");
    background-color: khaki;
  }

</style>
