<template>
  <v-container class="pt-0 px-0" fluid>
    <TitleCard page-title="Profil Sekolah" />
    <v-container>
      <MainCard class="ma-2 mt-5">
        <template v-slot:cardIcon>
          <img src="/mainCardIcon/school.svg" alt="" />
        </template>
        <template v-slot:cardTitle>Profil Sekolah</template>
        <template v-slot:cardContent>
          <v-container class="d-flex mt-5 mb-5 px-5">
            <v-row no-gutters>
              <v-col cols="4" class="mt-4">
                <span class="pa-2 label-font"> Nama Sekolah </span>
              </v-col>
              <v-col cols="12" class="mt-2">
                <v-card class="pa-2 card-style" outlined>
                  <span class="ml-2 content-font">{{ school.name }}</span>
                </v-card>
              </v-col>

              <v-col cols="4" class="mt-4">
                <span class="pa-2 label-font"> Nomor Induk / NSPN </span>
              </v-col>
              <v-col cols="12" class="mt-2">
                <v-card class="pa-2 card-style" outlined>
                  <span class="ml-2 content-font">Muhammad Al Fatih</span>
                </v-card>
              </v-col>

              <v-col cols="4" class="mt-4">
                <span class="pa-2 label-font"> Akreditasi </span>
              </v-col>
              <v-col cols="12" class="mt-2">
                <v-card class="pa-2 card-style" outlined>
                  <span class="ml-2 content-font">{{
                    school.accreditation
                  }}</span>
                </v-card>
              </v-col>

              <v-col cols="4" class="mt-4">
                <span class="pa-2 label-font"> Alamat Sekolah </span>
              </v-col>
              <v-col cols="12" class="mt-2">
                <v-card class="pa-2 card-style" outlined>
                  <span class="ml-2 content-font">{{ school.address }}</span>
                </v-card>
              </v-col>

              <v-col cols="4" class="mt-4">
                <span class="pa-2 label-font"> Telepon </span>
              </v-col>
              <v-col cols="12" class="mt-2">
                <v-card class="pa-2 card-style" outlined>
                  <span class="ml-2 content-font">{{ school.phone }}</span>
                </v-card>
              </v-col>

              <v-col cols="4" class="mt-4">
                <span class="pa-2 label-font"> Email </span>
              </v-col>
              <v-col cols="12" class="mt-2">
                <v-card class="pa-2 card-style" outlined>
                  <span class="ml-2 content-font">{{ school.email }}</span>
                </v-card>
              </v-col>

              <v-col cols="4" class="mt-4">
                <span class="pa-2 label-font"> Website </span>
              </v-col>
              <v-col cols="12" class="mt-2">
                <v-card class="pa-2 card-style" outlined>
                  <span class="ml-2 content-font">{{ school.website }}</span>
                </v-card>
              </v-col>

              <v-col cols="4" class="mt-4">
                <span class="pa-2 label-font"> Social Media </span>
              </v-col>
              <v-col cols="12" class="mt-2 mb-5">
                <v-card class="pa-2 card-style" outlined>
                  <span class="ml-2 content-font"
                    >Facebook : {{ school.facebook }}</span
                  >
                  <br />
                  <span class="ml-2 content-font"
                    >Instagram : {{ school.instagram }}</span
                  >
                  <br />
                  <span class="ml-2 content-font"
                    >Youtube : {{ school.youtube }}</span
                  >
                </v-card>
              </v-col>

              <v-col cols="4" class="mt-4">
                <span class="pa-2 label-font"> Tanggal Bergabung </span>
              </v-col>
              <v-col cols="12" class="mt-2 mb-5">
                <v-card class="pa-2 card-style" outlined>
                  <span class="ml-2 content-font">{{
                    $moment(school.created_at).format("DD-MM-YYYY")
                  }}</span>
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
import MainCard from "~/components/dashboard/MainCard.vue";
import { mapState } from "vuex";
export default {
  head() {
    return {
      title: (this.school.name ?? "Wali Murid") + " - Profil",
    };
  },
  components: {
    MainCard,
  },
  methods: {},
  computed: {
    ...mapState(["school"]),
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
