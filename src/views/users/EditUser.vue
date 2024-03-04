<template>
    <CRow>
      <CCol class="mb-4">
        <CCard class="mx-4">
          <CCardBody class="p-4">
            <CForm>
              <CInputGroup class="mb-3">
                <CInputGroupText>
                  <CIcon icon="cil-user" />
                </CInputGroupText>
                <CFormInput placeholder="Gebruikersnaam" autocomplete="gebruikersnaam" />
              </CInputGroup>
              <CInputGroup class="mb-3">
                <CInputGroupText>@</CInputGroupText>
                <CFormInput placeholder="Email" autocomplete="email" />
              </CInputGroup>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
</template>
  
  <script>
import { CButton, CCardBody, CCardHeader } from '@coreui/vue';


  export default {
    name: "EditUser",
    components: {
      CButton,
      CCardBody,
      CCardHeader
    },
    data() {
    return { 
      visibleCreateModal: false,
      visibleDeleteModal: false,
    }
  },
  methods: {
    toggleCreateModal() {
      this.visibleCreateModal = true;
    },
    closeCreateModal() {
      this.visibleCreateModal = false;
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
  