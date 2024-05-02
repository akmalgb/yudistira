<template>
  <v-container class="pt-0 px-0" fluid>
    <TitleCard page-title="Profile" />
    <v-container>
      <MainCard class="ma-2 mt-5">
        <template v-slot:cardIcon>
          <img src="/mainCardIcon/profile.svg" alt="" />
        </template>
        <template v-slot:cardTitle>Profile</template>
        <template v-slot:cardContent>
          <v-col class="col-style">
            <!-- <v-container class="d-flex justify-center">
              <v-avatar color="primary" size="128">
                <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
              </v-avatar>
            </v-container> -->
            <v-col class="d-flex justify-center">
              <span class="profile-style">{{ profile.name }}</span>
            </v-col>

            <v-col class="d-flex justify-start align-center mt-2">
              <v-container
                class="container-style my-3"
                @click="$router.push('/profile/detail')"
              >
                <v-icon>mdi-account</v-icon>
                <span class="ml-2">Informasi Akun</span>
              </v-container>
            </v-col>

            <v-col class="d-flex justify-start align-center mt-2">
              <v-container
                class="container-style my-3"
                @click="$router.push('/profile/changepassword')"
              >
                <v-icon>mdi-lock</v-icon>
                <span class="ml-2">Ubah Kata Sandi</span>
              </v-container>
            </v-col>

            <v-col class="d-flex justify-start align-center mt-2">
              <v-container class="container-style my-3">
                <v-icon>mdi-headset</v-icon>
                <span class="ml-2">Bantuan</span>
              </v-container>
            </v-col>

            <v-col class="d-flex justify-start align-center mt-2">
              <v-container
                class="container-style my-3"
                @click="$router.push('profile/schooldetail')"
              >
                <v-icon>mdi-information</v-icon>
                <span class="ml-2">Informasi Sekolah</span>
              </v-container>
            </v-col>

            <v-col class="d-flex justify-start align-center mt-2">
              <v-container class="container-style my-3">
                <v-icon>mdi-shield</v-icon>
                <span class="ml-2">Kebijakan Privasi</span>
              </v-container>
            </v-col>

            <v-col class="d-flex justify-start align-center mt-2 mb-2">
              <v-container
                class="container-style my-3"
                @click="_handleLogoutClick()"
              >
                <v-icon>mdi-logout</v-icon>
                <span class="ml-2">Logout / Keluar</span>
              </v-container>
            </v-col>
          </v-col>
        </template>
      </MainCard>
    </v-container>
  </v-container>
</template>
<script>
import MainCard from "~/components/dashboard/MainCard.vue";
import { mapActions, mapState } from "vuex";
export default {
  head() {
    return {
      title: (this.school.name ?? "Wali Murid") + " - Profil",
    };
  },
  components: {
    MainCard,
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    ...mapActions(["getParentProfile"]),
    _handleLogoutClick() {
      this.logout();
      this.$router.push("/login");
      window.location.reload();
    },
  },
  created() {
    this.getParentProfile();
  },
  computed: {
    ...mapState(["profile"]),
    ...mapState(["school"]),
  },
};
</script>
<style>
.col-style {
  margin-left: 20px;
  margin-right: 20px;
}
.container-style {
  max-height: 30px !important;
  justify-content: center !important;
  cursor: pointer;
}
.profile-style {
  font-weight: 700;
  font-size: 30px;
}
</style>
