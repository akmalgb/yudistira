<template>
  <v-container class="pt-0 px-0" fluid>
    <TitleCard page-title="Tahfidz" />
    <v-container>
      <MainCard class="ma-2">
        <template v-slot:cardIcon>
          <img src="/mainCardIcon/quran.svg" alt="" />
        </template>
        <template v-slot:cardTitle>Tahfidz</template>
        <template v-slot:cardContent>
          <v-container>
            <v-simple-table>
              <thead>
                <tr>
                  <th>JUDUL</th>
                  <th>INSTRUKSI</th>
                  <th>TANGGAL MULAI - BERAKHIR</th>
                  <th>NILAI</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in tahfidzes" :key="item.id">
                  <td>{{ item.tahfidz.title }}</td>
                  <td>{{ item.tahfidz.instruction }}</td>
                  <td>
                    {{
                      $moment(item.tahfidz.created_at).format(
                        "D MMMM YYYY, hh.mm"
                      )
                    }}
                    WIB - <br />
                    {{
                      $moment(item.tahfidz.finish_at).format(
                        "D MMMM YYYY, hh.mm"
                      )
                    }}
                    WIB
                  </td>
                  <td :class="getScoreColor(item.score)">
                    <span class="score">
                      {{ item.score }}
                    </span>
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
                <span class="mx-2 text-secondary font-weight-medium">
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
    </v-container>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import MainCard from "~/components/dashboard/MainCard.vue";
export default {
  data() {
    return {
      itemsPerPageArray: [5, 10, 15],
      itemsPerPage: 5,
      page: 1,
      search: "",
    };
  },
  components: { MainCard },
  head() {
    return {
      title: (this.school.name ?? "Wali Murid") + " - Tahfidz",
    };
  },
  methods: {
    ...mapActions("tahfidz", ["getAllTahfidz"]),
    getScoreColor(score) {
      if (score < 75) {
        return "text-peach";
      } else {
        return "text-green";
      }
    },

    nextPage() {
      if (this.next_page != null) {
        this.page += 1;
        this.getAllTahfidz(this.page);
      }
    },
    formerPage() {
      if (this.page - 1 >= 1) {
        this.page -= 1;
        this.getAllTahfidz(this.page);
      }
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
  },
  created() {
    this.getAllTahfidz();
  },
  computed: {
    ...mapState("tahfidz", ["tahfidzes", "next_page"]),
    ...mapState(["school"]),
  },
  watch: {
    "$store.state.child_id": function () {
      this.getAllTahfidz();
    },
  },
};
</script>

<style>
.score {
  font-size: 36px;
  font-weight: 600;
}
</style>
