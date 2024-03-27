<template>
  <div class="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="9" :lg="7" :xl="6">
          <CCard class="mx-4">
            <CCardBody class="p-4">
              <CForm>
                <h1>Registreren</h1>
                <p class="text-body-secondary">Nieuw account aanmaken</p>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-user" />
                  </CInputGroupText>
                  <CFormInput data-cy="username" placeholder="Gebruikersnaam" v-model="this.username" autocomplete="gebruikersnaam" />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>@</CInputGroupText>
                  <CFormInput data-cy="email" placeholder="Email" v-model="this.email" autocomplete="email" />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput
                    data-cy="password"
                    type="password"
                    placeholder="wachtwoord"
                    autocomplete="wachtwoord"
                    v-model="this.password"
                  />
                </CInputGroup>
                <CInputGroup class="mb-4">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput
                    type="password"
                    data-cy="repeat-password"
                    placeholder="Herhaal wachtwoord"
                    v-model="this.confirmPassword"
                    autocomplete="wachtwoord"
                  />
                </CInputGroup>
                <div class="d-grid">
                  <CButton data-cy="register" color="success" @click="this.register" class="mb-2">registreren</CButton>
                  <CButton data-cy="i-have-an-account" color="secondary" @click="() => this.$router.push({ path: '/pages/login' })">Ik heb al een account</CButton>
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
  name: 'Register',
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      username: ''
    }
  },
  methods: {
    async register() {
      try {
        const response = await this.$store.dispatch('register', { username: this.username, email: this.email, password: this.password });
        console.log(response);
        if(response.status === 401 || response.status === 400){
          clgo.error(response.data.message);
        }else if(response.status === 200){
          this.$router.push({ path: '/' });
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    }
  }
}
</script>
