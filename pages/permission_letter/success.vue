<template>
  <v-container class="pt-0 px-0" fluid>
    <TitleCard page-title="Surat Izin" />
    <v-container>
      <v-row>
        <v-col cols="12">
          <PlainCard>
            <template v-slot:cardContent>
              <v-container class="d-flex justify-center">
                <v-img
                  class="success-img"
                  lazy-src="/Checked.svg"
                  max-height="150"
                  max-width="150"
                  src="/Checked.svg"
                ></v-img>
              </v-container>
              <v-container class="d-flex justify-center">
                <h1>Surat Izin Berhasil Diajukan,</h1>
              </v-container>
              <v-container class="d-flex justify-center">
                <button
                  :class="`${$config.mainColor}`"
                  class="white--text back-button"
                  @click="$router.push('/permission_letter')"
                >
                  Kembali ke Riwayat Surat Izin
                </button>
              </v-container>
            </template>
          </PlainCard>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import PlainCard from "~/components/dashboard/PlainCard.vue";
import { mapState } from "vuex";
export default {
  head() {
    return {
      title: (this.school.name ?? "Wali Murid") + " - Surat Izin",
    };
  },
  middleware: "auth",
  name: "IndexPermissionLetter",
  components: {
    PlainCard,
  },
  data() {
    return {
      userProfileTabs: null,
    };
  },
  computed: {
    ...mapState(["school"]),
  },
};
</script>
<style>
.success-img {
  margin-top: 150px;
}
h2 {
  margin-bottom: 50px;
}
.col {
  margin: 0;
}
.back-button {
  margin-top: 150px;
  margin-bottom: 50px;
  min-height: 50px !important;
  min-width: 250px !important;
  font-size: 14px !important;
  border-radius: 10px !important;
}
.chip {
  min-width: 160px;
  justify-content: center;
  font-size: 14px;
  font-weight: 400;
  color: #ffffff !important;
}
.score {
  font-size: 36px;
  font-weight: 600;
}
.score.good {
  color: #5aaf55;
}
.score.bad {
  color: #ff7171;
}
.v-application--is-ltr
  .v-data-table
  > .v-data-table__wrapper
  > table
  > thead
  > tr
  > th {
  align-content: center;
  color: black;
  font-size: 14px;
}
.fb-tab.v-tab--outlined {
  border: thin solid #539401;
}
.tabs {
  min-width: 330px !important;
  border: #539401 !important;
  border-width: 1px !important;
  border-radius: 10px 10px 0px 0px !important;
  color: #539401 !important;
}
.tabs.active {
  background-color: rgb(83, 148, 10, 0.3);
}
</style>
