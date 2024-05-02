<template>
  <v-container class="pt-0 px-0" fluid>
    <TitleCard page-title="Performa" />
    <v-container>
      <v-row>
        <v-col cols="12">
          <a class="mt-5 d-flex align-center mb-6" @click="back()">
            <v-icon class="ma-2">mdi-keyboard-backspace</v-icon>
            <p class="ma-2">Kembali</p>
          </a>
          <h2>{{ notes.title }}</h2>
          <p class="text-md-100">
            Dari {{ notes.teacher.name }} ;
            {{ $moment(notes.created_at).format("dddd, DD MMMM YYYY") }}
          </p>
          <article>
            {{ notes.notes }}
          </article>
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
      title: (this.school.name ?? "Wali Murid") + " - Performa Murid",
    };
  },
  components: {
    TabCard,
  },
  data() {
    return {
      userProfileTabs: null,
    };
  },
  created() {
    this.getDetailNote;
  },
  methods: {
    ...mapActions("performance", [
      "getExamScores",
      "getQuizScores",
      "getDetailNote",
    ]),

    back() {
      this.$router.push("/performance#tabs-3");
    },
  },
  computed: {
    ...mapState("performance", {
      exams: "exam_scores",
      quiz: "quiz_scores",
      notes: "detailNote",
    }),
    ...mapState(["school"]),
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
