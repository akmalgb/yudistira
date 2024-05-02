<template>
  <v-container class="pt-0 px-0" fluid>
    <TitleCard page-title="Beranda" />
    <v-container>
      <WelcomeCard class="mb-5" />
      <v-row>
        <v-col cols="12">
          <MainCard>
            <template v-slot:cardIcon>
              <img src="/mainCardIcon/info.svg" alt="" />
            </template>
            <template v-slot:cardTitle>Info Sekolah</template>
            <template v-slot:cardContent>
              <v-container class="d-flex justify-center">
                <span
                  class="text-secondary text-h6"
                  v-if="announcements.length === 0"
                  >Tidak ada Info Sekolah</span
                >
                <v-carousel v-else style="width: 720px">
                  <v-carousel-item
                    v-for="(announcement, id) in announcements"
                    :key="id"
                    :src="announcement.photo"
                  >
                  </v-carousel-item>
                </v-carousel>
              </v-container>
            </template>
          </MainCard>
        </v-col>

        <v-col cols="12" md="7">
          <MainCard>
            <template v-slot:cardIcon>
              <img src="/mainCardIcon/calendar.svg" alt="" />
            </template>
            <template v-slot:cardTitle> Jadwal Pelajaran Hari Ini </template>
            <template v-slot:cardContent>
              <v-container>
                <v-simple-table>
                  <thead>
                    <tr>
                      <th>MATA PELAJARAN</th>
                      <th>JUMLAH JAM</th>
                      <th>PUKUL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in schedules" :key="item.id" :id="item.id">
                      <td class="py-2">
                        <v-row class="d-flex align-center">
                          <v-col cols="12" md="3">
                            <v-img
                              :src="
                                item.subject
                                  ? item.subject.icon_code
                                  : '' | icon
                              "
                              width="60"
                            ></v-img>
                          </v-col>
                          <v-col cols="12" md="9">
                            <span>
                              {{ item.subject ? item.subject.name : "" }}
                            </span>
                            <br />
                            <span>
                              {{ item.teacher ? item.teacher.name : "" }}
                            </span>
                          </v-col>
                        </v-row>
                      </td>
                      <td>{{ item.hours }} jam pelajaran</td>
                      <td>{{ item.start_time }} - {{ item.end_time }} WIB</td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </v-container>
            </template>
          </MainCard>
        </v-col>

        <v-col cols="12" md="5">
          <MainCard>
            <template v-slot:cardIcon>
              <img src="/mainCardIcon/book.svg" alt="" />
            </template>
            <template v-slot:cardTitle>Nilai Murid</template>
            <template v-slot:cardContent>
              <v-container>
                <v-simple-table>
                  <thead>
                    <tr>
                      <th>MATA PELAJARAN</th>
                      <th>NILAI</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in exams" :key="item.id" :id="item.id">
                      <td class="py-2">
                        <v-row class="d-flex align-center">
                          <v-col cols="12" md="3">
                            <v-img
                              :src="
                                item.exam.submodule.module
                                  ? item.exam.submodule.module.subject.icon_code
                                  : '' | icon
                              "
                              width="60"
                            >
                            </v-img>
                          </v-col>
                          <v-col cols="12" md="9">
                            <span>
                              {{
                                item.exam.submodule.module
                                  ? item.exam.submodule.module.subject.name
                                  : ""
                              }}
                            </span>
                            <br />
                            <span>
                              {{
                                item.exam.submodule.module
                                  ? item.exam.submodule.module.teacher.name
                                  : ""
                              }}
                            </span>
                          </v-col>
                        </v-row>
                      </td>
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
              </v-container>
            </template>
          </MainCard>
        </v-col>

        <v-col cols="12">
          <MainCard>
            <template #cardIcon>
              <img src="/mainCardIcon/announcement.svg" alt="" />
            </template>
            <template #cardTitle> Tagihan Terakhir </template>
            <template #cardContent>
              <v-container>
                <v-data-iterator :items="bills" hide-default-footer>
                  <template v-slot:default="props">
                    <v-simple-table>
                      <thead>
                        <tr>
                          <th>TYPE</th>
                          <th>NAMA TAGIHAN</th>
                          <th>NOMINAL</th>
                          <th>TANGGAL</th>
                          <th>STATUS</th>
                          <th>AKSI</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="item in props.items"
                          :key="item.name"
                          :id="item.id"
                        >
                          <td>{{ item.bill.type.toUpperCase() }}</td>
                          <td>{{ item.bill.name }}</td>
                          <td>
                            Rp. {{ item.bill.amount.toLocaleString("id-ID") }}
                          </td>
                          <td>
                            {{ $moment(item.bill.start_date).format("LL") }}
                          </td>
                          <td>
                            <v-chip
                              :class="getColor(item.status)"
                              class="white--text"
                            >
                              {{ getStatus(item) }}
                            </v-chip>
                            <!-- <span v-if="item.bill.is_installment">
                          Bisa Diangsur
                        </span> -->
                          </td>
                          <td>
                            <v-btn
                              :class="`${$config.mainColor}`"
                              class="white--text text-capitalize"
                              depressed
                              small
                              @click="checkStatus(item)"
                            >
                              Lihat Detail
                            </v-btn>
                          </td>
                        </tr>
                      </tbody>
                    </v-simple-table>
                  </template>
                </v-data-iterator>
              </v-container>
            </template>
          </MainCard>
        </v-col>
      </v-row>
    </v-container>
    <BillDialog
      :visible="dialogDetail"
      @close="dialogDetail = false"
      :bill_detail="bill_detail ? bill_detail : ''"
      :bill_installments="bill_installments ? bill_installments : ''"
    />
  </v-container>
