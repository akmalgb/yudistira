<template>
  <v-container class="pt-0 px-0" fluid>
    <TitleCard page-title="Rapor" />
    <v-container>
      <v-row>
        <v-col cols="12">
          <ReportCard>
            <template v-slot:cardTitle>
              <span
                v-if="
                  report_detail.semester == 'Tengah Semester 2' ||
                  report_detail.semester == 'Semester 2'
                "
              >
                Tahun Ajaran {{ parseInt(report_detail.year) - 1 }}/{{
                  report_detail.year
                }}
                - {{ report_detail.semester }}.pdf
              </span>
              <span v-else>
                Tahun Ajaran {{ report_detail.year }}/{{
                  parseInt(report_detail.year) + 1
                }}
                - {{ report_detail.semester }}.pdf
              </span>
            </template>
            <template v-slot:cardContent>
              <div class="container" style="height: 1000px">
                <iframe
                  :src="report_detail.file"
                  frameborder="0"
                  width="100%"
                  height="100%"
                ></iframe>
              </div>
            </template>
          </ReportCard>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import ReportCard from "~/components/dashboard/ReportCard.vue";
import { mapState } from "vuex";

export default {
  head() {
    return {
      title: (this.school.name ?? "Wali Murid") + " - Rapor Murid",
    };
  },
  middleware: "auth",
  name: "IndexSchedule",
  components: {
    ReportCard,
  },
  computed: {
    ...mapState(["school"]),
  },
  data: () => ({
    width: 600,
    report_detail: {},
  }),
  async created() {
    const config = {
      headers: {
        Authorization: `Bearer ${this.$store.state.auth.token}`,
      },
    };
    await this.$axios
      .$get(`detail-study-report/${this.$route.params.id}`, config)
      .then((res) => {
        this.report_detail = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
<style>
.year-style {
  font-size: 17px;
  font-weight: 600;
}

.class-style {
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
