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
                  <CAlert v-if="this.invalidCodeError" color="danger"
                    >Uw ingevulde code is onjuist. Probeer het nogmaal!</CAlert
                  >
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-lock" />
                    </CInputGroupText>
                    <CFormInput data-cy="code" v-model="this.code" placeholder="verficatie code" />
                  </CInputGroup>
                  <div class="d-grid">
                    <CButton color="success" @click="this.verifyCode" class="mb-2">Verifieren</CButton>
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
    data () {
      return {
        invalidCodeError: false,
        email: '',
        password: '',
        code: ''
      }
    },
    created () {
      this.email = this.$route.query.email
      this.password = this.$route.query.password
    },
    methods: {
      async verifyCode () {
        try{
          console.log({email: this.email, password: this.password, code: this.code})
          const response = await this.$store.dispatch('login', {
            email: this.email,
            password: this.password,
            twoFactorCode: this.code
          })

          if (response.status === 200) {
            this.$router.push({ path: '/' })
          }
        }catch(error){ 
          const response = error.response;
          if(response.status === 401) {
            this.invalidCodeError = true;
          }
        }
      }
    }
  }
  </script>
  