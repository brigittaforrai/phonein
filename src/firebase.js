/* eslint-disable */

import Firebase from 'firebase';
import store from './vuex/store.js'

let authenticate;
let database;
let buildingsRef;
let tagsRef;
let roomTypesRef;
let roomPropsRef;
let itemsRef;
let floorRef;
let firebaseApp;

const firebaseConfig = {
  apiKey: 'AIzaSyBpPeXdNRed9CvlftdtTxlB7cmYAqxldrI',
  authDomain: 'inventoryapp-114de.firebaseapp.com',
  databaseURL: 'https://inventoryapp-114de.firebaseio.com',
  projectId: 'inventoryapp-114de',
  storageBucket: 'inventoryapp-114de.appspot.com',
  messagingSenderId: '1001412061553',
};

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
const setItems = function(data) {
  store.commit('m_loadItems', data);
};
const setTags = function(data) {
  store.commit('m_loadTags', data);
};
const setRoomTypes = function(data) {
  store.commit('m_loadRoomTypes', data);
};
const setRoomProps = function(data) {
  store.commit('m_loadRoomProps', data);
};
const deleteProject = function(data) {
  store.commit('m_deleteProject', data);
};

export default {
  signIn() {
    const provider = new Firebase.auth.GoogleAuthProvider();
    authenticate.signInWithPopup(provider);

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
  loadItems() {
    itemsRef = database.ref('items');
    itemsRef.off();
    itemsRef.on('child_added', setItems);
    itemsRef.on('child_changed', setItems);
  },
  loadTags() {
    tagsRef = database.ref('tags');
    tagsRef.off();
    tagsRef.on('child_added', setTags);
    tagsRef.on('child_changed', setTags);
  },
  loadRoomTypes() {
    roomTypesRef = database.ref('roomTypes');
    roomTypesRef.off();
    roomTypesRef.on('child_added', setRoomTypes);
    roomTypesRef.on('child_changed', setRoomTypes);
  },
  loadRoomProps() {
    roomPropsRef = database.ref('roomProps');
    roomPropsRef.off();
    roomPropsRef.on('child_added', setRoomProps);
    roomPropsRef.on('child_changed', setRoomProps);
  },
  saveNewTag(data) {
    tagsRef.push(data);
  },
  saveNewRoomType(data) {
    roomTypesRef.push(data);
  },
  saveNewRoomProp(data) {
    roomPropsRef.push(data);
  },
  saveItem(data) {
    let newItemRef = itemsRef.push();
    data.itemId = newItemRef.key;
    newItemRef.set(data);
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
  saveFloor(data) {
    floorRef = database.ref('buildings/' + data.buildingId + '/floors');
    let newFloorRef = floorRef.push();
    data.floor.floorId = newFloorRef.key;
    newFloorRef.set(data.floor);
  },
  saveRoom(data) {
    let roomRef = database.ref('buildings/' + data.buildingId + '/floors/' + data.floorId + '/rooms');
    let newRoomRef = roomRef.push();
    data.room.roomId = newRoomRef.key;
    newRoomRef.set(data.room);
  }
};
