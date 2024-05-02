<template>
  <v-container class="pt-0 px-0" fluid>
    <TitleCard page-title="Keuangan/Bayar Tagihan/Transfer" />

    <v-container>
      <v-card class="rounded-lg ma-3">
        <v-container>
          <v-row>
            <v-col cols="12" md="6" lg="6" sm="12" class="d-flex">
              <img src="/bni.svg" alt="" class="mr-3" />
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
              <v-col cols="12" md="6">
                <label>No. Virtual Account</label>
                <v-text-field
                  class="font-weight-bold text-green"
                  :value="
                    topup_data.payment_transaction
                      ? topup_data.payment_transaction.virtual_account
                      : '' || topup_data.virtual_account
                  "
                  solo
                  readonly
                >
                  <template v-slot:append>
                    <v-btn
                      :color="$vuetify.theme.themes.light.primary"
                      outlined
                    >
                      <v-icon
                        @click="
                          copyClipboard(
                            topup_data.payment_transaction.virtual_account
                          )
                        "
                        >mdi-content-copy</v-icon
                      >
                    </v-btn>
                  </template>
                </v-text-field>
              </v-col>
              <v-col>
                <label for="">Kode Bank</label>
                <v-text-field
                  class="font-weight-bold"
                  hide-details="auto"
                  value="009"
                  solo
                  readonly
                >
                  <template v-slot:append>
                    <v-btn
                      :color="$vuetify.theme.themes.light.primary"
                      outlined
                    >
                      <v-icon @click="copyClipboard('009')"
                        >mdi-content-copy</v-icon
                      >
                    </v-btn>
                  </template>
                </v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="6">
                <label for=""> Total Nominal Pembayaran </label>
                <v-text-field
                  class="font-weight-bold"
                  :value="
                    topup_data.payment_transaction.amount
                      ? topup_data.payment_transaction.amount
                      : '' | formatNumber
                  "
                  solo
                  readonly
                >
                  <template v-slot:append>
                    <v-btn
                      :color="$vuetify.theme.themes.light.primary"
                      outlined
                    >
                      <v-icon
                        @click="
                          copyClipboard(topup_data.payment_transaction.amount)
                        "
                        >mdi-content-copy</v-icon
                      >
                    </v-btn>
                  </template>
                </v-text-field>
              </v-col>
            </v-row>

            <div>
              <!-- <v-row> -->
              <BniAccordion></BniAccordion>
              <!-- <v-col cols="12" md="6"> -->
              <v-flex text-center align-center class="mt-3">
                <v-btn
                  width="30%"
                  :class="`${$config.mainColor}`"
                  class="white--text rounded-lg"
                  :to="'/emoney'"
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
    transfer_data: {},
    image: null,

    displayDays: 0,
    displayHours: 0,
    displayMinutes: 0,
    displaySeconds: 0,
  }),
  components: { TitleCard, BniAccordion },
  methods: {
    ...mapMutations("emoney", ["set_topup_data"]),
    ...mapActions("emoney", ["getDetailHistory"]),

    copyClipboard(text) {
      navigator.clipboard.writeText(text);
    },

    formatNum(num) {
      return num < 10 ? "0" + num : num;
    },
    showRemaining() {
      const timer = setInterval(() => {
        const created = new Date();
        const exp = new Date(
          this.topup_data.expired_datetime ||
            this.topup_data.payment_transaction.datetime_expired
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
    // this.transfer_data = this.$cookies.get('topup_data_data');
    this.getDetailHistory();
  },

  computed: {
    ...mapState("emoney", ["topup_data"]),
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

<style>
.text-green input {
  color: #00887a !important;
}
</style>
