<template>
    <CRow>
        <div class="d-flex align-items-center justiy-content-center">
          <h2 class="mb-4 mx-2">diagrammen</h2>
          <CButton color="primary" @click="this.toggleCreateModal()">diagram maken</CButton>
        </div>
      <CCol :md="12" class="mb-4">
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">naam</CTableHeaderCell>
              <CTableHeaderCell scope="col"> bijwereken</CTableHeaderCell>
              <CTableHeaderCell scope="col"> verwijderen</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow v-for="diagram in this.diagrams" :key="diagram.id">
              <CTableHeaderCell scope="row">{{ diagram.name }}</CTableHeaderCell>
              
              <CTableDataCell>
                <CButton color="primary" @click="this.editDiagram(diagram)" class="w-100">bijwereken</CButton>
              </CTableDataCell>

              <CTableDataCell>
                <CButton color="danger" @click="this.toggleDeleteModal(diagram.id)" class="w-100">verwijderen</CButton>
              </CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
    </CCol>


    <CModal :backdrop="true" :keyboard="true" :visible="visibleCreateModal" @close="closeCreateModal">
      <CModalHeader>
        <CModalTitle>diagram aanmaken</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <CFormInput
            type="text"
            id="create-diagram-input"
            label="Naam"
            v-model="this.diagram.name"
            aria-describedby="create-diagram-input"
          />
        <span v-for="error in this.nameErrors" :key="error" class="text-danger d-block">{{ error }}</span>

        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="closeCreateModal">anuleren</CButton>
        <CButton color="primary" @click="this.createDiagram()">diagram aanmaken</CButton>
      </CModalFooter>
    </CModal>
  
    <CModal :backdrop="true" :keyboard="true" :visible="visibleDeleteModal" @close="closeDeleteModal">
      <CModalHeader>
        <CModalTitle>diagram verwijderen</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <h5>Weet u zeker dat u deze diagram wilt verwijderen?</h5>
        <p></p>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="closeDeleteModal">anuleren</CButton>
        <CButton color="danger" @click="deleteDiagram">Verwijderen</CButton>
      </CModalFooter>
    </CModal>

    </CRow>
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
      nameErrors: [],
      descriptionErrors: [],
      diagrams: [],
      diagram: {
        name: '',
      },
    }
  },

  async created(){
    this.diagrams = await this.$store.dispatch("getDiagramsFromApi", {projectId: this.$route.params.id});
    console.log(this.diagrams);
  },
  methods: {
    toggleCreateModal() {
      this.visibleCreateModal = true;
    },
    closeCreateModal() {
      this.visibleCreateModal = false;
    },
    toggleDeleteModal(id) {
      console.log(`id is : ${id}`);
      this.idToDelete = id;
      this.visibleDeleteModal = true;
    },
    closeDeleteModal() {
      this.visibleDeleteModal = false;
    },
    editDiagram(diagram){
      const projectId = this.$route.params.id;
      const diagramId = diagram.id;
      this.$router.push({path: `/pages/editor/${projectId}/${diagramId}`});
    },
    async createDiagram(){
      try{
        await this.$store.dispatch("createDiagram", {projectId: this.$route.params.id,  name: this.diagram.name});
        this.diagrams = await this.$store.dispatch("getDiagramsFromApi", {projectId: this.$route.params.id});
        this.visibleCreateModal = false;
      }catch(errorResponse){
        if(errorResponse.status === 400){
          this.nameErrors = errorResponse.data.errors.name;
          this.descriptionErrors = errorResponse.data.errors.description;
        }
      }
    },

    async deleteDiagram(){
      await this.$store.dispatch("deleteDiagram", { projectId: this.$route.params.id, diagramId: this.idToDelete});
      this.diagrams = this.diagrams.filter(diagram => diagram.id !== this.idToDelete);
      this.visibleDeleteModal = false;
    },
    navigateToInvitationsForProject(projectId){
      this.$router.push({ path: `project/${projectId}/notifications`});
    }
  }
  }
  </script>
  