</template>

<script>
import MainCard from "~/components/dashboard/MainCard.vue";
import WelcomeCard from "~/components/dashboard/WelcomeCard.vue";
import TitleCard from "~/components/TitleCard.vue";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  // head: {
  //   title: "Beranda",
  // },
  head() {
    return {
      title: (this.school.name ?? "Wali Murid") + " - Beranda",
    };
  },
  data() {
    return {
      dialogDetail: false,
    };
  },
  components: {
    MainCard,
    TitleCard,
    WelcomeCard,
  },
  created() {
    this.getDayNow();
    setTimeout(() => {
      this.getListAnnouncement();
      this.getSchedules();
      this.getLastExam();
      this.getLastBills();
    }, 1500);
  },
  methods: {
    ...mapActions("announcement", ["getListAnnouncement"]),
    ...mapActions("schedule", ["getSchedules"]),
    ...mapActions("performance", ["getLastExam"]),
    ...mapActions("bill", ["getHomeBill", "getLastBills", "getBillDetail"]),
    ...mapMutations("bill", [
      "set_bill_id",
      "set_bill_type",
      "set_bill_status",
      "set_bill_trx_id",
      "set_transfer_amount",
      "set_transfer_notes",
    ]),
    ...mapMutations("schedule", ["set_day"]),
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

      this.set_day(this.getDayName(day));
    },
    getScoreColor(item) {
      if (item.score < item.exam.kkm) {
        return "text-peach";
      } else if (item.score >= item.exam.kkm) {
        return "text-green";
      }
    },
    getColor(status) {
      return status == "confirmed"
        ? "bg-green"
        : status == "unpaid"
        ? "bg-peach"
        : status == "installment"
        ? "bg-blue"
        : "bg-orange";
    },
    getStatus(item) {
      if (item.status == "paid") return "Menunggu Konfirmasi";
      else if (item.status == "unpaid") return "Belum Dibayar";
      else if (item.status == "pending") return "Menunggu Pembayaran";
      else if (item.status == "confirmed") return "Sudah Dibayar";
      else if (item.status == "installment") return "Sedang Diangsur";
    },
    checkStatus(item) {
      this.set_bill_id(item.id);
      const status = item.status;
      if (status == "unpaid" || status == "installment") {
        this.openModal(item);
      } else if (status == "pending") {
        this.$router.push("/bill/confirmation");
      } else if (status == "paid") {
        this.$router.push("/bill/pending");
      } else if (status == "confirmed") {
        this.$router.push("/bill/success");
      }
    },
    openModal(item) {
      this.set_bill_id(item.id);
      this.getBillDetail();
      this.$nextTick(() => {
        this.$nuxt.$loading.start();
        setTimeout(() => (this.dialogDetail = true), 500);
      });
    },
  },

  computed: {
    ...mapState("announcement", ["announcements"]),
    ...mapState("schedule", ["day", "schedules"]),
    ...mapState("performance", {
      exams: "last_score_exam",
    }),
    ...mapState("bill", [
      "bill_type",
      "bill_status",
      "home_bill",
      "bills",
      "bill_detail",
      "bill_installments",
    ]),
    ...mapState(["childs", "child_id", "child_detail", "school"]),
  },
};
</script>

<style>
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
.score {
  font-size: 36px;
  font-weight: 600;
}
</style>
