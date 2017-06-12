/* eslint-disable */
import Vue from 'vue';
import Router from 'vue-router';
import Projects from './../components/Projects';
import Building from './../components/Building';
import Room from './../components/Room';
import Login from './../components/Login';
// import TagField from './../components/TagField';
import Table from './../components/Table';
import store from './../vuex/store.js';

Vue.use(Router);

export default new Router({
  history: true,
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/table',
      name: 'Table',
      component: Table,
    },
    {
      alias: '/',
      path: '/projects',
      name: 'Projects',
      component: Projects,
    },
    {
      path: '/building/:buildingId',
      name: 'Building',
      component: Building,
      beforeEnter: (to, from, next) => {
        store.commit('m_selectBuildingId', to.params.buildingId);
        next();
      }
    },
    {
      path: '/building/:buildingId/:floorId/:roomId',
      name: 'Room',
      component: Room,
      beforeEnter: (to, from, next) => {
        store.commit('m_selectBuildingId', to.params.buildingId);
        store.commit('m_selectFloorId', to.params.floorId);
        store.commit('m_selectRoomId', to.params.roomId);
        next();
      }
    },
  ],
});
