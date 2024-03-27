import axios from "axios";

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

      const authToken = sessionStorage.getItem('token');
      const config = {
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    };

      const response = await axios.get(`https://localhost:7215/projects`, config);
      if(response.status === 200){
        const projects = response.data.result;
        return Promise.resolve(projects);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async createProject({ commit }, data) {
    try {
      const authToken = sessionStorage.getItem('token');
      const config = {
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    };

      const response = await axios.post(`https://localhost:7215/projects/`, {name: data.name, description: data.description}, config);
      if(response.status === 200){
        const project = response.data.result;
        return Promise.resolve(project);
      }
    } catch (error) {
      return Promise.reject(error.response);
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

      const response = await axios.delete(`https://localhost:7215/projects/${data.projectId}`, config);
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

      const response = await axios.get(`https://localhost:7215/projects/${data.projectId}/diagrams`, config);
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

      const response = await axios.get(`https://localhost:7215/invitations`, config);
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

      const response = await axios.post(`https://localhost:7215/projects/${data.projectId}/invitations/`, {email: data.email}, config);
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

      const response = await axios.put(`https://localhost:7215/invitations/accept`, {invitationId: data.invitationId}, config);
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

      const response = await axios.put(`https://localhost:7215/invitations/reject`, {invitationId: data.invitationId}, config);
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

      const response = await axios.delete(`https://localhost:7215/projects/${data.projectId}/invitations/${data.id}`, config);
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