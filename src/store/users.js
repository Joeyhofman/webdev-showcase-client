import { apiClient, bearerConfig } from '@/common/apiClient'

const state = {
  users: {}
};

const mutations = {
    SET_USERS(state, users) {
      state.users = users;
    }
};

const actions = {
  async getUsersFromApi({ commit }) {
    try {

      const authToken = sessionStorage.getItem('token');
      console.log(authToken);
      const config = {
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    };

      const response = await apiClient.get('/users', bearerConfig())
      console.log(response)
      if(response.status === 200){
        const users = response.data;
        commit('SET_USERS', users);
        return Promise.resolve(users);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async deativateUser({ commit }, id) {
    try {

      const authToken = sessionStorage.getItem('token');
      console.log(authToken);
      const config = {
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    };

      const response = await apiClient.delete(`/users/${id}`, bearerConfig())
      console.log(response)
      if(response.status === 200){
        return Promise.resolve();
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async editUser({ commit }, userToUpdate) {
    try {

      const authToken = sessionStorage.getItem('token');
      console.log(authToken);
      const config = {
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    };

      const response = await apiClient.put(`/users/${userToUpdate.id}`, { email: userToUpdate.email, userName: userToUpdate.userName}, bearerConfig())
      console.log(response)
      if(response.status === 200){
        return Promise.resolve();
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

const getters = {
  getUsers: state => state.users
};

export default {
  state,
  mutations,
  actions,
  getters
};