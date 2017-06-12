/* eslint-disable */

import Vue from 'vue';
import Vuex from 'vuex';
import fb from './../firebase.js';
import router from './../router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      loggedIn: false,
      username: '',
      avatar: 'https://image.flaticon.com/icons/svg/374/374996.svg',
      googleAvatar: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg',
      buildings: [],
      selectedBuildingId: null,
      selectedRoomId: '-KkpPGsg1jB8zFoerCMa',
      selectedFloorId: null,
      buildingTypes: [
        'office',
        'home',
        'school',
        'other',
      ],
      tags: [],
      roomTypes: ['Add new'],
      roomProps: ['Add new'],
      items: [],
  },

  getters: {
    g_loginState(state) {
      return state.loggedIn;
    },
    g_username(state) {
      return state.username;
    },
    g_avatar(state) {
      return state.avatar;
    },
    g_buildings(state) {
      return state.buildings;
    },
    g_selectedBuildingId(state) {
      return state.selectedBuildingId;
    },
    g_selectedFloorId(state) {
      return state.selectedFloorId;
    },
    g_selectedRoomId(state) {
      return state.selectedRoomId;
    },
    g_selectedBuilding(state, getters) {
      return getters.g_buildings.filter(building =>
        building.buildingId === getters.g_selectedBuildingId)[0];
    },
    g_selectedRoom(state, getters) {
      let floorId = getters.g_selectedFloorId;
      let building = getters.g_selectedBuilding;
      let roomId = getters.g_selectedRoomId;
      if(building && floorId && roomId) {
        return building.floors[floorId].rooms[roomId];
      };
    },
    g_selectedFloor(state, getters) {
      let floorId = getters.g_selectedFloorId;
      let building = getters.g_selectedBuilding;
      if(building && floorId) {
        return building.floors[floorId];
      };
    },
    g_getRoomsByFloorId(state, getters) {
      return (id) => {
        let building = getters.g_selectedBuilding;
        if(building) {
          return building.floors[id].rooms;
        };
      }
    },
    g_getBuildingTypes(state) {
      return state.buildingTypes;
    },
    g_getTags(state) {
      return state.tags;
    },
    g_getRoomProps(state) {
      return state.roomProps;
    },
    g_getRoomTypes(state) {
      return state.roomTypes;
    },
    g_items(state) {
      return state.items;
    },
    g_itemsByLocation(state, getters) {
      return getters.g_items.filter(item =>
        item.location.roomId === getters.g_selectedRoomId);
    },
  },

  mutations: {
    m_logIn: (state, user) => {
      fb.loadProjects();
      fb.loadTags();
      fb.loadRoomProps();
      fb.loadRoomTypes();
      fb.loadItems();
      state.loggedIn = true;
      state.username = user.displayName;
      if(user.photoURL !== state.googleAvatar) {
        state.avatar = user.photoURL;
      };
      if(router.history.current.name === "Login") {
        router.push('/projects');
      }
    },
    m_logOut: (state) => {
        state.loggedIn = false;
        state.username = '';
        state.buildings = [];
        state.avatar = '';
        router.push('/login');
    },
    m_selectBuildingId: (state, id) => {
      state.selectedBuildingId = id;
    },
    m_selectFloorId: (state, id) => {
      state.selectedFloorId = id;
    },
    m_selectRoomId: (state, id) => {
      state.selectedRoomId = id;
    },
    m_loadProjects: (state, data) => {
      let value = data.val();
      let isUpdated = false;
      state.buildings = state.buildings.map(building => {
        if (building.buildingId === value.buildingId) {
         isUpdated = true;
          return value;
        }
        return building;
      });
      if (!isUpdated) {
        state.buildings.push(value);
      }
    },
    m_deleteProject: (state, data) => {
      let value = data.val();
      state.buildings = state.buildings.filter(building => {
        if (building.buildingId !== value.buildingId) {
          return true
        }
      });
    },
    m_loadItems: (state, data) => {
      state.items.push(data.val());
    },
    m_deleteItem: (state, data) => {

    },
    m_loadTags: (state, data) => {
      state.tags.push(data.val());
    },
    m_loadRoomTypes: (state, data) => {
      state.roomTypes.push(data.val());
    },
    m_loadRoomProps: (state, data) => {
      state.roomProps.push(data.val());
    },
    m_deleteTag: (state, data) => {

    },
  },

  actions: {
    a_addBuilding: (context, data) => {
      fb.saveBuilding(data);
    },
    a_deleteBuilding: (context, id) => {
      fb.deleteBuilding(id);
    },
    a_updateBuilding: (context, data) => {
      fb.updateBuilding(data);
    },
    a_addFloor: (context, data) => {
      data.buildingId = context.getters.g_selectedBuildingId;
      fb.saveFloor(data);
    },
    a_addRoom: (context, data) => {
      data.buildingId = context.getters.g_selectedBuildingId;
      data.floorId = context.getters.g_selectedFloorId;
      fb.saveRoom(data);
    },
    a_addNewTag: (context, newTag) => {
      let isUpdated = false;
      context.state.tags = context.state.tags.map(tag => {
        if (tag === newTag) {
         isUpdated = true;
          return newTag;
        }
        return tag;
      });
      if (!isUpdated) {
        fb.saveNewTag(newTag);
      }
    },
    a_addNewRoomType: (context, newType) => {
      let isUpdated = false;
      context.state.roomTypes = context.state.roomTypes.map(type => {
        if (type === newType) {
         isUpdated = true;
          return newType;
        }
        return type;
      });
      if (!isUpdated) {
        fb.saveNewRoomType(newType);
      }
    },
    a_addNewRoomProp: (context, newProp) => {
      let isUpdated = false;
      context.state.roomProps = context.state.roomProps.map(prop => {
        if (prop === newProp) {
         isUpdated = true;
          return newProp;
        }
        return prop;
      });
      if (!isUpdated) {
        fb.saveNewRoomProp(newProp);
      }
    },
    a_addItem: (context, data) => {
      fb.saveItem(data);
    }
  },
});
