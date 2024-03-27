<template>
    <CRow>
        <div class="d-flex align-items-center justiy-content-center">
          <h2 class="mb-4 mx-2">Project uignodigngen</h2>
          <CButton color="primary" @click="this.toggleCreateModal()">uitnodiging maken</CButton>
        </div>
      <CCol :md="12" class="mb-4">
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">gebruikersnaam</CTableHeaderCell>
              <CTableHeaderCell scope="col">status</CTableHeaderCell>
              <CTableHeaderCell scope="col"> verwijderen</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow v-for="invitation in this.invitations" :key="invitation.id">
              <CTableHeaderCell scope="row">{{ invitation.memberToInvite.username }}</CTableHeaderCell>
              <CTableDataCell>{{ this.status[invitation.status] }}</CTableDataCell>
              <CTableDataCell>
                <CButton v-if="this.shouldShowActions(invitation)" color="danger" @click="this.toggleDeleteModal(invitation.id)" class="w-100">intrekken</CButton>
              </CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
    </CCol>


    <CModal :backdrop="true" :keyboard="true" :visible="visibleCreateModal" @close="closeCreateModal">
      <CModalHeader>
        <CModalTitle>Ontwerper uitnodigen</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <CFormInput
            type="text"
            id="create-invitation-input"
            label="email"
            v-model="this.invitation.email"
            aria-describedby="create-invitation-input"
          />
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="closeCreateModal">anuleren</CButton>
        <CButton color="primary" @click="this.sendInvitation()">uitnodiging sturen</CButton>
      </CModalFooter>
    </CModal>
  
    <CModal :backdrop="true" :keyboard="true" :visible="visibleDeleteModal" @close="closeDeleteModal">
      <CModalHeader>
        <CModalTitle>Project verwijderen</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <h5>Weet u zeker dat u deze uitnodiging wilt intrekken</h5>
        <p></p>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="closeDeleteModal">anuleren</CButton>
        <CButton color="danger" @click="deleteInvitation">Verwijderen</CButton>
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
      invitations: [],
      invitation: {
        email: '',
      },
      status: {
        "0": "In afwachting",
        "1": "Geaccepteert",
        "2": "Verlopen",
        "3": "Gewijgerd"
      }
    }
  },

  async created(){
    this.invitations = await this.$store.dispatch("getInviationsForProject", {projectId: this.$route.params.id});
  },
  methods: {
    toggleCreateModal() {
      this.visibleCreateModal = true;
    },
    shouldShowActions(invitation){
    if(invitation.status == 1 || invitation.status == 3){
      return false;
    }else{
      return true;
    }
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
    async sendInvitation(){
      const craetedInvitation = await this.$store.dispatch("createInvitation", {projectId: this.$route.params.id,  email: this.invitation.email});
      this.invitations = await this.$store.dispatch("getInviationsForProject", {projectId: this.$route.params.id});
      this.visibleCreateModal = false;
    },

    async deleteInvitation(){
      await this.$store.dispatch("deleteInvitation", { projectId: this.$route.params.id, id: this.idToDelete});
      this.invitations = this.invitations.filter(invitation => invitation.id !== this.idToDelete);
      this.visibleDeleteModal = false;
    },
    navigateToInvitationsForProject(projectId){
      this.$router.push({ path: `project/${projectId}/notifications`});
    }
  }
  }
  </script>
  