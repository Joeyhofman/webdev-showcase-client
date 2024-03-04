<template>
  <div class="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Inloggen</h1>
                  <p class="text-body-secondary">Log in met uw account</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      type="email"
                      placeholder="email"
                      autocomplete="email"
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="wachtworod"
                      autocomplete="wachtwoord"
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                        <CButton color="primary"  @click="() => this.$router.push({ path: '/pages/twofactorcode' })" class="px-4"> Inloggen </CButton>
                        <CButton color="secondary" @click="() => this.$router.push({ path: '/pages/register' })" class="px-4 mx-1"> registreren </CButton>
                      </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
export default {

  name: 'Login',
}
</script>
