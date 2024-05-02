<template>
  <v-container class="pt-0 px-0" fluid>
    <v-snackbar v-model="snackbar_status" timeout="3000">
      <span> Bukti pembayaran wajib disertakan </span>
      <v-btn color="red" @click="set_snackbar(false)" style="margin-left: 10px">
        Close
      </v-btn>
    </v-snackbar>
    <TitleCard page-title="Keuangan/Bayar Tagihan/Transfer" />

    <v-container>
      <v-card class="rounded-lg ma-3">
        <v-container>
          <v-row>
            <v-col cols="12" md="6" lg="6" sm="12" class="d-flex">
              <img
                :src="bill_detail.bank ? bill_detail.bank.bank_logo : ''"
                alt=""
                class="mr-3"
                v-if="bill_detail.pay_method != 'va-bni'"
              />
              <img src="/bni.svg" alt="" class="mr-3" v-else />
              <h4 v-if="bill_detail.pay_method != 'va-bni'">
                {{ bill_detail.bank ? bill_detail.bank.bank_account : "" }}
                <br />
                {{ bill_detail.bank ? bill_detail.bank.bank_name : "" }}
              </h4>
            </v-col>
            <v-col
              class="d-flex align-top justify-end"
              cols="12"
              md="6"
              lg="6"
              sm="12"
            >
              <h1 class="text-peach">
                {{ displayHours }} : {{ displayMinutes }} : {{ displaySeconds }}
              </h1>
            </v-col>
          </v-row>

          <v-form @submit.prevent="_handleConfirmationSubmit()">
            <v-row>
              <v-col cols="12" md="6" v-if="bill_detail.pay_method != 'va-bni'">
                <label>No. Rekening</label>
                <v-text-field
                  class="font-weight-bold"
                  :value="bill_detail.bank ? bill_detail.bank.bank_number : ''"
                  outlined
                  readonly
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6" v-else>
                <label>No. Virtual Account</label>
                <v-text-field
                  class="font-weight-bold"
                  :value="
                    bill_detail.latest_transactions
                      ? bill_detail.latest_transactions.virtual_account
                      : '' || bill_detail.virtual_account
                  "
                  outlined
                  readonly
                  append-icon="mdi-content-copy"
                  @click:append="
                    _handleCopyClipboard(
                      bill_detail.latest_transactions
                        ? bill_detail.latest_transactions.virtual_account
                        : '' || bill_detail.virtual_account
                    )
                  "
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6" v-if="bill_detail.pay_method != 'va-bni'">
                <label for="">Total Nominal Transfer</label>
                <v-text-field
                  class="font-weight-bold"
                  hide-details="auto"
                  :value="bill_detail.transfer_amount"
                  outlined
                  readonly
                ></v-text-field>
                <div class="mt-2">
                  <v-icon style="color: #ff7171">mdi-alert</v-icon>
                  <small
                    class="text-peach ml-2 mt-1"
                    style="position: absolute"
                  >
                    Pastikan nominal transfer sesuai hingga 3 digit terakhir.
                    Nominal 3 Digit terakhir akan masuk ke saldo e-money
                  </small>
                </div>
              </v-col>
              <v-col v-else>
                <label for="">Kode Bank</label>
                <v-text-field
                  class="font-weight-bold"
                  hide-details="auto"
                  value="009"
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="6" v-if="bill_detail.pay_method != 'va-bni'">
                <label for=""> Catatan Transfer </label>
                <v-text-field
                  class="font-weight-bold"
                  v-model="bill_detail.notes"
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" v-else>
                <label for=""> Total Nominal Pembayaran </label>
                <v-text-field
                  class="font-weight-bold"
                  :value="
                    bill_detail.latest_transactions
                      ? bill_detail.latest_transactions.amount
                      : 0
                  "
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>

            <div v-if="bill_detail.pay_method != 'va-bni'">
              <v-row>
                <v-col cols="12" md="6" sm="6">
                  <label for="">Batas Pembayaran</label>
                  <p>{{ bill_detail.expired_at }}</p>
                </v-col>
                <v-col cols="12" md="6" sm="6">
                  <label for="">ID Transaksi</label>
                  <p>#{{ bill_detail.id }}</p>
                </v-col>
                <v-col cols="12" class="pt-0">
                  <v-card
                    class="d-flex align-center rounded-lg"
                    style="border: dashed #9cbe16; height: 400px"
                    flat
                  >
                    <v-container class="text-center">
                      <div id="preview">
                        <div v-if="image">
                          <v-container>
                            <v-img :src="image" max-height="350" contain>
                            </v-img>
                            <v-btn
                              class="no-outline"
                              fab
                              small
                              style="display: flex; align-items: end"
                              @click="deleteImage"
                              dark
                              outlined
                              color="#FF7171"
                            >
                              <v-icon>mdi-trash-can-outline</v-icon>
                            </v-btn>
                          </v-container>
                        </div>
                        <div v-else>
                          <label class="font-weight-regular">
                            <input
                              type="file"
                              style="display: none"
                              accept=".jpg,.jpeg,.png,.svg"
                              @change="onFileChange"
                            />
                            <a
                              style="
                                color: #009ade;
                                text-decoration-line: underline;
                              "
                            >
                              Upload Bukti Transfer
                            </a>
                          </label>
                          <p class="text-secondary">
                            Upload file bukti transfer anda disini sebelum waktu
                            pembayaran habis
                          </p>
                        </div>
                      </div>
                    </v-container>
                  </v-card>
                </v-col>
                <v-col cols="12">
                  <p class="mb-0 text-peach">Catatan:</p>
                  <p>
                    Setelah melakukan konfirmasi pembayaran, verifikasi pesanan
                    anda akan kami proses dalam 15 menit dan selambatnya 1x24
                    jam.
                  </p>
                  <hr class="mb-3" />
                  <p>
                    Sudah transfer melalui ATM/internet/Mobile banking? Klik
                    tombol dibawah untuk mengkonfirmasi. Sistem tidak memproses
                    transaksi yang belum dikonfirmasi
                  </p>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="6">
                  <v-flex text-center align-center>
                    <v-btn
                      width="75%"
                      :class="`${$config.mainColor}`"
                      class="white--text rounded-lg"
                      type="submit"
                      depressed
                    >
                      SAYA SUDAH TRANSFER
                    </v-btn>
                  </v-flex>
                </v-col>
                <v-col cols="12" md="6">
                  <v-flex text-center align-center>
                    <v-btn
                      width="75%"
                      class="rounded-lg green-gradient-outline"
                      depressed
                      @click="_handleCancelClick"
                    >
                      <div class="text-gradient">BATALKAN TRANSAKSI</div>
                    </v-btn>
                  </v-flex>
                </v-col>
              </v-row>
            </div>
            <div v-else>
              <!-- <v-row> -->
              <BniAccordion></BniAccordion>
              <!-- <v-col cols="12" md="6"> -->
              <v-flex text-center align-center class="mt-3">
                <v-btn
                  width="30%"
                  :class="`${$config.mainColor}`"
                  class="white--text rounded-lg"
                  :to="'/bill'"
                  depressed
                >
                  Kembali
                </v-btn>
              </v-flex>
              <!-- </v-col> -->
              <!-- </v-row> -->
            </div>
          </v-form>
        </v-container>
      </v-card>
    </v-container>

    <v-snackbar v-model="messageDialog" timeout="2000">
      {{ message ? message : "" }}

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="messageDialog = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import TitleCard from "~/components/TitleCard.vue";
import BniAccordion from "~/components/bill/BniAccordion.vue";
export default {
  head() {
    return {
      title: (this.school.name ?? "Wali Murid") + " - Keuangan",
    };
  },
  data: () => ({
    displayDays: 0,
    displayHours: 0,
    displayMinutes: 0,
    displaySeconds: 0,
    messageDialog: false,
  }),
  components: { TitleCard, BniAccordion },
  methods: {
    ...mapMutations("bill", [
      "set_bill_detail",
      "set_bill_conf_image",
      "set_message",
      "set_snackbar",
    ]),
    ...mapActions("bill", [
      "getBillDetail",
      "postCancelTransfer",
      "postTransferConfirmation",
    ]),

    deleteImage() {
      this.image = null;
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.image = URL.createObjectURL(file);
      this.set_bill_conf_image(file);
    },

    async _handleCopyClipboard(text) {
      await navigator.clipboard.writeText(text);
      this.set_message("Nomor Virtual Account Berhasil di Copy");
      this.messageDialog = true;
    },

    _handleCancelClick() {
      this.postCancelTransfer(({ isSuccess, response }) => {
        if (isSuccess) {
          this.set_snackbar(true);
          this.$router.push("/bill");
        } else {
          console.log(response);
        }
      });
    },

    _handleConfirmationSubmit() {
      this.postTransferConfirmation(({ isSuccess, response }) => {
        if (isSuccess) {
          this.$router.push("/bill/pending");
        } else {
          console.log(response);
          this.set_snackbar(true);

          setTimeout(() => {
            this.set_snackbar(false);
          }, 3000);
        }
      });
    },

    formatNum(num) {
      return num < 10 ? "0" + num : num;
    },
    showRemaining() {
      const timer = setInterval(() => {
        const created = new Date();
        const exp = new Date(
          this.bill_detail.expired_datetime ||
            this.bill_detail.latest_transactions.datetime_expired
        );
        const distance = exp.getTime() - created.getTime();

        if (distance < 0) {
          clearInterval(timer);
          return;
        }

        const days = Math.floor(distance / this._days);
        const hours = Math.floor((distance % this._days) / this._hours);
        const minutes = Math.floor((distance % this._hours) / this._minutes);
        const seconds = Math.floor((distance % this._minutes) / this._seconds);

        this.displayMinutes = this.formatNum(minutes);
        this.displaySeconds = this.formatNum(seconds);
        this.displayHours = this.formatNum(hours);
        this.displayDays = this.formatNum(days);
      }, 1000);
    },
  },
  created() {
    // this.transfer_data = this.$cookies.get('bill_detail_data');
    this.getBillDetail();
  },

  computed: {
    ...mapState("bill", ["bill_detail", "message", "snackbar_status"]),
    ...mapState(["school"]),

    _seconds: () => 1000,
    _minutes() {
      return this._seconds * 60;
    },
    _hours() {
      return this._minutes * 60;
    },
    _days() {
      return this._hours * 24;
    },
  },

  mounted() {
    this.showRemaining();
  },
};
</script>

<style></style>
