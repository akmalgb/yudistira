<template>
  <v-container class="pt-0 px-0" fluid>
    <TitleCard page-title="Conference" />
    <v-container>
      <v-row>
        <v-col cols="12">
          <MainCard>
            <template v-slot:cardIcon>
              <img src="/mainCardIcon/conference.svg" alt="" />
            </template>
            <template v-slot:cardTitle>Conference</template>
            <template v-slot:cardContent>
              <v-container>
                <v-simple-table>
                  <thead>
                    <tr>
                      <th>Rapat</th>
                      <th>Waktu</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="py-2">
                        <v-row class="d-flex align-center">
                          <v-col cols="12" md="3">
                            <v-img
                              src="/videoConverence.svg"
                              max-width="60"
                            ></v-img>
                          </v-col>
                          <v-col>
                            <span class="head-style">
                              Rapat Dengan Komite
                            </span>
                            <br />
                            <span class="sub-style"> Indra Wahyu, S.Pd </span>
                          </v-col>
                        </v-row>
                      </td>
                      <td>
                        Senin, 10 Maret 2021
                        <br />
                        08.00 WIB, 90 menit
                      </td>
                      <td>
                        <button class="white--text blue-gradient btn-style">
                          Join Meet
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td class="py-2">
                        <v-row class="d-flex align-center">
                          <v-col cols="12" md="3">
                            <v-img
                              src="/videoConverence.svg"
                              max-width="60"
                            ></v-img>
                          </v-col>
                          <v-col>
                            <span class="head-style">
                              Rapat Dengan Komite
                            </span>
                            <br />
                            <span class="sub-style"> Indra Wahyu, S.Pd </span>
                          </v-col>
                        </v-row>
                      </td>
                      <td>
                        Senin, 10 Maret 2021
                        <br />
                        08.00 WIB, 90 menit
                      </td>
                      <td>
                        <button
                          :class="`${$config.mainColor}`"
                          class="white--text btn-style"
                        >
                          Finished
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </v-container>
            </template>
          </MainCard>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import MainCard from "~/components/dashboard/MainCard.vue";
export default {
  head() {
    return {
      title: (this.school.name ?? "Wali Murid") + " - Conference",
    };
  },
  middleware: "auth",
  name: "IndexSchedule",
  components: {
    MainCard,
  },
  computed: {
    ...mapState(["school"]),
  },
  data() {
    return {
      day: "",
    };
  },
  created() {
    this.getDayNow();
  },
  methods: {
    changeDay(day) {
      this.day = day;
    },
    getDayName(day) {
      if (!day) return "senin";
      const hari = {
        1: "senin",
        2: "selasa",
        3: "rabu",
        4: "kamis",
        5: "jumat",
        6: "sabtu",
        7: "minggu",
      };
      return hari[day];
    },
    getDayNow() {
      var date = new Date();
      var day = date.getDay();
      console.log("day", day);
      this.day = this.getDayName(day);
    },
  },
};
</script>
<style>
.head-style {
  font-size: 17px;
  font-weight: 600;
}

.sub-style {
  font-size: 14px;
  font-weight: 600;
  color: #526789;
}
.btn-style {
  font-size: 14px;
  min-width: 125px !important;
  min-height: 35px !important;
  border-radius: 16px;
}

.fb-btn.v-btn--outlined {
  border: thin solid #539401;
}
.container-day {
  justify-content: center;
  overflow-x: hidden;
}
.v-application--is-ltr
  .v-data-table
  > .v-data-table__wrapper
  > table
  > thead
  > tr
  > th {
  color: black;
  font-size: 14px;
}
@media all and (max-width: 1300px) {
  .container-day {
    justify-content: start;
    max-width: auto;
    overflow-x: scroll;
    padding-bottom: 10px;
  }

  .container-day::-webkit-scrollbar {
    background-color: #c6edff;
    height: 4px;
  }

  .container-day::-webkit-scrollbar-thumb {
    background-color: #82ae0e;
    opacity: 0.5;
    height: 4px;
    border-radius: 34px;
  }
}
</style>
