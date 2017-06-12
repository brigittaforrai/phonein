/* eslint-disable */

import Firebase from 'firebase';
import store from './vuex/store.js'

let authenticate;
let database;
let buildingsRef;
let stateRef;
let firebaseApp;

import firebaseConfig from './config.js';

let firebaseInit = function () {
  firebaseApp = Firebase.initializeApp(firebaseConfig);
  authenticate = firebaseApp.auth();
  database = firebaseApp.database();

  authenticate.onAuthStateChanged(function (user) {
    if (user) {
      store.commit('m_logIn', authenticate.currentUser);
      console.log("You're logged in!");
    } else {
      store.commit('m_logOut');
      console.log("You're not logged in!");
    }
  });
};

if (!firebaseApp) {
  firebaseInit();
};

const setProjects = function(data) {
  store.commit('m_loadProjects', data);
};
const deleteProject = function(data) {
  store.commit('m_deleteProject', data);
};
const setState = function(data) {
  store.commit('m_loadState', data);
};

export default {
  signIn() {
    var provider = new Firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    Firebase.auth().signInWithRedirect(provider);

    authenticate.getRedirectResult().then(function(result) {
      if (result.credential) {
        var token = result.credential.accessToken;
      }
      var user = result.user;
    });

    // const provider = new Firebase.auth.GoogleAuthProvider();
    // authenticate.signInWithPopup(provider);

  },
  signOut() {
    firebaseApp.auth().signOut();
  },
  loadProjects() {
    buildingsRef = database.ref('buildings');
    buildingsRef.off();
    buildingsRef.on('child_added', setProjects);
    buildingsRef.on('child_changed', setProjects);
    buildingsRef.on('child_removed', deleteProject);
  },
  loadState() {
    stateRef = database.ref('states');
    stateRef.off();
    stateRef.on('child_changed', setState);
    stateRef.on('child_added', setState);
  },
  updateState(data) {
    let state = database.ref('states');
    state.update(data);
  },
  saveBuilding(data) {
    let newBuildingRef = buildingsRef.push();
    data.buildingId = newBuildingRef.key;
    newBuildingRef.set(data);
  },
  deleteBuilding(id) {
    let selectedBuilding = database.ref('buildings/' + id);
    selectedBuilding.remove();
  },
  updateBuilding(data) {
    let selectedBuilding = database.ref('buildings/' + data.id);
    selectedBuilding.update(data.updates);
  },
};
