<template>
  <CRow>
      <div class="d-flex align-items-center justiy-content-center">
        <h2 class="mb-4 mx-2">Project uitnodigingen</h2>
      </div>
    <CCol :md="12" class="mb-4">
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">invite</CTableHeaderCell>
            <CTableHeaderCell scope="col">status</CTableHeaderCell>
            <CTableHeaderCell scope="col"> accepteren</CTableHeaderCell>
            <CTableHeaderCell scope="col"> verwijderen</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow v-for="invitation in this.invitations" :key="invitation.id">
            <CTableHeaderCell scope="row">{{ invitation.memberToInvite.username }} heeft je uitgenodigd om mee te werken aan {{ invitation.project.name }}</CTableHeaderCell>
            <CTableDataCell>{{ this.status[invitation.status] }}</CTableDataCell>
            <CTableDataCell>
              <CButton v-if="this.shouldShowActions(invitation)" color="success" @click="this.acceptInvitation(invitation.id)" class="w-100">afwijzen</CButton>
            </CTableDataCell>

            <CTableDataCell>
              <CButton v-if="this.shouldShowActions(invitation)" color="danger" @click="this.toggleDeleteModal(invitation.id)" class="w-100">afwijzen</CButton>
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
  </CCol>

  <CModal :backdrop="true" :keyboard="true" :visible="visibleDeleteModal" @close="closeDeleteModal">
    <CModalHeader>
      <CModalTitle>Project verwijderen</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <h5>Weet u zeker dat u deze uitnodiging wilt afwijzen?</h5>
      <p></p>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="closeDeleteModal">anuleren</CButton>
      <CButton color="danger" @click="this.rejectInvitation(this.idToDelete)">Verwijderen</CButton>
    </CModalFooter>
  </CModal>

  </CRow>
</template>

<script>
import { CButton, CCardBody, CCardHeader, CFormTextarea } from '@coreui/vue';


export default {
  name: "Notifications",
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
  this.invitations = await this.$store.dispatch("getInviationsForUser");
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

  async rejectInvitation(id){
    await this.$store.dispatch("rejectInvitation", {invitationId: id});
    this.invitations = this.invitations.filter(invitation => invitation.id !== id);
    this.closeDeleteModal();
  },
  
  async acceptInvitation(id){
    await this.$store.dispatch("acceptInvitation", {invitationId: id});
    this.invitations = this.invitations.filter(invitation => invitation.id !== id);
    this.closeDeleteModal();
  },
  
  async accepttInvitation(id){
    await this.$store.dispatch("rejectInvitation", {invitationId: id});
    this.invitations = this.invitations.filter(invitation => invitation.id !== id);
    this.closeDeleteModal();
  },

  navigateToInvitationsForProject(projectId){
    this.$router.push({ path: `project/${projectId}/notifications`});
  }
}
}
</script>
