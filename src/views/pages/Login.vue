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
                  <span v-if="this.loginError" data-cy="error-message" class="text-white bg-danger">Uw gebruikersnaam of wachtwoord is onnuist.</span>
                  <p class="text-body-secondary">Log in met uw account</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      data-cy="email"
                      type="email"
                      placeholder="email"
                      autocomplete="email"
                      v-model="this.email"
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      data-cy="password"
                      type="password"
                      placeholder="wachtworod"
                      autocomplete="wachtwoord"
                      v-model="this.password"
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                        <CButton data-cy="login" color="primary"  @click="this.login" class="px-4"> Inloggen </CButton>
                        <CButton data-cy="create-account" color="secondary" @click="() => this.$router.push({ path: '/pages/register' })" class="px-4 mx-1"> registreren </CButton>
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
  data() {
    return {
      email: '',
      password: '',
      loginError: false,
    }
  },
  methods: {
    async login() {
      try {
        this.loginError = false;
        const res = await this.$store.dispatch('login', { email: this.email, password: this.password });
        this.$router.push({path: '/'});
      }catch(error){
        console.log(error);
        const response = error.response;
        if(error.response.status === 401){
          if(response.data.detail === "Failed"){
            this.loginError = true;
          }else if(response.data.detail === "LockedOut"){
            this.loginError = true;
          }else{
            this.$router.push({path: '/pages/twofactorcode', query: { email: this.email, password: this.password }});
          }
        }
      }
    }
  }
}
</script>
