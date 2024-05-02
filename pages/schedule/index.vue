<template>
  <v-container class="pt-0 px-0" fluid>
    <TitleCard page-title="Jadwal Pelajaran" />
    <v-container>
      <v-row>
        <v-col cols="12">
          <MainCard>
            <template v-slot:cardIcon>
              <img src="/mainCardIcon/calendar.svg" alt="" />
            </template>
            <template v-slot:cardTitle>Jadwal Pelajaran</template>
            <template v-slot:cardContent>
              <v-container class="d-flex" style="overflow-x: scroll">
                <ol>
                  <v-btn
                    v-if="day != 'senin'"
                    class="text-capitalize btn-style"
                    outlined
                    depressed
                    small
                    @click="changeDay('senin')"
                  >
                    SENIN
                  </v-btn>
                  <v-btn
                    v-if="day == 'senin'"
                    class="text-capitalize btn-style-active"
                    :class="`${$config.mainColor}`"
                    depressed
                    small
                    @click="changeDay('senin')"
                  >
                    SENIN
                  </v-btn>
                </ol>
                <ol>
                  <v-btn
                    v-if="day != 'selasa'"
                    class="text-capitalize btn-style"
                    outlined
                    depressed
                    small
                    @click="changeDay('selasa')"
                  >
                    SELASA
                  </v-btn>
                  <v-btn
                    v-if="day == 'selasa'"
                    class="white--text btn-style-active"
                    :class="`${$config.mainColor}`"
                    depressed
                    small
                    @click="changeDay('selasa')"
                  >
                    SELASA
                  </v-btn>
                </ol>
                <ol>
                  <v-btn
                    v-if="day != 'rabu'"
                    class="text-capitalize btn-style"
                    outlined
                    depressed
                    small
                    @click="changeDay('rabu')"
                  >
                    RABU
                  </v-btn>
                  <v-btn
                    v-if="day == 'rabu'"
                    class="white--text btn-style-active"
                    :class="`${$config.mainColor}`"
                    depressed
                    small
                    @click="changeDay('rabu')"
                  >
                    RABU
                  </v-btn>
                </ol>
                <ol>
                  <v-btn
                    v-if="day != 'kamis'"
                    class="text-capitalize btn-style"
                    outlined
                    depressed
                    small
                    @click="changeDay('kamis')"
                  >
                    KAMIS
                  </v-btn>
                  <v-btn
                    v-if="day == 'kamis'"
                    class="white--text btn-style-active"
                    :class="`${$config.mainColor}`"
                    depressed
                    small
                    @click="changeDay('kamis')"
                  >
                    KAMIS
                  </v-btn>
                </ol>
                <ol>
                  <v-btn
                    v-if="day != 'jumat'"
                    class="text-capitalize btn-style"
                    outlined
                    depressed
                    small
                    @click="changeDay('jumat')"
                  >
                    JUMAT
                  </v-btn>
                  <v-btn
                    v-if="day == 'jumat'"
                    class="white--text btn-style-active"
                    :class="`${$config.mainColor}`"
                    depressed
                    small
                    @click="changeDay('jumat')"
                  >
                    JUMAT
                  </v-btn>
                </ol>
                <ol>
                  <v-btn
                    v-if="day != 'sabtu'"
                    class="text-capitalize btn-style"
                    outlined
                    depressed
                    small
                    @click="changeDay('sabtu')"
                  >
                    SABTU
                  </v-btn>
                  <v-btn
                    v-if="day == 'sabtu'"
                    class="white--text btn-style-active"
                    :class="`${$config.mainColor}`"
                    depressed
                    small
                    @click="changeDay('sabtu')"
                  >
                    SABTU
                  </v-btn>
                </ol>
                <ol>
                  <v-btn
                    v-if="day != 'minggu'"
                    class="text-capitalize btn-style"
                    outlined
                    depressed
                    small
                    @click="changeDay('minggu')"
                  >
                    MINGGU
                  </v-btn>
                  <v-btn
                    v-if="day == 'minggu'"
                    class="white--text btn-style-active"
                    :class="`${$config.mainColor}`"
                    depressed
                    small
                    @click="changeDay('minggu')"
                  >
                    MINGGU
                  </v-btn>
                </ol>
              </v-container>
              <v-container>
                <div class="text-center my-10" v-if="schedules.length === 0">
                  <img src="study-home.svg" alt="" />
                  <p class="text-secondary text-h6">
                    Yeay...
                    <br />
                    Hari ini murid bisa belajar di rumah
                  </p>
                </div>
                <v-simple-table v-else>
                  <thead>
                    <tr>
                      <th>Mata Pelajaran</th>
                      <th>Pengajar</th>
                      <th>Jumlah Jam</th>
                      <th>PUKUL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in schedules" :key="item.id" :id="item.id">
                      <td class="py-2">
                        <v-row class="d-flex align-center">
                          <v-col cols="12" md="3">
                            <v-img
                              :src="item.subject.icon_code | icon"
                              max-width="60"
                            ></v-img>
                          </v-col>
                          <v-col cols="12" md="9">
                            <span>
                              {{ item.subject ? item.subject.name : "" }}
                            </span>
                          </v-col>
                        </v-row>
                      </td>
                      <td>{{ item.teacher ? item.teacher.name : "" }}</td>
                      <td>{{ item.hours }} jam pelajaran</td>
                      <td>{{ item.start_time }} - {{ item.end_time }}</td>
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
import { mapActions, mapMutations, mapState } from "vuex";
import MainCard from "~/components/dashboard/MainCard.vue";
export default {
  middleware: "auth",
  head() {
    return {
      title: (this.school.name ?? "Wali Murid") + " - Jadwal Pelajaran",
    };
  },
  components: {
    MainCard,
  },
  created() {
    this.getDayNow();
    this.getSchedules();
  },
  methods: {
    ...mapMutations("schedule", ["set_day"]),
    ...mapActions("schedule", ["getSchedules"]),
    changeDay(day) {
      this.set_day(day);
      this.getSchedules();
    },
    getDayName(day) {
      const hari = {
        0: "minggu",
        1: "senin",
        2: "selasa",
        3: "rabu",
        4: "kamis",
        5: "jumat",
        6: "sabtu",
      };
      return hari[day];
    },
    getDayNow() {
      var date = new Date();
      var day = date.getDay();

      this.set_day(this.getDayName(day));
    },
  },
  computed: {
    ...mapState("schedule", ["day", "schedules"]),
    ...mapState(["school"]),
  },
  watch: {
    "$store.state.child_id": function () {
      this.getDayNow();
      this.getSchedules();
    },
  },
};
</script>
<style>
.btn-style {
  background-color: #f4ffd6;
  min-width: 115px !important;
  min-height: 35px !important;
  color: #539401 !important;
  border-radius: 10px;
}

.btn-style-active {
  background-color: linear-gradient(
    180deg,
    #9dbe16 0%,
    #539401 100%
  ) !important;
  min-width: 115px !important;
  min-height: 35px !important;
  color: #fafaf9 !important;
  border-radius: 10px;
}

.fb-btn.v-btn--outlined {
  border: thin solid #539401;
}

/* .container-day {
  justify-content: center;
  overflow-x: hidden;
} */

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

/* @media all and (max-width: 1300px) {
  .container-day {
    justify-content: start;
    max-width: auto;
    overflow-x: scroll;
    padding-bottom: 10px;
  }

  .container-day::-webkit-scrollbar {
    background-color: #C6EDFF;
    height: 4px;
  }

  .container-day::-webkit-scrollbar-thumb {
    background-color: #82AE0E;
    opacity: 0.5;
    height: 4px;
    border-radius: 34px;
  }
} */
</style>
