<template>
  <v-container class="pt-0 px-0" fluid>
    <TitleCard page-title="Performa" />
    <v-container>
      <v-row>
        <v-col cols="12">
          <TabCard>
            <template v-slot:cardTabs>
              <v-tabs v-model="userProfileTabs" :show-arrows="false">
                <v-tabs-slider color="rgba(0, 0, 0, 0)"></v-tabs-slider>
                <v-tab to="#tabs-1" class="tabs" active-class="tab-active">
                  <b class="text-capitalize">Nilai Harian</b>
                </v-tab>
                <v-tab to="#tabs-2" class="tabs" active-class="tab-active">
                  <b class="text-capitalize">Quiz</b>
                </v-tab>
                <v-tab to="#tabs-3" class="tabs" active-class="tab-active">
                  <b class="text-capitalize">Catatan</b>
                </v-tab>
                <v-tab to="#tabs-4" class="tabs" active-class="tab-active">
                  <b class="text-capitalize">CBT</b>
                </v-tab>
                <v-tab to="#tabs-5" class="tabs" active-class="tab-active">
                  <b class="text-capitalize">Tugas</b>
                </v-tab>
              </v-tabs>
            </template>
            <template v-slot:cardContent>
              <v-container class="my-2">
                <v-tabs-items v-model="userProfileTabs">
                  <v-tab-item value="tabs-1">
                    <v-container class="">
                      <v-simple-table>
                        <thead>
                          <tr>
                            <th>Mata Pelajaran</th>
                            <th>Materi</th>
                            <th>Nilai</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="item in exams"
                            :key="item.id"
                            :id="item.id"
                          >
                            <td class="py-2">
                              <v-row class="d-flex align-center">
                                <v-col cols="12" md="3">
                                  <!-- <v-img
                                    :src="
                                      item.exam.submodule.module.subject
                                        .icon_code | icon
                                    "
                                    max-width="60"
                                  ></v-img> -->
                                </v-col>
                                <v-col cols="12" md="9">
                                  <!-- <span>
                                    {{
                                      item.exam.submodule.module.subject.name
                                    }}
                                  </span> -->
                                  <br />
                                  <span>
                                    {{
                                      item.exam &&
                                      item.exam.submodule &&
                                      item.exam.submodule.module
                                        ? item.exam.submodule.module.teacher
                                            .name
                                        : "-"
                                    }}
                                  </span>
                                </v-col>
                              </v-row>
                            </td>
                            <td>{{ item.exam.title }}</td>
                            <td class="text-center">
                              <span
                                v-if="item.score"
                                class="score"
                                :class="getScoreColor(item)"
                                >{{ item.score }}</span
                              >
                              <div v-else>
                                <v-chip
                                  v-if="item.status == 'dikerjakan'"
                                  class="white--text bg-orange rounded-xl text-none"
                                  label
                                >
                                  <div class="font-weight-regular">
                                    Sedang Direview
                                  </div>
                                </v-chip>
                                <v-chip
                                  v-else
                                  class="white--text bg-peach rounded-xl text-none"
                                  label
                                >
                                  <div class="font-weight-regular">
                                    Belum Dikerjakan
                                  </div>
                                </v-chip>
                              </div>
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
                            @click="formerPage('Nilai Harian')"
                          >
                            <v-icon>mdi-chevron-left</v-icon>
                          </v-btn>
                          <span class="mx-2 text-secondary font-weight-medium">
                            Page {{ pageExamScores }}
                          </span>
                          <v-btn
                            text
                            fab
                            small
                            outlined
                            style="color: #009ade"
                            class="ml-1 blue-outline"
                            @click="nextPage('Nilai Harian')"
                          >
                            <v-icon>mdi-chevron-right</v-icon>
                          </v-btn>
                        </v-row>
                      </v-toolbar>
                    </v-container>
                  </v-tab-item>

                  <v-tab-item value="tabs-2">
                    <v-container class="">
                      <v-simple-table>
                        <thead>
                          <tr>
                            <th>Mata Pelajaran</th>
                            <th>Materi</th>
                            <th>Nilai</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in quiz" :key="item.id" :id="item.id">
                            <td class="py-2">
                              <v-row class="d-flex align-center">
                                <v-col cols="12" md="3">
                                  <!-- <v-img
                                    :src="
                                      item.exam.submodule.module.subject
                                        .icon_code | icon
                                    "
                                    max-width="60"
                                  >
                                  </v-img> -->
                                </v-col>
                                <v-col cols="12" md="9">
                                  <!-- <span>
                                    {{
                                      item.exam.submodule.module.subject.name
                                    }}
                                  </span> -->
                                  <br />
                                  <span>
                                    {{
                                      item.exam &&
                                      item.exam.submodule &&
                                      item.exam.submodule.module
                                        ? item.exam.submodule.module.teacher
                                            .name
                                        : "-"
                                    }}
                                  </span>
                                </v-col>
                              </v-row>
                            </td>
                            <td>{{ item.exam.title }}</td>
                            <td class="text-center">
                              <span
                                v-if="item.score"
                                class="score"
                                :class="getScoreColor(item)"
                                >{{ item.score }}</span
                              >
                              <div v-else>
                                <v-chip
                                  v-if="item.status == 'dikerjakan'"
                                  class="white--text bg-orange rounded-xl text-none"
                                  label
                                >
                                  <div class="font-weight-regular">
                                    Sedang Direview
                                  </div>
                                </v-chip>
                                <v-chip
                                  v-else
                                  class="white--text bg-peach rounded-xl text-none"
                                  label
                                >
                                  <div class="font-weight-regular">
                                    Belum Dikerjakan
                                  </div>
                                </v-chip>
                              </div>
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
                            @click="formerPage('Quiz')"
                          >
                            <v-icon>mdi-chevron-left</v-icon>
                          </v-btn>
                          <span class="mx-2 text-secondary font-weight-medium">
                            Page {{ pageQuizScores }}
                          </span>
                          <v-btn
                            text
                            fab
                            small
                            outlined
                            style="color: #009ade"
                            class="ml-1 blue-outline"
                            @click="nextPage('Quiz')"
                          >
                            <v-icon>mdi-chevron-right</v-icon>
                          </v-btn>
                        </v-row>
                      </v-toolbar>
                    </v-container>
                  </v-tab-item>

                  <v-tab-item value="tabs-3">
                    <v-container class="">
                      <v-simple-table>
                        <thead>
                          <tr>
                            <th>GURU</th>
                            <th>HARI/TANGGAL</th>
                            <th>CATATAN</th>
                            <th>DETAIL</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            style="cursor: pointer"
                            v-for="item in note"
                            :key="item.id"
                            :id="item.id"
                            @click="detailNote(item.id)"
                          >
                            <td class="py-2">
                              {{ item.teacher ? item.teacher.name : "-" }}
                            </td>
                            <td>
                              {{
                                $moment(item.created_at).format("MMMM Do YYYY")
                              }}
                            </td>
                            <td>{{ item.title }}</td>
                            <td class="overflow-hidden w-20">
                              {{ item.notes }}
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
                            @click="formerPage('Catatan')"
                          >
                            <v-icon>mdi-chevron-left</v-icon>
                          </v-btn>
                          <span class="mx-2 text-secondary font-weight-medium">
                            Page {{ pageDailyNote }}
                          </span>
                          <v-btn
                            text
                            fab
                            small
                            outlined
                            style="color: #009ade"
                            class="ml-1 blue-outline"
                            @click="nextPage('Catatan')"
                          >
                            <v-icon>mdi-chevron-right</v-icon>
                          </v-btn>
                        </v-row>
                      </v-toolbar>
                    </v-container>
                  </v-tab-item>

                  <v-tab-item value="tabs-4">
                    <v-container class="">
                      <v-simple-table>
                        <thead>
                          <tr>
                            <th>MATA PELAJARAN</th>
                            <th>JUDUL</th>
                            <!-- <th>TANGGAL MULAI & BERAKHIR</th> -->
                            <!-- <th>DURASI</th> -->
                            <th>NILAI</th>
                            <!-- <th>AKSI</th> -->
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in cbt" :key="item.id" :id="item.id">
                            <td class="py-2">
                              <v-row class="d-flex align-center">
                                <v-col cols="12" md="3"> </v-col>
                                <v-col cols="12" md="9">
                                  <br />
                                  <span>
                                    {{
                                      item.exam &&
                                      item.exam.submodule &&
                                      item.exam.submodule.module
                                        ? item.exam.submodule.module.teacher
                                            .name
                                        : "-"
                                    }}
                                  </span>
                                </v-col>
                              </v-row>
                            </td>
                            <td>{{ item.title }}</td>
                            <!-- <td>{{ item.start_at }} - {{ item.finish_at }}</td> -->
                            <!-- <td>{{ item.duration }} Menit</td> -->
                            <td class="text-center">
                              <span
                                v-if="item.score != null"
                                class="score"
                                :style="{ color: item.score &gt; (item.kkm-1) ? 'green' : 'red' }"
                                >{{ item.score }}</span
                              >
                              <div v-else>
                                <span class="score"> - </span>
                              </div>
                            </td>
                            <!-- <td>{{ item.duration }} Menit</td> -->
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
                            @click="formerPage('CBT')"
                          >
                            <v-icon>mdi-chevron-left</v-icon>
                          </v-btn>
                          <span class="mx-2 text-secondary font-weight-medium">
                            Page {{ pageCBTScores }}
                          </span>
                          <v-btn
                            text
                            fab
                            small
                            outlined
                            style="color: #009ade"
                            class="ml-1 blue-outline"
                            @click="nextPage('CBT')"
                          >
                            <v-icon>mdi-chevron-right</v-icon>
                          </v-btn>
                        </v-row>
                      </v-toolbar>
                    </v-container>
                  </v-tab-item>

                  <v-tab-item value="tabs-5">
                    <v-container class="">
                      <v-simple-table>
                        <thead>
                          <tr>
                            <th>MATA PELAJARAN</th>
                            <th>JUDUL</th>
                            <th>NILAI</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in task" :key="item.id" :id="item.id">
                            <td class="py-2">
                              <v-row class="d-flex align-center">
                                <v-col cols="12" md="3"> </v-col>
                                <v-col cols="12" md="9">
                                  <br />
                                  <span>
                                    {{
                                      item.exam &&
                                      item.exam.submodule &&
                                      item.exam.submodule.module
                                        ? item.exam.submodule.module.teacher
                                            .name
                                        : "-"
                                    }}
                                  </span>
                                </v-col>
                              </v-row>
                            </td>
                            <td>{{ item.school_work.title }}</td>
                            <td class="text-center">
                              <span
                                v-if="
                                  item.score != null &&
                                  item.status == 'dikumpulkan'
                                "
                                class="score"
                                :style="{ color: item.score &gt; (item.school_work.kkm-1) ? 'green' : 'red' }"
                              >
                                {{ item.score }}
                              </span>
                              <v-chip
                                v-else-if="
                                  item.score == null &&
                                  item.status == 'dikumpulkan'
                                "
                                class="white--text bg-orange rounded-xl text-none"
                                >Menunggu Review</v-chip
                              >
                              <v-chip v-else class="white--text bg-peach rounded-xl text-none"
                                >Belum dikerjakan</v-chip
                              >
                            </td>
                          </tr>
                        </tbody>
                      </v-simple-table>
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
import { mapActions, mapMutations, mapState } from "vuex";
import TabCard from "~/components/dashboard/TabCard.vue";
export default {
  head() {
    return {
      title: (this.school.name ?? "Wali Murid") + " - Performa Murid",
    };
  },
  components: {
    TabCard,
  },
  data() {
    return {
      userProfileTabs: null,
      itemsPerPageArray: [5, 10, 15],
      itemsPerPage: 5,
      pageExamScores: 1,
      pageQuizScores: 1,
      pageDailyNote: 1,
      pageCBTScores: 1,
    };
  },
  created() {
    this.getExamScores();
    this.getQuizScores();
    this.getDailyNote();
    this.getCBTScores();
    this.getTaskScores();
    // console.log(this.cbt);
    // console.log(this.rootState.child_id)
  },
  methods: {
    ...mapMutations("performance", ["set_note_id"]),
    ...mapActions("performance", [
      "getExamScores",
      "getQuizScores",
      "getDailyNote",
      "getDetailNote",
      "getCBTScores",
      "getTaskScores",
    ]),
    getScoreColor(item) {
      if (item.score < item.exam.kkm) {
        return "text-peach";
      } else if (item.score >= item.exam.kkm) {
        return "text-green";
      }
    },
    detailNote(id) {
      this.set_note_id(id);
      this.getDetailNote();
      this.$router.push("/performance/" + id + "/note/");
    },

    nextPage(tab) {
      if (tab === "Nilai Harian") {
        if (this.next_page_exam_scores != null) {
          this.pageExamScores += 1;
          this.getExamScores(this.pageExamScores);
        }
      }

      if (tab === "Quiz") {
        if (this.next_page_quiz_scores != null) {
          this.pageQuizScores += 1;
          this.getQuizScores(this.pageQuizScores);
        }
      }

      if (tab === "Catatan") {
        if (this.next_page_daily_note != null) {
          this.pageDailyNote += 1;
          this.getDailyNote(this.pageDailyNote);
        }
      }

      if (tab === "CBT") {
        if (this.next_page_cbt_scores != null) {
          this.pageCBTScores += 1;
          this.getCBTScores(this.pageCBTScores);
        }
      }
    },

    formerPage(tab) {
      if (tab === "Nilai Harian") {
        if (this.pageExamScores > 1) {
          this.pageExamScores -= 1;
          this.getExamScores(this.pageExamScores);
        }
      }

      if (tab === "Quiz") {
        if (this.pageQuizScores > 1) {
          this.pageQuizScores -= 1;
          this.getQuizScores(this.pageQuizScores);
        }
      }

      if (tab === "Catatan") {
        if (this.pageDailyNote > 1) {
          this.pageDailyNote -= 1;
          this.getDailyNote(this.pageDailyNote);
        }
      }

      if (tab === "CBT") {
        if (this.pageCBTScores > 1) {
          this.pageCBTScores -= 1;
          this.getCBTScores(this.pageCBTScores);
        }
      }
    },

    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
  },

  computed: {
    ...mapState("performance", {
      exams: "exam_scores",
      quiz: "quiz_scores",
      cbt: "cbt_scores",
      task: "task_scores",
      note: "note",
      next_page_exam_scores: "next_page_exam_scores",
      next_page_quiz_scores: "next_page_quiz_scores",
      next_page_daily_note: "next_page_daily_note",
      next_page_cbt_scores: "next_page_cbt_scores",
    }),
    ...mapState(["school"]),
  },
  watch: {
    "$store.state.child_id": function () {
      this.getExamScores();
      this.getQuizScores();
      this.getDailyNote();
    },
  },
};
</script>

<style>
.score {
  font-size: 36px;
  font-weight: 600;
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
