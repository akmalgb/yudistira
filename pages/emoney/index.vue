<template>
  <v-container class="pt-0 px-0" fluid>
    <TitleCard page-title="Keuangan" />

    <v-container>
      <v-card class="ma-10 rounded-lg">
        <v-container>
          <v-row class="mb-5">
            <v-col class="d-flex align-center" cols="12" lg="6" md="12" sm="12">
              <v-container class="d-flex justify-center">
                <v-card
                  class="d-flex align-center rounded-xl bg-orange-gradient"
                  width="480"
                  height="296"
                >
                  <v-container class="white--text ml-8">
                    <div class="mb-10">
                      <h3>E-Money</h3>
                      <h4 class="font-weight-medium">
                        {{ detail_emoney.school_name }}
                      </h4>
                    </div>
                    <div class="mb-8">
                      <h2 class="font-weight-regular">
                        {{ detail_emoney.card_id }}
                      </h2>
                    </div>
                    <div>
                      <span>Digital Smart Card</span>
                      <h3 class="font-weight-regular">
                        {{ detail_emoney.name }}
                      </h3>
                    </div>
                  </v-container>
                  <img
                    src="/cardBubble.svg"
                    alt=""
                    style="position: absolute; bottom: 0; right: 0"
                  />
                </v-card>
              </v-container>
            </v-col>
            <v-col cols="12" lg="6" md="12" sm="12">
              <v-container
                class="d-flex justify-sm-center text-sm-center justify-end text-md-right"
              >
                <v-container>
                  <div>
                    <h2 class="font-weight-medium text-secondary">
                      Saldo E-Money saat ini
                    </h2>
                    <h1 class="font-weight-medium text-orange-gradient">
                      {{ detail_emoney.saldo_emoney }}
                    </h1>
                  </div>
                  <br />
                  <div class="mb-2">
                    <h4 class="font-weight-medium text-secondary">
                      Total Topup
                    </h4>
                    <h3 class="font-weight-medium text-green">
                      {{ detail_emoney.total_topup }}
                    </h3>
                  </div>
                  <div class="mb-2">
                    <h4 class="font-weight-medium text-secondary">
                      Total Payment
                    </h4>
                    <h3 class="font-weight-medium text-orange">
                      {{ detail_emoney.total_payment }}
                    </h3>
                  </div>
                  <div class="mb-5">
                    <h4 class="font-weight-medium text-secondary">
                      Total Cashout
                    </h4>
                    <h3 class="font-weight-medium text-peach">
                      {{ detail_emoney.total_cashout }}
                    </h3>
                  </div>
                  <nuxt-link
                    :to="vaBniCheck ? '/emoney/topup-statis' : '/emoney/topup'"
                    class="text-decoration-none"
                  >
                    <v-btn :class="`${$config.mainColor}`" class="white--text">
                      Top Up E-Money
                    </v-btn>
                  </nuxt-link>
                </v-container>
              </v-container>
            </v-col>
          </v-row>
          <v-container>
            <v-data-iterator
              :items="history_emoney"
              :items-per-page.sync="itemsPerPage"
              :page="page"
              hide-default-footer
            >
              <template v-slot:default="props">
                <v-simple-table>
                  <thead>
                    <tr>
                      <th>TRANSAKSI</th>
                      <th>NOMINAL TRANSAKSI</th>
                      <th>WAKTU TRANSAKSI</th>
                      <th>CATATAN</th>
                      <th>AKSI</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in props.items"
                      :key="item.name"
                      :id="item.id"
                    >
                      <td>
                        <div
                          :class="getColor(item.transaction)"
                          class="text-capitalize"
                        >
                          {{ getTransactionName(item.transaction) }}
                        </div>
                      </td>
                      <td>Rp. {{ item.amount }}</td>
                      <td>{{ item.created_at }}</td>
                      <td>{{ item.notes }}</td>
                      <td>
                        <v-chip
                          v-if="
                            item.status == 'success' &&
                            item.transaction == 'admin_fee'
                          "
                          class="white--text bg-green rounded-xl text-none"
                          label
                        >
                          <div class="font-weight-regular">success</div>
                        </v-chip>
                        <v-btn
                          v-else-if="item.status == 'success'"
                          class="white--text bg-blue rounded-xl text-none"
                          @click="openModal(item.id)"
                          depressed
                        >
                          <div class="font-weight-regular">e-kwitansi</div>
                        </v-btn>
                        <v-btn
                          v-else-if="item.status == 'pending'"
                          class="white--text bg-orange rounded-xl text-none"
                          @click="handlePending(item)"
                          depressed
                        >
                          <div class="font-weight-regular">pending</div>
                        </v-btn>
                        <v-chip
                          v-else-if="item.status == 'failed'"
                          class="white--text bg-peach rounded-xl text-none"
                          label
                        >
                          <div class="font-weight-regular">failed</div>
                        </v-chip>
                      </td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </template>
              <template v-slot:footer="">
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
              </template>
            </v-data-iterator>
          </v-container>
        </v-container>
      </v-card>
    </v-container>

    <v-dialog v-model="dialogKwt" max-width="450px">
      <v-card style="background: white">
        <v-card-title>
          <span class="text-secondary">E-Kwitansi</span>
          <v-card-actions class="ml-auto">
            <v-btn color="primary" text @click="dialogKwt = false">
              <h3 class="text-peach text-capitalize">Tutup (x)</h3>
            </v-btn>
          </v-card-actions>
        </v-card-title>
        <hr />
        <v-container>
          <v-row class="px-3 mx-5 mt-5 mb-3" style="background-color: #ffd487">
            <v-col cols="6">
              <v-img
                :src="school.photo"
                max-height="48px"
                max-width="48px"
              ></v-img>
            </v-col>
            <v-col class="d-flex align-center" cols="6">
              <h4 class="text-secondary">
                ID Transaksi #{{ detail_history.id }}
              </h4>
            </v-col>
          </v-row>

          <v-row class="mx-5 my-2">
            <v-col cols="12" md="6">
              <div class="text-subtitle-2 text-secondary">
                Jenis Transaksi :
              </div>
              <div class="text-subtitle-2 text-capitalize">
                {{ getTransactionName(detail_history.transaction) }}
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="text-subtitle-2 text-secondary">
                Waktu Transaksi :
              </div>
              <div class="text-subtitle-2">
                {{ detail_history.date }}
              </div>
            </v-col>
          </v-row>

          <hr class="hr-dashed mx-5" />

          <div class="text-center my-5">
            <h4 class="text-secondary">Transaksi Pembayaran</h4>
            <h1 class="font-weight-medium text-green">
              {{ detail_history.amount }}
            </h1>
          </div>

          <hr class="hr-dashed mx-5" />

          <v-row class="d-flex align-center mx-5 my-4" dense>
            <v-col class="text-secondary text-subtitle-2" cols="6">
              Nama Murid
            </v-col>
            <v-col
              class="d-flex justify-end text-subtitle-1 font-weight-regular"
              cols="6"
            >
              {{ detail_history.student ? detail_history.student.name : "" }}
            </v-col>

            <v-col class="text-secondary text-subtitle-2" cols="6"> NIS </v-col>
            <v-col
              class="d-flex justify-end text-subtitle-1 font-weight-regular"
              cols="6"
            >
              {{ detail_history.student ? detail_history.student.nis : "" }}
            </v-col>

            <v-col class="text-secondary text-subtitle-2" cols="6">
              Penyetor
            </v-col>
            <v-col
              class="d-flex justify-end text-subtitle-1 font-weight-regular"
              cols="6"
            >
              {{ detail_history.given_by }}
            </v-col>

            <v-col class="text-secondary text-subtitle-2" cols="6">
              Penerima
            </v-col>
            <v-col
              class="d-flex justify-end text-subtitle-1 font-weight-regular"
              cols="6"
            >
              {{ detail_history.received_by }}
            </v-col>
          </v-row>

          <hr class="hr-dashed mx-5" />
          <div class="text-left mx-5 my-4">
            <div class="text-subtitle-2 text-secondary">Catatan:</div>
            <div>{{ detail_history.notes }}</div>
          </div>
          <div class="text-right mx-5 my-4">
            <v-btn text @click="DownloadPDF()">
              <v-icon style="color: #0075b0">mdi-download</v-icon>
              <div class="text-capitalize text-blue">Unduh</div>
            </v-btn>
          </div>
        </v-container>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  head() {
    return {
      title: (this.school.name ?? "Wali Murid") + " - Keuangan",
    };
  },
  data: () => ({
    dialogKwt: false,
    // itemsPerPageArray: [5, 10, 15],
    itemsPerPage: 10,
    page: 1,
    vaBniCheck: false,
  }),
  methods: {
    DownloadPDF() {
      this.DownloadKwitansi(({ response }) => {
        this.convertPDF(
          response,
          `Invoice Sidigs E-money, ID-Transaksi#${this.detail_history.id}`
        );
      });
    },
    convertPDF(data, filename) {
      const blob = new Blob([data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    },
    ...mapActions("emoney", [
      "getAccountNumber",
      "getHistoryEmoney",
      "getDetailEmoney",
      "getDetailHistory",
      "DownloadKwitansi",
    ]),
    ...mapActions("bill", ["getPaymentMethods"]),
    ...mapMutations("emoney", ["set_history_id"]),
    openModal(id) {
      this.set_history_id(id);
      this.getDetailHistory();
      this.$nextTick(() => {
        this.$nuxt.$loading.start();
        setTimeout(() => (this.dialogKwt = true), 1500);
      });
    },

    handlePending(item) {
      this.set_history_id(item.id);
      if (item.type == "transfer") {
        if (!item.confirmation_photo) {
          this.getDetailHistory(({ isSuccess, response }) => {
            if (isSuccess) {
              console.log(response);
              this.$router.push("/emoney/topup/confirmation");
            } else {
              console.log(response);
            }
          });
        } else {
          this.getDetailHistory(({ isSuccess, response }) => {
            if (isSuccess) {
              this.$router.push("/emoney/topup/pending");
            } else {
              console.log(response);
            }
          });
        }
      }
      if (item.type == "va-bni") {
        this.getDetailHistory(({ isSuccess, response }) => {
          if (isSuccess) {
            console.log(response);
            this.$router.push("/emoney/topup/confirmation-va-bni");
          } else {
            console.log(response);
          }
        });
      }
    },

    getColor(transaction) {
      return transaction == "topup"
        ? "text-green"
        : transaction == "bill_pay"
        ? "text-orange"
        : "text-peach";
    },

    getTransactionName(transaction) {
      switch (transaction) {
        case "cashout":
          return "penarikan";
        case "canteen_pay":
          return "pembelian kantin";
        case "topup":
          return "top up";
        case "bill_pay":
          return "pembayaran tagihan";
        case "admin_fee":
          return "biaya admin";
        default:
          return transaction;
      }
    },

    nextPage() {
      if (this.next_page != null) {
        this.page += 1;
        this.getHistoryEmoney(this.page);
      }
    },
    formerPage() {
      if (this.page - 1 >= 1) {
        this.page -= 1;
        this.getHistoryEmoney(this.page);
      }
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
  },

  created() {
    this.getPaymentMethods();
    this.getAccountNumber();
    this.getHistoryEmoney();
    this.getDetailEmoney();
  },

  computed: {
    ...mapState("emoney", [
      "account_number",
      "detail_emoney",
      "history_id",
      "detail_history",
      "history_emoney",
      "next_page",
    ]),
    ...mapState(["school"]),
    ...mapState("bill", ["payment_methods"]),

    // numberOfPages() {
    //   return Math.ceil(this.history_emoney.length / this.itemsPerPage);
    // },
  },
  watch: {
    "$store.state.child_id": function () {
      this.getAccountNumber();
      this.getDetailEmoney();
      this.getHistoryEmoney();
    },
    "$store.state.bill.payment_methods": function (payment_methods) {
      const vaBniCheck = payment_methods.filter(
        (data) => data.slug == "va-bni"
      );
      this.vaBniCheck = vaBniCheck.length;
    },
  },
};
</script>

<style>
.text-orange-gradient {
  background: linear-gradient(180deg, #ffc661 -28.33%, #ffa90f 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.bg-orange-gradient {
  background: linear-gradient(180deg, #ffc661 -28.33%, #ffa90f 80%);
}
</style>
