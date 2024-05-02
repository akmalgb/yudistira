<template>
  <v-container class="pt-0 px-0" fluid>
    <TitleCard page-title="Kehadiran" />
    <v-container>
      <v-row>
        <v-col cols="12">
          <TabCard>
            <template v-slot:cardTabs>
              <v-tabs
                v-model="userProfileTabs"
                :show-arrows="false"
                hide-slider
              >
                <v-tab to="#tabs-1" class="tabs" active-class="tab-active">
                  <span class="text-capitalize">Riwayat Kehadiran</span>
                </v-tab>
                <!-- <v-tab to="#tabs-2" class="tabs" active-class="tabs active" outlined><b>Kalender Kehadiran</b></v-tab> -->
              </v-tabs>
            </template>
            <template v-slot:cardContent>
              <v-container class="my-2">
                <v-tabs-items v-model="userProfileTabs">
                  <v-tab-item value="tabs-1">
                    <v-container class="">
                      <v-data-iterator
                        :items="attendances"
                        :page="page"
                        hide-default-footer
                      >
                        <v-simple-table>
                          <thead>
                            <tr>
                              <th>TYPE</th>
                              <th>TANGGAL</th>
                              <th>JAM MASUK</th>
                              <th>JAM PULANG</th>
                              <th>CATATAN</th>
                              <!-- <th>Lampiran</th> -->
                              <!-- <th>Status</th> -->
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="item in attendances"
                              :key="item.id"
                              :id="item.id"
                            >
                              <td class="my-2" :class="getColor(item.status)">
                                {{ getStatus(item.status) }}
                              </td>
                              <td
                                v-if="
                                  $moment(item.date).format('h:mm') == '12:00'
                                "
                              >
                                {{ $moment(item.date).format("LL") }}
                              </td>
                              <td v-if="item.checked_in_time != null">
                                {{
                                  $moment(item.checked_in_time).format("H:mm ")
                                }}
                              </td>
                              <td v-else>Siswa Belum Absen Masuk</td>
                              <td v-if="item.checked_out_time != null">
                                {{
                                  $moment(item.checked_out_time).format("H:mm ")
                                }}
                              </td>
                              <td v-else>Siswa Belum Absen Pulang</td>
                              <td>{{ item.notes ? item.notes : "-" }}</td>
                              <!-- <td><a href="#">Lihat Foto</a></td> -->
                              <!-- <td>Berhasil</td> -->
                            </tr>
                          </tbody>
                        </v-simple-table>
                        <template>
                          <v-toolbar flat>
                            <v-row align="center" justify="center">
                              <v-spacer></v-spacer>
                              <v-btn
                                text
                                fab
                                small
                                outlined
                                style="color: #009ade"
                                class="mr-1 blue-outline"
                                @click="formerPage"
                              >
                                <v-icon>mdi-chevron-left</v-icon>
                              </v-btn>
                              <span
                                class="mx-2 text-secondary font-weight-medium"
                              >
                                Page {{ page }}
                              </span>
                              <v-btn
                                text
                                fab
                                small
                                outlined
                                style="color: #009ade"
                                class="ml-1 blue-outline"
                                @click="nextPage"
                              >
                                <v-icon>mdi-chevron-right</v-icon>
                              </v-btn>
                            </v-row>
                          </v-toolbar>
                        </template>
                      </v-data-iterator>
                    </v-container>
                  </v-tab-item>
                  <!-- <v-tab-item value="tabs-2">
                    <v-row class="mb-3">
                      <v-col cols="5" class="d-flex justify-center">
                        <v-card>
                          <v-container>
                            <v-row class="mb-1">
                              <v-row class="d-flex justify-start ma-2">
                                <span class="ml-2 month-style">September</span>
                                <span class="ml-2 month-style"> 2022</span>
                              </v-row>
                              <v-row class="d-flex justify-end ma-2">
                                <v-btn icon class="" @click="$refs.calendar.prev()">
                                  <v-icon>mdi-chevron-left</v-icon>
                                </v-btn>
                                <v-btn icon class="" @click="$refs.calendar.next()">
                                  <v-icon>mdi-chevron-right</v-icon>
                                </v-btn>
                              </v-row>
                            </v-row>

                            <v-sheet height="300" width="350">

                              <v-calendar ref="calendar" v-model="value" :weekdays="weekday" :type="type"
                                :events="events" :event-overlap-mode="mode" :event-overlap-threshold="30"
                                :event-color="getEventColor" @change="getEvents" :day-format="getDayFormat"
                                class="border-style">
                                <template v-slot:day-label="{ day, month, year }">
                                  <v-chip v-if="day == 3 && month == 10 && year == 2022"
                                    class="chip-red d-flex justify-center">
                                    <span>{{ day }}</span>
                                  </v-chip>
                                  <v-chip v-else-if="day == 2 && month == 10 && year == 2022"
                                    class="chip-green d-flex justify-center">
                                    <span>{{ day }}</span>
                                  </v-chip>
                                  <v-chip v-else-if="day == 4 && month == 10 && year == 2022"
                                    class="chip-yellow d-flex justify-center">
                                    <span>{{ day }}</span>
                                  </v-chip>
                                  <v-chip v-else-if="day == 5 && month == 10 && year == 2022"
                                    class="chip-orange d-flex justify-center">
                                    <span>{{ day }}</span>
                                  </v-chip>
                                  <v-chip v-else-if="day == 30 && month == 10 && year == 2022"
                                    class="chip-blue d-flex justify-center">
                                    <span>{{ day }}</span>
                                  </v-chip>
                                  <span v-else>{{ day }}</span>
                                </template>
                              </v-calendar>
                            </v-sheet>
                          </v-container>
                        </v-card>
                      </v-col>
                      <v-col cols="4" class="d-flex justify-start ">
                        <v-container class="explanation-container">
                          <v-col>
                            <v-container>
                              <span style="font-size : 20px;font-weight : 400; ">Keterangan :</span>
                            </v-container>
                            <v-container class="mt-1">
                              <v-row>
                                <v-card height="20" width="20" class="chip-blue">
                                </v-card>
                                <span class="explanation-text-style mx-4">Hari ini</span>
                              </v-row>
                            </v-container>
                            <v-container class="mt-1">
                              <v-row>
                                <v-card height="20" width="20" class="chip-green">
                                </v-card>
                                <span class="explanation-text-style mx-4">Hadir</span>
                              </v-row>
                            </v-container>
                            <v-container class="mt-1">
                              <v-row>
                                <v-card height="20" width="20" class="chip-yellow">
                                </v-card>
                                <span class="explanation-text-style mx-4">Sakit</span>
                              </v-row>
                            </v-container>
                            <v-container class="mt-1">
                              <v-row>
                                <v-card height="20" width="20" class="chip-orange">
                                </v-card>
                                <span class="explanation-text-style mx-4">Izin</span>
                              </v-row>
                            </v-container>
                            <v-container class="mt-1">
                              <v-row>
                                <v-card height="20" width="20" class="chip-red">
                                </v-card>
                                <span class="explanation-text-style mx-4">Alpha</span>
                              </v-row>
                            </v-container>
                            <v-container class="mt-1">
                              <v-row>
                                <v-card height="100" width="300" class="mt-2">
                                  <span class="explanation-info">Hari/Tanggal:</span>
                                  <span class="explanation-info bold">Selasa, 6 Juli 2021</span>
                                  <br>
                                  <span class="explanation-info">status :</span>
                                  <span class="explanation-info bold">Izin</span>
                                  <br>
                                  <span class="explanation-info">Keterangan :</span>
                                  <span class="explanation-info bold">Ada acara keluarga di luar kota</span>
                                  <br>
                                </v-card>
                              </v-row>
                            </v-container>

                          </v-col>

                        </v-container>
                      </v-col>
                    </v-row>
                  </v-tab-item> -->
                </v-tabs-items>
              </v-container>
            </template>
          </TabCard>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/v-calendar"></script>

