<template>
    <CRow>
      <h2 class="mb-4">twee factor authenticatie instellen</h2>
      <CFormCheck
      id="twofactorenabled"
      label="twee factor authentitcatei inschakelen"
      v-model="this.twoFactorEnabled"
      @change="updateTwoFactorAuthPreferences"
    />
      <CCard>
        <CCardBody>
          <qrcode-vue v-if="this.twoFactorEnabled" :value="qrText" :text="qrText" :options="qrOptions" />
        </CCardBody>
      </CCard>
    </CRow>
</template>
  
  <script>
import { CButton, CCard, CCardBody, CCardHeader, CFormTextarea } from '@coreui/vue';
import QrcodeVue from 'qrcode.vue';

  export default {
    name: "Projects",
    components: {
      CButton,
      CCardBody,
      CCardHeader,
      QrcodeVue
    },
    data() {
    return { 
      twoFactorEnabled: false,
      qrText: '',
      qrOptions: {
        width: 200,
        height: 200,
      },
    }
  },
  methods: {
    async updateTwoFactorAuthPreferences() {
        console.log(!this.twoFactorEnabled);
        if(!this.twoFactorEnabled){
          const response = await this.$store.dispatch('updateTwoFactorAuthPreference', {
            enable: true,
            twoFactorCode: "770028"
          });
          console.log(response);
          if (response.status === 200) {
            const { sharedKey } = response.data;
            console.log(sharedKey, response.data);
            this.qrText = sharedKey;
            console.log('twee factor authenticatie instellingen opgeslagen');
          }else {
          console.error('twee factor authenticatie instellingen niet opgeslagen');
          }
        }else {
          const response = await this.$store.dispatch('updateTwoFactorAuthPreference', {
            enabled: false,
          });
          console.log(response);
          if (response.status === 200) {
            const { sharedKey } = response.data;
            console.log(sharedKey, response.data);
            this.qrText = sharedKey;
            console.log('twee factor authenticatie instellingen opgeslagen');
          }else {
          console.error('twee factor authenticatie instellingen niet opgeslagen');
          }
        }
      }
    },
  }
  </script>
  