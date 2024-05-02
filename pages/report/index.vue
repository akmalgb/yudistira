<template>
  <v-container class="pt-0 px-0" fluid>
    <TitleCard page-title="Rapor" />
    <v-container>
      <v-row>
        <v-col cols="12">
          <MainCard>
            <template v-slot:cardIcon>
              <img src="/mainCardIcon/report.svg" alt="" />
            </template>
            <template v-slot:cardTitle>Rapor</template>
            <template v-slot:cardContent>
              <v-container>
            <v-data-iterator
              :items="reports"
              :items-per-page.sync="limit"
              :page="page"
              :search="search"
              hide-default-footer
              >
              <v-toolbar flat v-if="!$vuetify.breakpoint.xs">
                  <div>
                    <span class="text-secondary">Show</span>
                    <v-menu offset-y>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          style="color: #526789"
                          small
                          class="ml-2"
                          v-bind="attrs"
                          v-on="on"
                          elevation="0"
                        >
                          {{ limit }}
                          <v-icon>mdi-chevron-down</v-icon>
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item
                        v-for="(number, index) in itemsPerPageArray"
                        :key="index"
                        @click="updateLimit(number)"
                      >
                          <v-list-item-title>{{ number }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                    <span class="text-secondary ml-2">Entries</span>
                  </div>
                  <v-spacer></v-spacer>
                </v-toolbar>
            </v-data-iterator>
                <v-simple-table>
                  <tbody>
                    <tr v-for="item in reports" :key="item.name" :id="item.id">
                      <td class="py-2">
                        <v-row class="d-flex align-center">
                          <v-col cols="12" md="2">
                            <v-img
                              src="/report/reportIcon.svg"
                              min-width="60"
                              max-width="60"
                            ></v-img>
                          </v-col>
                          <v-col>
                            <span
                              class="head-style"
                              v-if="
                                item.semester == 'Tengah Semester 2' ||
                                item.semester == 'Semester 2'
                              "
                            >
                              Tahun Ajaran {{ parseInt(item.year) - 1 }}/{{
                                item.year
                              }}
                            </span>
                            <span class="head-style" v-else>
                              Tahun Ajaran {{ item.year }}/{{
                                parseInt(item.year) + 1
                              }}
                            </span>
                            <br />
                            <span class="sub-style">
                              {{ item.semester }}
                            </span>
                          </v-col>
                        </v-row>
                      </td>
                      <td>
                        <v-btn
                          :class="`${$config.mainColor}`"
                          class="white--text text-capitalize rounded-xl"
                          depressed
                          :to="'/report/' + item.id"
                        >
                          <div class="font-weight-regular">Detail Rapor</div>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </v-simple-table>
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
import { mapActions, mapState } from "vuex";
export default {
  head() {
    return {
      title: (this.school.name ?? "Wali Murid") + " - Rapor Murid",
    };
  },
  components: {
    MainCard,
  },
  data() {
    return {
      itemsPerPageArray: [5, 10, 25, 50],
      limit: 5,
      search: "",
      page: 1,
    };
  },
  methods: {
    ...mapActions("report", ["getReports"]),

    nextPage() {
      if (this.next_page != null) {
        this.page += 1;
        let page = this.page;
        let limit = this.limit;
        this.getReports({page, limit});
      }
    },
    formerPage() {
      if (this.page - 1 >= 1){
        this.page -= 1; 
        let page = this.page;
        let limit = this.limit;
        this.getReports({page, limit});
      }
    },
    updateLimit(number) {
      this.limit = number;
      let page = this.page;
      let limit = this.limit;
      this.getReports({ page, limit });
    },
  },
  created() {
    let page = this.page;
    let limit = this.limit;
    this.getReports({ page, limit });
  },
  computed: {
    ...mapState("report", ["reports", "next_page"]),
    ...mapState(["school"]),
  },
  watch: {
    "$store.state.child_id": function () {
      this.getReports();
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
  background-color: #f4ffd6;
  min-width: 115px !important;
  min-height: 35px !important;
  color: #539401 !important;
  border-radius: 20px;
}
</style>
