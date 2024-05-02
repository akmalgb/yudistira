<template>
  <v-container class="pt-0 px-0" fluid>
    <TitleCard page-title="Informasi Akun" />
    <v-container>
      <MainCard class="ma-2 mt-5">
        <template v-slot:cardIcon>
          <img src="/mainCardIcon/profile.svg" alt="" />
        </template>
        <template v-slot:cardTitle>Informasi Akun</template>
        <template v-slot:cardContent>
          <v-container class="d-flex mt-5 mb-5 px-5">
            <v-row no-gutters>
              <v-col cols="4" class="mt-4">
                <span class="pa-2 label-font"> Nama Lengkap </span>
              </v-col>
              <v-col cols="12" class="mt-2">
                <v-card class="pa-2 card-style" outlined>
                  <span class="ml-2 content-font">{{ profile.name }}</span>
                </v-card>
              </v-col>

              <v-col cols="4" class="mt-4">
                <span class="pa-2 label-font"> Username </span>
              </v-col>
              <v-col cols="12" class="mt-2">
                <v-card class="pa-2 card-style" outlined>
                  <span class="ml-2 content-font">{{ username }}</span>
                </v-card>
              </v-col>

              <v-col cols="4" class="mt-4">
                <span class="pa-2 label-font"> Email </span>
              </v-col>
              <v-col cols="12" class="mt-2">
                <v-card class="pa-2 card-style" outlined>
                  <span class="ml-2 content-font">{{
                    profile.wali_email
                  }}</span>
                </v-card>
              </v-col>

              <v-col cols="4" class="mt-4">
                <span class="pa-2 label-font"> Tempat, Tanggal Lahir </span>
              </v-col>
              <v-col cols="12" class="mt-2">
                <v-card class="pa-2 card-style" outlined>
                  <span class="ml-2 content-font"
                    >{{ profile.birthplace }},
                    {{ $moment(profile.birthdate).format("LL") }}</span
                  >
                  <!-- <span class="ml-2 content-font">{{ new Date(profile.birthdate).toLocaleDateString('id-ID') }}</span> -->
                </v-card>
              </v-col>

              <v-col cols="4" class="mt-4">
                <span class="pa-2 label-font"> NIK </span>
              </v-col>
              <v-col cols="12" class="mt-2">
                <v-card class="pa-2 card-style" outlined>
                  <span class="ml-2 content-font">{{ profile.nik }}</span>
                </v-card>
              </v-col>

              <v-col cols="4" class="mt-4">
                <span class="pa-2 label-font"> Agama </span>
              </v-col>
              <v-col cols="12" class="mt-2">
                <v-card class="pa-2 card-style" outlined>
                  <span class="ml-2 content-font">{{ profile.religion }}</span>
                </v-card>
              </v-col>

              <v-col cols="4" class="mt-4">
                <span class="pa-2 label-font"> Alamat Sesuai KTP </span>
              </v-col>
              <v-col cols="12" class="mt-2">
                <v-card class="pa-2 card-style" outlined>
                  <span class="ml-2 content-font">{{ profile.address }}</span>
                </v-card>
              </v-col>

              <v-col cols="4" class="mt-4">
                <span class="pa-2 label-font"> Telepon </span>
              </v-col>
              <v-col cols="12" class="mt-2 mb-5">
                <v-card class="pa-2 card-style" outlined>
                  <span class="ml-2 content-font">{{ profile.phone }}</span>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </template>
      </MainCard>
    </v-container>
  </v-container>
</template>
<script>
import { mapActions, mapState } from "vuex";
import MainCard from "~/components/dashboard/MainCard.vue";
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
    ...mapActions(["getParentProfile"]),
  },
  created() {
    this.getParentProfile();
  },
  computed: {
    ...mapState(["profile"]),
    ...mapState(["school"]),
    username() {
      return this.$store.state.auth.credentials.username;
    },
  },
};
</script>
<style>
.content-font {
  font-size: 16px;
  font-weight: 600;
}
.label-font {
  font-size: 14px;
  font-weight: 600;
}
.card-style {
  background-color: #f6f6f6 !important;
  border-radius: 10px;
  padding-left: 10px;
}
.col-style {
  margin-left: 20px;
  margin-right: 20px;
}
.container-style {
  max-height: 30px !important;
  justify-content: center !important;
}
.profile-style {
  font-weight: 700;
  font-size: 30px;
}
</style>
