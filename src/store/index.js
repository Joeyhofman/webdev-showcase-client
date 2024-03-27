import { createStore } from 'vuex'
import Auth from './auth';
import Projects from './projects';
import Users from './users';
import Diagrams from './diagrams';

export default createStore({
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: false,
    theme: 'light',
    ...Auth.state,
    ...Projects.state,
    ...Users.state,
    ...Diagrams.state
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
    ...Auth.mutations,
    ...Users.mutations,
    ...Diagrams.mutations
  },
  actions: {
    ...Auth.actions,
    ...Projects.actions,
    ...Users.actions,
    ...Diagrams.actions

  },
  modules: {
    ...Auth.modules,
    ...Projects.modules,
    ...Users.modules,
    ...Diagrams.modules
  },
})
