<template>
  <CDropdown placement="bottom-end" variant="nav-item">
    <CDropdownToggle class="py-0 pe-0" :caret="false">
      <CAvatar :src="avatar" size="md" />
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownHeader
        component="h6"
        class="bg-body-secondary text-body-secondary fw-semibold mb-2 rounded-top"
      >
        Account
      </CDropdownHeader>
      <CDropdownItem @click="navigateToNotifications">
        <CIcon icon="cil-bell" /> notificaties 
      </CDropdownItem>
      <CDropdownHeader
        component="h6"
        class="bg-body-secondary text-body-secondary fw-semibold my-2"
      >
        Settings
      </CDropdownHeader>
      <CDropdownItem @click="logOut">
        <CIcon icon="cil-lock-locked" /> Uitloggen
      </CDropdownItem>
      <CDropdownItem @click="navigateToSetupTwoFactorAuth">
        <CIcon icon="cil-lock-locked" /> 2 factor authenticatie inschakelen
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>

<script>
import avatar from '@/assets/images/avatars/default.jpeg'
export default {
  name: 'AppHeaderDropdownAccnt',
  data() {
    return {
      avatar: avatar,
      itemsCount: 42,
    }
  },
  methods: {
    async logOut(){
      await this.$store.dispatch("logout");
      this.$router.push('/pages/login');
      
    },
    navigateToNotifications(){
      this.$router.push('/notifications');
    },
    navigateToSetupTwoFactorAuth(){
      this.$router.push('/setup-two-factor-auth');
    }
  }
}
</script>
