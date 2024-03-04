<template>
    <CRow>
      <h2 class="mb-4">Gebruikers</h2>
      <CCol :md="12" class="mb-4">
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">gebruikersnaam</CTableHeaderCell>
              <CTableHeaderCell scope="col">emaiil</CTableHeaderCell>
              <CTableHeaderCell scope="col"> bewereken</CTableHeaderCell>
              <CTableHeaderCell scope="col"> verwijderen</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow v-for="user in this.users" :key="user.id">
              <CTableHeaderCell scope="row">{{ user.id }}</CTableHeaderCell>
              <CTableDataCell>{{ user.username}}</CTableDataCell>
              <CTableDataCell>{{ user.email }}</CTableDataCell>
              <CTableDataCell>
                <CButton color="secondary" class="w-100" @click="this.toggleEditModal(user)">edit</CButton>
              </CTableDataCell>
              <CTableDataCell>
                <CButton color="danger" class="w-100" @click="this.toggleDeleteModal">delete</CButton>
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
        <EditUser />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="closeEditModal">anuleren</CButton>
        <CButton color="primary">Bijwereken</CButton>
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
        <CButton color="danger">Verwijderen</CButton>
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
        users: [
          {
            id: 1,
            username: 'Otto',
            email: 'otto@example.com',
          },
          {
            id: 2,
            username: 'Joey Hofman',
            email: 'joeyhofman1@gmail.com',
          },
          {
            id: 3,
            username: 'Joey Hofman',
            email: 'joeyhofman1@gmail.com',
          },
          {
            id: 4,
            username: 'Joey Hofman',
            email: 'joeyhofman1@gmail.com',
          },
        ]
      }
    },
  methods: {
    toggleEditModal() {
      this.visibleEditModal = true;
    },
    closeEditModal() {
      this.visibleEditModal = false;
    },
    toggleDeleteModal() {
      this.visibleDeleteModal = true;
    },
    closeDeleteModal() {
      this.visibleDeleteModal = false;
    }
  }
  }
  </script>
  