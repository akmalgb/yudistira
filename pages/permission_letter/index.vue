<template>
  <v-container class="pt-0 px-0" fluid>
    <TitleCard page-title="Surat Izin" />
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
                  <b class="text-capitalize">Riwayat Izin</b>
                </v-tab>
              </v-tabs>
            </template>
            <template v-slot:cardContent>
              <div class="d-flex justify-end mr-4">
                <v-btn
                  class="white--text rounded-lg text-capitalize py-2"
                  :class="`${$config.mainColor}`"
                  to="/permission_letter/addletter"
                  depressed
                >
                  <span class="font-weight-regular">
                    Buat Surat Izin Baru
                  </span>
                </v-btn>
              </div>
              <v-container class="my-2">
                <v-tabs-items v-model="userProfileTabs">
                  <v-tab-item value="tabs-1">
                    <v-container>
                      <v-data-iterator
                        :items="permission_letters"
                        :page="page"
                        hide-default-footer
                      >
                        <v-simple-table>
                          <thead>
                            <tr>
                              <th>TYPE</th>
                              <th>TANGGAL & WAKTU</th>
                              <th>CATATAN</th>
                              <th>LAMPIRAN</th>
                              <!-- <th>STATUS</th> -->
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="item in permission_letters"
                              :key="item.id"
                              :id="item.id"
                            >
                              <td class="py-2">{{ getStatus(item.status) }}</td>
                              <td>
                                {{ $moment(item.date).format("LL, h:mm") }} WIB
                              </td>
                              <td>{{ item.notes }}</td>
                              <td>
                                <a :href="item.evidence_path" target="_blank"
                                  >Lihat Foto</a
                                >
                              </td>
                              <!-- <td>Terkirim</td> -->
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
                </v-tabs-items>
              </v-container>
            </template>
          </TabCard>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import TabCard from "~/components/dashboard/TabCard.vue";
export default {
  head() {
    return {
      title: (this.school.name ?? "Wali Murid") + " - Surat Izin",
    };
  },
  loading: true,
  components: {
    TabCard,
  },
  data() {
    return {
      userProfileTabs: null,
      page: 1,
    };
  },

  methods: {
    ...mapActions("permission_letter", ["getListPermissions", "checkNextPage"]),
    getStatus(status) {
      const name = {
        permit: "Izin",
        sick: "Sakit",
      };
      return name[status];
    },
    nextPage() {
      this.checkNextPage;
      if (this.next_page != null) {
        this.page += 1;
        this.getListPermissions(this.page);
        console.log(this.next_page);
      }
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
      this.getListPermissions(this.page);
    },
  },

  created() {
    this.getListPermissions(this.page);
  },

  computed: {
    ...mapState("permission_letter", ["permission_letters", "next_page"]),
    ...mapState(["school"]),
  },

  watch: {
    "$store.state.child_id": function () {
      this.getListPermissions(this.page);
    },
  },
};
</script>
<style>
.col {
  margin: 0;
}

.btn-style {
  min-height: 40px !important;
  min-width: 150px !important;
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
</style>