<script>
import TabCard from "~/components/dashboard/TabCard.vue";
import { mapActions, mapState } from "vuex";
export default {
  head() {
    return {
      title: (this.school.name ?? "Wali Murid") + " - Kehadiran",
    };
  },
  components: {
    TabCard,
  },
  data() {
    return {
      selectedDate: null,
      userProfileTabs: null,
      type: "month",
      types: ["month", "week", "day", "4day"],
      mode: "stack",
      hadir: [1, 2, 3],
      absent: [4, 5],
      modes: ["stack", "column"],
      weekday: [0, 1, 2, 3, 4, 5, 6],
      weekdays: [
        { text: "Sun - Sat", value: [0, 1, 2, 3, 4, 5, 6] },
        { text: "Mon - Sun", value: [1, 2, 3, 4, 5, 6, 0] },
        { text: "Mon - Fri", value: [1, 2, 3, 4, 5] },
        { text: "Mon, Wed, Fri", value: [1, 3, 5] },
      ],
      value: "",
      events: [],
      colors: [
        "blue",
        "indigo",
        "deep-purple",
        "cyan",
        "green",
        "orange",
        "grey darken-1",
      ],
      names: [
        "Meeting",
        "Holiday",
        "PTO",
        "Travel",
        "Event",
        "Birthday",
        "Conference",
        "Party",
      ],
      page: 1,
    };
  },
  methods: {
    ...mapActions("presence", ["getListAttendance", "checkNextPage"]),
    getEvents({ start, end }) {
      //
    },
    getEventColor(event) {
      return event.color;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    getDayFormat(event) {
      console.log(event);
      return event.day;
    },
    getStatus(status) {
      const name = {
        checked_in: "Presensi Masuk",
        checked_out: "Presensi Pulang",
        sick: "Izin Sakit",
        permit: "Izin",
        absent: "Alpha",
      };
      return name[status] ?? status;
    },
    getColor(status) {
      const color = {
        checked_in: "text-green",
        checked_out: "text-green",
        sick: "text-orange",
        permit: "text-orange",
        absent: "text-peach",
      };
      return color[status] ?? "text-blue";
    },
    nextPage() {
      this.checkNextPage;
      if (this.next_page != null) {
        this.page += 1;
        this.getListAttendance(this.page);
        console.log(this.next_page);
      }
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
      this.getListAttendance(this.page);
    },
  },

  created() {
    this.getListAttendance(this.page);
  },

  computed: {
    ...mapState("presence", ["attendances", "list_attendances", "next_page"]),
    ...mapState(["school"]),
  },
  watch: {
    "$store.state.child_id": function () {
      this.getListAttendance(this.page);
    },
  },
};
</script>
<style>
.explanation-info {
  font-size: 12px !important;
  color: #526789;
}

.explanation-info.bold {
  font-size: 12px !important;
  color: #526789;
  font-weight: 600;
}

.explanation-text-style {
  font-size: 14px;
  font-weight: 400;
  color: #526789;
}

.border-style {
  border-width: 0px !important;
}

.month-style {
  font-size: 18px;
  font-weight: 600;
}

.chip-red {
  width: 38px;
  height: 38px;
  background-color: #ff7171 !important;
  color: #ffffff !important;
}

.chip-yellow {
  width: 38px;
  height: 38px;
  background-color: #ffb401 !important;
  color: #ffffff !important;
}

.chip-orange {
  width: 38px;
  height: 38px;
  background-color: #ff7a00 !important;
  color: #ffffff !important;
}

.chip-blue {
  width: 38px;
  height: 38px;
  background-color: #009ade !important;
  color: #ffffff !important;
}

.chip-green {
  width: 38px;
  height: 38px;
  background-color: #5aaf55 !important;
  color: #ffffff !important;
}

.chip {
  min-width: 160px;
  justify-content: center;
  font-size: 14px;
  font-weight: 400;
  color: #ffffff !important;
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
</style>
