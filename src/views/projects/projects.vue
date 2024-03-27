<template>
    <CRow>
      <h2 class="mb-4">Projecten</h2>
      <CCol :md="4" class="mb-4">
        <CCard>
          <CCardHeader>
            <h5 class="mb-0">toevoegen</h5>
          </CCardHeader>
          <CCardBody>
            <CButton color="primary" class="w-100 h-100 text-lg" @click="toggleCreateModal">+</CButton>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol v-for="project in this.projects" :key="project.id" :md="4" class="mb-4">
        <CCard>
          <CCardHeader>
            <div class="d-flex justify-content-between">
              <h5 class="mb-0">{{ project.name }}</h5>
              <CDropdown variant="btn-group">
                <CDropdownToggle color="secondary">
                  <CIcon name="cil-settings" />
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem @click="toggleDeleteModal(project.id)">verwijderen</CDropdownItem>
                  <CDropdownItem href="#" @click="navigateToDiagrams(project.id)">Diagrammen</CDropdownItem>
                  <CDropdownItem href="#" @click="navigateToInvitationsForProject(project.id)">Uitnodigingen bekijken</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </div>
            
          </CCardHeader>
          <CCardBody>
            <p>{{ project.description }}</p>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

    <CModal :backdrop="true" :keyboard="true" :visible="visibleCreateModal" @close="closeCreateModal">
    <CModalHeader>
      <CModalTitle>Nieuw project</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm>
        <CFormInput
          type="text"
          id="create-project-input"
          label="Projectnaam"
          v-model="this.project.name"
          aria-describedby="create-project-input"
        />
        <span v-for="error in this.projectNameErrors" :key="error" class="text-danger d-block">{{ error }}</span>
        
        <CFormTextarea
          id="create-project-description-input"
          label="Beschrijving"
          rows="3"
          v-model="this.project.description"
          aria-describedby="create-project-description-input"
        />

        <span v-for="error in this.projectDescriptionErrors" :key="error" class="text-danger d-block">{{ error }}</span>

      </CForm>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="closeCreateModal">anuleren</CButton>
      <CButton color="primary" @click="this.createProject(this.project)">Project aanmaken</CButton>
    </CModalFooter>
  </CModal>

  <CModal :backdrop="true" :keyboard="true" :visible="visibleDeleteModal" @close="closeDeleteModal">
    <CModalHeader>
      <CModalTitle>Project verwijderen</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <h5>Weet u zeker dat u dit project wilt verwijdern</h5>
      <p>Als u dit project verwidjered worden alle diagrammen en leden die gekoppeld zijna an dit project ook verwijderd.</p>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="closeDeleteModal">anuleren</CButton>
      <CButton color="danger" @click="this.deleteProject">Verwijderen</CButton>
    </CModalFooter>
  </CModal>
</template>
  
  <script>
import { CButton, CCardBody, CCardHeader, CFormTextarea } from '@coreui/vue';


  export default {
    name: "Projects",
    components: {
      CButton,
      CCardBody,
      CCardHeader
    },
    data() {
    return { 
      visibleCreateModal: false,
      visibleDeleteModal: false,
      projectNameErrors: [],
      projectDescriptionErrors: [],
      idToDelete: '',
      projects: [],
      project: {
        name: '',
        description: ''
      }
    }
  },

  async created(){
    this.projects = await this.$store.dispatch("getProjectsFromApi");
  },
  methods: {
    toggleCreateModal() {
      this.visibleCreateModal = true;
    },
    closeCreateModal() {
      this.visibleCreateModal = false;
    },
    toggleDeleteModal(id) {
      this.idToDelete = id;
      this.visibleDeleteModal = true;
    },
    closeDeleteModal() {
      this.visibleDeleteModal = false;
    },
    async createProject(project){
      try{
        const createdProject = await this.$store.dispatch("createProject", { name: this.project.name, description: this.project.description});
        this.projects.push(createdProject);
        this.visibleCreateModal = false;
      }catch(errorResponse){
        if(errorResponse.status === 400){
          this.projectNameErrors = errorResponse.data.errors.name;
          this.projectDescriptionErrors = errorResponse.data.errors.description;
        }
      }
    },

    async navigateToDiagrams(projectId){
      this.$router.push({ path: `/projects/${projectId}/diagrams/`});
    },

    async deleteProject(){
      await this.$store.dispatch("deleteProject", {projectId: this.idToDelete});
      this.projects = this.projects.filter(project => project.id !== this.idToDelete);
      this.visibleDeleteModal = false;
    },
    navigateToInvitationsForProject(projectId){
      this.$router.push({ path: `projects/${projectId}/invitations`});
    }
  }
  }
  </script>
  