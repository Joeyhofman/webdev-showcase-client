import axios from "axios";

const state = {
  accessToken: null,
  refreshToken: null,
  user: null
};

const mutations = {
  SET_ACCESS_TOKEN(state, accessToken) {
    state.accessToken = accessToken;
  },
  SET_REFRESH_TOKEN(state, refreshToken) {
    state.refreshToken = refreshToken;
  },
  SET_USER(state, user) {
    state.user = user;
  },
  CLEAR_TOKENS(state) {
    state.accessToken = null;
    sessionStorage.removeItem("token");
    state.refreshToken = null;
    sessionStorage.removeItem("refresh_token");
  }
};

const actions = {
  async login({ commit }, credentials) {
    try {
      const response = await axios.post('https://localhost:7215/login', credentials);
        if(response.status === 200){
          const { accessToken, refreshToken } = response.data;
          commit('SET_ACCESS_TOKEN', accessToken);
          sessionStorage.setItem('token', accessToken);
          commit('SET_REFRESH_TOKEN', refreshToken);
          return Promise.resolve(response);
        }
    } catch (error) {
        return Promise.reject(error);
    }  
  },

  async updateTwoFactorAuthPreference({ commit }, preferences) {
    const config = {
        headers: {
            'Authorization': `Bearer ${getters.getAuthToken()}`
        }
    };
    const response = await axios.post('https://localhost:7215/manage/2fa', preferences, config);
    console.log(response);
    return Promise.resolve(response);
},

  async getUser(){
    try {
      const response = await axios.get('https://localhost:7215/user');
      const { accessToken, refreshToken, user } = response.data;
      commit('SET_ACCESS_TOKEN', accessToken);
      commit('SET_REFRESH_TOKEN', refreshToken);
      commit('SET_USER', user);
    } catch (error) {
      console.log(error);
    }
  },
  async register({ commit }, userData) {
      const response = await axios.post('https://localhost:7215/register', userData);
      const { accessToken, refreshToken, user } = response.data;
      commit('SET_ACCESS_TOKEN', accessToken);
      commit('SET_REFRESH_TOKEN', refreshToken);
      return Promise.resolve(response);
  },
  async logout({ commit }) {
      const config = {
          headers: {
              'Authorization': `Bearer ${getters.getAuthToken()}`
          }
      };
      const response = await axios.post('https://localhost:7215/logout', {}, config);
      commit('CLEAR_TOKENS');
      sessionStorage.removeItem("token");
      commit('SET_USER', null);
      return response;
  }
};

const getters = {
  isAuthenticated: state => !!state.accessToken,
  currentUser: state => state.user,
  getAuthToken: state => sessionStorage.getItem('token')
};

export default {
  state,
  mutations,
  actions,
  getters
};