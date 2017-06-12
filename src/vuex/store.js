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
    email: '',
    avatar: 'https://image.flaticon.com/icons/svg/374/374996.svg',
    googleAvatar: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg',
    buildings: [],
    selectedBuildingId: '',
    users: [],
    calling: false,
  },

  getters: {
    g_loginState(state) {
      return state.loggedIn;
    },
    g_username(state) {
      return state.username;
    },
    g_email(state) {
      return state.email;
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
    g_selectedBuilding(state, getters) {
      return getters.g_buildings.filter(building =>
        building.buildingId === getters.g_selectedBuildingId)[0];
    },
    g_getUsers(state, getters) {
      return state.users;
    },
    g_getBuildingsByEmail(state, getters) {
      let userEmail = getters.g_email;
      return getters.g_buildings.filter(building =>
        building.users.filter(user =>
          user === userEmail)[0]);
    },
    g_getBuildingsByCalling(state, getters) {
      return getters.g_buildings.filter(building =>
        building.calling === true)[0];
    },
    g_getBuildingsByOpen(state, getters) {
      return getters.g_buildings.filter(building =>
        building.open === true)[0];
    },
    g_callingState(state) {
      return state.calling;
    }
  },
  mutations: {
    m_logIn: (state, user) => {
      fb.loadProjects();
      fb.loadState();
      state.loggedIn = true;
      state.username = user.displayName;
      state.email = user.email;
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
    m_loadState: (state, data) => {
      state.calling = data.val();
    },
    m_deleteProject: (state, data) => {
      let value = data.val();
      state.buildings = state.buildings.filter(building => {
        if (building.buildingId !== value.buildingId) {
          return true
        }
      });
    },
    m_startCall: (state) => {
      fb.updateState({calling: true});
    },
    m_finishCall: (state) => {
      fb.updateState({calling: false});
    }
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
    a_getUserId: (context, email) => {
      const users = context.getters.g_getUsers;
      let id = users.map(user => {
        if(user.email === email) {
          return user.userId;
        }
      })
    },
  },
});
