import { apiClient, bearerConfig } from '@/common/apiClient'

const state = {
  diagrams: {}
};

const mutations = {
    SET_DIAGRAMS(state, diagrams) {
      state.diagrams = diagrams;
    }
};

const actions = {
  async getDiagramsFromApi({ commit }, data) {
    try {

      const authToken = sessionStorage.getItem('token');

      const config = {
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    };

      const response = await apiClient.get(`/projects/${data.projectId}/diagrams`, bearerConfig())
      if(response.status === 200){
        const diagrams = response.data;
        commit('SET_DIAGRAMS', diagrams);
        return Promise.resolve(diagrams);
      }
    } catch (error) {
      return Promise.reject(error.response);
    }
  },

  async getDiagram({ commit }, data) {
    try {

      const authToken = sessionStorage.getItem('token');

      const config = {
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    };

      const response = await apiClient.get(`/projects/${data.projectId}/diagrams/${data.diagramId}`, bearerConfig())
      if(response.status === 200){
        const diagram = response.data;
        return Promise.resolve(diagram);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async createDiagram({ commit }, data) {
    try {
      const authToken = sessionStorage.getItem('token');
      const config = {
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    };

      const response = await apiClient.post(`/projects/${data.projectId}/diagrams`, {name: data.name}, bearerConfig())
      if(response.status === 200){
        const responsedata = response.data;
        return Promise.resolve(responsedata);
      }
    } catch (error) {
      return Promise.reject(error.response);
    }
  },

  async updateDiagram({ commit }, data) {
    try {
      const authToken = sessionStorage.getItem('token');
      const config = {
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    };
    
      const response = await apiClient.put(`/projects/${data.projectId}/diagrams/${data.diagramId}`, data.diagram, bearerConfig())
      return Promise.resolve(response)
  } catch(error) {
    return Promise.reject(error)
  }
},

  async deleteDiagram({ commit }, data) {
    try {
      const authToken = sessionStorage.getItem('token');
      const config = {
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    };

      const response = await apiClient.delete(`/projects/${data.projectId}/diagrams/${data.diagramId}`, bearerConfig())
      if(response.status === 200){
        const responsedata = response.data;
        return Promise.resolve(responsedata);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getInviationsForProject({ commit }, data){
    try {

      const authToken = sessionStorage.getItem('token');
      const config = {
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    };

      const response = await apiClient.get(`/projects/${data.projectId}/invitations`, bearerConfig())
      if(response.status === 200){
        const invitations = response.data;
        console.log(invitations);
        return Promise.resolve(invitations);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async createInvitation({ commit }, data) {
    try {
      const authToken = sessionStorage.getItem('token');
      const config = {
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    };

      const response = await apiClient.post(`/projects/${data.projectId}/invitations`, {email: data.email}, bearerConfig())
      if(response.status === 200){
        const invitation = response.data.result;
        return Promise.resolve(invitation);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async deleteInvitation({ commit }, data) {
    try {
      const authToken = sessionStorage.getItem('token');
      const config = {
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    };

      const response = await apiClient.delete(`/projects/${data.projectId}/invitations/${data.id}`, bearerConfig())
      if(response.status === 200){
        return Promise.resolve();
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

const getters = {
  getProjects: state => state.projects
};

export default {
  state,
  mutations,
  actions,
  getters
};