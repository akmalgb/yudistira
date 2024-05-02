<template>
  <v-container class="pt-0 px-0" fluid>
    <TitleCard page-title="Keuangan/Topup E-Money" />

    <v-container>
      <v-card class="rounded-lg ma-3">
        <v-container>
          <v-row>
            <v-col cols="12" md="6" lg="6" sm="12" class="d-flex">
              <img :src="topup_data.bank.bank_logo" alt="" class="mr-3" />
              <h4>
                {{ topup_data.bank.bank_account }}
                <br />
                {{ topup_data.bank.bank_name }}
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
            <div class="row">
              <div class="col-md-6">
                <label>No. Rekening</label>
                <div class="mt-2 copy-text">
                  <input
                    type="text"
                    class="text"
                    v-model="topup_data.bank.bank_number"
                    readonly
                  />
                  <input
                    type="button"
                    class="copy-text-button"
                    value="Salin"
                    @click="copyClipboard(topup_data.bank.bank_number)"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <label>Total Nominal Transfer</label>
                <div class="mt-2 copy-text">
                  <input
                    type="text"
                    class="text"
                    v-model="topup_data.amount.toLocaleString('id-ID')"
                    readonly
                  />
                  <input
                    type="button"
                    class="copy-text-button"
                    value="Salin"
                    @click="
                      copyClipboard(topup_data.amount.toLocaleString('id-ID'))
                    "
                  />
                </div>
                <div class="mt-2">
                  <v-icon style="color: #ff7171">mdi-alert</v-icon>
                  <small
                    class="text-peach ml-2 mt-1"
                    style="font-size: 12px; position: absolute"
                  >
                    Pastikan nominal transfer sesuai hingga 3 digit terakhir.
                    Nominal 3 Digit terakhir akan masuk ke saldo e-money
                  </small>
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-md">
                <label>Catatan</label>
                <div class="mt-2">
                  <input
                    type="text"
                    class="input"
                    v-model="topup_data.notes"
                    readonly
                  />
                </div>
              </div>
            </div>
            <v-row>
              <v-col cols="12" md="6" sm="6">
                <label for="">Batas Pembayaran</label>
                <p>{{ topup_data.expired_at }}</p>
              </v-col>
              <v-col cols="12" md="6" sm="6">
                <label for="">ID Transaksi</label>
                <p>#{{ topup_data.id }}</p>
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
                          <v-img :src="image" max-height="350" contain> </v-img>
                          <v-btn
                            class="no-outline"
                            fab
                            small
                            style="position: absolute; top: 30px; right: 7.7cm"
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
                          Drag and drop file bukti transfer anda disini sebelum
                          waktu pembayaran habis
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
                  anda akan kami proses dalam 15 menit dan selambatnya 1x24 jam.
                </p>
                <!-- <v-divider class="mb-3" style="background-color: black"></v-divider> -->
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
          </v-form>
        </v-container>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  head() {
    return {
      title: (this.school.name ?? "Wali Murid") + " - Keuangan",
    };
  },
  data: () => ({
    topup_data: "",
    image: null,
    displayDays: 0,
    displayHours: 0,
    displayMinutes: 0,
    displaySeconds: 0,
  }),
  computed: {
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
    ...mapState(["school"]),
  },
  methods: {
    ...mapActions("emoney", ["postCancelTopup", "postTopupConfirmation"]),

    copyClipboard(text) {
      navigator.clipboard.writeText(text);
    },
    deleteImage() {
      this.image = null;
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.image = URL.createObjectURL(file);
      this.$store.commit("emoney/set_conf_image", file);
    },
    _handleConfirmationSubmit() {
      this.postTopupConfirmation(({ isSuccess, response }) => {
        if (isSuccess) {
          this.$router.push("/emoney/topup/pending");
        } else {
          console.log(response);
        }
      });
    },
    formatNum(num) {
      return num < 10 ? "0" + num : num;
    },
    showRemaining() {
      const timer = setInterval(() => {
        const created = new Date();
        const exp = new Date(this.topup_data.expired_datetime);
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
    _handleCancelClick() {
      this.postCancelTopup(({ isSuccess, response }) => {
        if (isSuccess) {
          this.$router.push("/emoney");
        } else {
          console.log(response);
        }
      });
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    },
  },

  created() {
    this.topup_data = this.$cookies.get("topup_data");
  },

  mounted() {
    this.showRemaining();
  },
};
</script>

<style>
.text-green input {
  color: #00887a !important;
}

.input {
  font-weight: bold;
  padding: 15px;
  width: 100%;
  font-size: 18px;
  color: #555;
  background: #f5f5f5;
  border-radius: 5px;
  height: 56px;
}

.copy-text {
  height: 56px;
  position: relative;
  padding: 10px;
  background: #f5f5f5;
  display: flex;
  border-radius: 5px;
}

.copy-text input.text {
  padding: 10px;
  width: 100%;
  font-size: 18px;
  color: #555;
  border: none;
  outline: none;
  font-weight: bold;
}

.copy-text-button {
  width: 71px;
  height: 38px;
  padding-top: 6px; /* padding atas */
  padding-bottom: 6px; /* padding bawah */
  padding-left: 20px; /* padding kiri */
  padding-right: 20px; /* padding kanan */
  font-weight: bold;
  background: #ffff;
  font-size: 11px;
  border: none;
  border: 1px solid #9cbe16;
  border-radius: 4px;
  color: #9cbe16;
  outline: none;
  cursor: pointer;
  box-shadow: 0px 2px 8px 0px #009ade26;
  box-sizing: border-box; /* Border berada di dalam padding */
}
</style>
