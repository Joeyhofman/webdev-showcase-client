<template>
    <CRow>
      <h2 class="mb-4">Gebruikers</h2>
      <CCol :md="12" class="mb-4">
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">gebruikersnaam</CTableHeaderCell>
              <CTableHeaderCell scope="col">emaiil</CTableHeaderCell>
              <CTableHeaderCell scope="col"> bewereken</CTableHeaderCell>
              <CTableHeaderCell scope="col"> actief</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow v-for="user in this.users" :key="user.id">
              <CTableDataCell>{{ user.username}}</CTableDataCell>
              <CTableDataCell>{{ user.email }}</CTableDataCell>
              <CTableDataCell>
                <CButton color="secondary" class="w-100" @click="this.toggleEditModal(user)">edit</CButton>
              </CTableDataCell>
              <CTableDataCell>
                <CButton color="danger" v-if="user.lockoutEnabled" class="w-100" @click="this.toggleDeleteModal(user.id)">gedeactiveerd</CButton>
                <CButton color="primary" v-if="!user.lockoutEnabled" class="w-100" @click="this.toggleDeleteModal(user.id)">actief</CButton>
              </CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
    </CCol>



    <CModal :backdrop="true" :keyboard="true" :visible="visibleEditModal" @close="closeEditModal">
      <CModalHeader>
        <CModalTitle>Bewereken</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <CInputGroup class="mb-3">
            <CInputGroupText>
              <CIcon icon="cil-user" />
            </CInputGroupText>
            <CFormInput v-model="this.userToUpdate.username" placeholder="Gebruikersnaam" autocomplete="gebruikersnaam" />
          </CInputGroup>
          <CInputGroup class="mb-3">
            <CInputGroupText>@</CInputGroupText>
            <CFormInput v-model="this.userToUpdate.email" placeholder="Email" autocomplete="email" />
          </CInputGroup>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="closeEditModal">anuleren</CButton>
        <CButton color="primary" @click="editUser">Bijwereken</CButton>
      </CModalFooter>
    </CModal>

    <CModal :backdrop="true" :keyboard="true" :visible="visibleDeleteModal" @close="closeDeleteModal">
      <CModalHeader>
        <CModalTitle>Gebruiker verwijderen</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <h5>Weet u zeker dat u deze gebruiker wilt verwijdern?</h5>
        <p>Als u deze gebruiker verwijderd, wordt hij ook verwidjerd uit alle projecten waar hij een deel van uitmaakte.</p>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="closeDeleteModal">anuleren</CButton>
        <CButton color="danger" @click="this.deativateUser">Verwijderen</CButton>
      </CModalFooter>
    </CModal>
    </CRow>
</template>
  
  <script>
import { CButton, CCardBody, CCardHeader } from '@coreui/vue';
import EditUser  from "@/views/users/EditUser.vue";

  export default {
    name: "Projects",
    components: {
      EditUser,
      CButton,
      CCardBody,
      CCardHeader
    },
    data: () => {
      return {
        visibleEditModal: false,
        visibleDeleteModal: false,
        idToDelete: '',
        userToUpdate: {},
        users: []
      }
    },

  async created(){
    const users = await this.$store.dispatch("getUsersFromApi");
    this.users = users;
  },
  methods: {
    toggleEditModal(user) {
      this.userToUpdate = user;
      console.log(this.userToUpdate)
      this.visibleEditModal = true;
    },
    closeEditModal() {
      this.userToUpdate = {};
      this.visibleEditModal = false;
    },
    toggleDeleteModal(id) {
      this.idToDelete = id;
      this.visibleDeleteModal = true;
    },
    deativateUser(){
      this.$store.dispatch("deativateUser", this.idToDelete);
      let index = this.users.findIndex(user => user.id === this.idToDelete);

      if (index !== -1) {
          this.users[index].lockoutEnabled = !this.users[index].lockoutEnabled;
      }
      this.visibleDeleteModal = false;
    },
    closeDeleteModal() {
      this.visibleDeleteModal = false;
    },
    editUser(){
      this.$store.dispatch("editUser", this.userToUpdate);
      let index = this.users.findIndex(user => user.id === this.userToUpdate.id);
      if (index!== -1) {
          this.users[index].userName = this.userToUpdate.userName;
          this.users[index].email = this.userToUpdate.email;
      }
    }
  }
}
  </script>
  