<template>
  <v-container class="pt-0 px-0" fluid>
    <TitleCard page-title="Ubah Kata Sandi" />
    <v-container>
      <MainCard class="ma-2 mt-5">
        <template v-slot:cardIcon>
          <img src="/mainCardIcon/password.svg" alt="" />
        </template>
        <template v-slot:cardTitle>Ubah Kata Sandi</template>
        <template v-slot:cardContent>
          <v-container class="d-flex mt-5 mb-5">
            <v-row no-gutters>
              <v-col cols="4" class="mt-4">
                <span class="pa-2 label-font"> Kata Sandi Lama </span>
              </v-col>
              <v-col cols="12" class="mt-2">
                <input class="password-input" type="password" id="passwd" />
              </v-col>

              <v-col cols="4" class="mt-4">
                <span class="pa-2 label-font"> Katasandi Baru </span>
              </v-col>
              <v-col cols="12" class="mt-2">
                <input class="password-input" type="password" id="passwdcm" />
              </v-col>

              <v-col cols="4" class="mt-4">
                <span class="pa-2 label-font"> Konfirmasi Katasandi Baru </span>
              </v-col>
              <v-col cols="12" class="mt-2">
                <input class="password-input" type="password" id="passwdold" />
              </v-col>

              <v-col cols="12" class="mt-2 d-flex align-center">
                <input
                  class="checkbox-style"
                  type="checkbox"
                  @change="
                    gshowPwd('passwd'),
                      gshowPwdcm('passwdcm'),
                      gshowPwdold('passwdold')
                  "
                />
                <span class="mt-5 ml-3">Tampilkan Sandi</span>
              </v-col>

              <button
                :class="`${$config.mainColor}`"
                class="white--text button-style"
              >
                Kirim
              </button>
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
  computed: {
    ...mapState(["school"]),
  },
  methods: {
    gshowPwd(id) {
      let x = document.getElementById(id);
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
    },
    gshowPwdcm(id) {
      let x = document.getElementById(id);
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
    },
    gshowPwdold(id) {
      let x = document.getElementById(id);
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
    },
  },
};
</script>
<style>
.button-style {
  margin-top: 100px;
  border-radius: 10px;
  height: 50px;
  width: 100%;
}
.checkbox-style {
  height: 25px;
  width: 25px;
  margin-top: 20px;
  margin-left: 5px;
}
.password-input {
  border-radius: 10px;
  background-color: #e7e7e7;
  border-color: grey !important;
  border-width: 2px !important;
  margin: 5px;
  padding: 10px;
  width: 100%;
}
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
