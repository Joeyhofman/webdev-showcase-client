<template>
    <CRow>
      <h2 class="mb-4">Projecten</h2>
      <CCol :md="4" class="mb-4">
        <CCard>
          <CCardHeader>
            <h5 class="mb-0">toevoegen</h5>
          </CCardHeader>
          <CCardBody>
            <CButton color="primary" class="w-100 h-100 text-lg" @click="toggleCreateModal" shape="rounded-50">+</CButton>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol :md="4" class="mb-4">
        <CCard>
          <CCardHeader>
            <div class="d-flex justify-content-between">
              <h5 class="mb-0">Project 1</h5>
              <CDropdown variant="btn-group">
                <CDropdownToggle color="secondary">
                  <CIcon name="cil-settings" />
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem @click="toggleDeleteModal">verwijderen</CDropdownItem>
                  <CDropdownItem href="#">lid toevoegen</CDropdownItem>
                  <CDropdownItem href="#">lid verwijderen</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </div>
            
          </CCardHeader>
          <CCardBody>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis numquam quis dolorem est iste qui commodi vero optio, debitis reprehenderit?</p>
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
          aria-describedby="create-project-input"
        />
        
        <CFormTextarea
          id="create-project-description-input"
          label="Beschrijving"
          rows="3"
          aria-describedby="create-project-description-input"
        />
      </CForm>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="closeCreateModal">anuleren</CButton>
      <CButton color="primary">Project aanmaken</CButton>
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
      <CButton color="danger">Verwijderen</CButton>
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
  