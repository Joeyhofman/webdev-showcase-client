<template>
    <div class="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow class="justify-content-center">
          <CCol :md="7" :lg="8" :xl="6">
            <CCard class="mx-4">
              <CCardBody class="p-4">
                <CForm>
                  <h1>Twee factor authenticatie</h1>
                  <p class="text-body-secondary">Er is een email gestuurd naar test@test.nl met een 4-cijferige code. vul de code in onderstaande veld in.</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-lock" />
                    </CInputGroupText>
                    <CFormInput placeholder="verficatie code" />
                  </CInputGroup>
                  <div class="d-grid">
                    <CButton color="success" @click="() => this.$router.push({ path: '/' })" class="mb-2">Verifieren</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TwoFactorCode',
  }
  </script>
  