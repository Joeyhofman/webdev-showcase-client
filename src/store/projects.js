import { apiClient, bearerConfig } from '@/common/apiClient'

const state = {
  projects: {}
};

const mutations = {
    SET_PROJECTS(state, projects) {
      state.projects = projects;
    }
};

const actions = {

  async getProjectsFromApi({ commit }){
    try {
      const response = await apiClient.get('/projects', bearerConfig())
      if(response.status === 200){
        const projects = response.data.result ?? response.data
        return Promise.resolve(projects)
      }
      return Promise.resolve([])
    } catch (error) {
      return Promise.reject(error)
    }
  },

  async createProject({ commit }, data) {
    try {
      const response = await apiClient.post('/projects', { name: data.name, description: data.description }, bearerConfig())
      if (response.status === 200 || response.status === 201) {
        const project = response.data.result ?? response.data
        return Promise.resolve(project)
      }
      return Promise.reject(response)
    } catch (error) {
      return Promise.reject(error?.response ?? error)
    }
  },

  async deleteProject({ commit }, data) {
    const authToken = sessionStorage.getItem('token');
    try {
      const config = {
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    };

      const response = await apiClient.delete(`/projects/${data.projectId}`, bearerConfig())
      if(response.status === 200){
        return Promise.resolve();
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

      const response = await apiClient.get(`/projects/${data.projectId}/diagrams`, bearerConfig())
      if(response.status === 200){
        const diagrams = response.data;
        return Promise.resolve(diagrams);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async getInviationsForUser({ commit }){
    try {

      const authToken = sessionStorage.getItem('token');
      const config = {
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    };

      const response = await apiClient.get('/invitations', bearerConfig())
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

  async acceptInvitation({ commit }, data) {
    try {
      const authToken = sessionStorage.getItem('token');
      const config = {
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    };

      const response = await apiClient.put('/invitations/accept', {invitationId: data.invitationId}, bearerConfig())
      if(response.status === 200){
        const invitation = response.data.result;
        return Promise.resolve(invitation);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },
  
  async rejectInvitation({ commit }, data) {
    try {
      const authToken = sessionStorage.getItem('token');
      const config = {
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    };

      const response = await apiClient.put('/invitations/reject', {invitationId: data.invitationId}, bearerConfig())
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