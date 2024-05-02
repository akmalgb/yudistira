<template>
  <v-container class="pt-0 px-0" fluid>
    <TitleCard page-title="Keuangan/Pilih Metode Pembayaran" />

    <v-container>
      <v-card>
        <v-container>
          <div>
            <div class="text-h6 mb-5">Pilih Metode Pembayaran</div>
          </div>
          <v-row class="mb-8">
            <v-col cols="12" md="12">
              <v-radio-group v-model="selectedPayment">
                <v-card
                  class="mb-3 pa-3 card-active"
                  v-for="item in payment_methods"
                  :key="item.name"
                  v-if="item.slug != 'va-bni'"
                >
                  <v-radio :value="item.slug" color="green">
                    <template v-slot:label>
                      <div class="d-flex">
                        <img :src="payment_image(item.slug)" width="20px" />
                        <div>
                          <span class="ml-4">{{ item.name }}</span>
                          <div class="ml-4" v-if="item.slug === 'emoney'">
                            {{ detail_emoney.saldo_emoney }}
                          </div>
                        </div>
                      </div>
                    </template>
                  </v-radio>
                </v-card>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-flex text-center align-center>
            <v-btn
              width="45%"
              v-if="!emoney && !rekening"
              style="background: #858ba6 !important; color: white !important"
              disabled
            >
              <div class="text-capitalize">Lanjutkan</div>
            </v-btn>
            <v-btn
              v-else
              width="45%"
              :class="`${$config.mainColor}`"
              class="white--text"
              @click="handleSubmit(payment_method)"
            >
              <div class="text-capitalize">Lanjutkan</div>
            </v-btn>
          </v-flex>
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
import { mapActions, mapState, mapMutations } from "vuex";
import TitleCard from "~/components/TitleCard.vue";
export default {
  head() {
    return {
      title: (this.school.name ?? "Wali Murid") + " - Keuangan",
    };
  },
  data: () => ({
    emoney: false,
    rekening: true,
    messageDialog: false,
    show3: false,
  }),
  components: { TitleCard },
  methods: {
    ...mapActions("emoney", ["getDetailEmoney"]),
    ...mapActions("bill", [
      "getBillDetail",
      "getPaymentMethods",
      "postBillTransfer",
      "postBillEmoney",
      "postBillVa",
    ]),
    ...mapMutations("bill", ["set_payment_method"]),

    payment_image(slug) {
      if (slug === "emoney") {
        if (this.payment_method === "emoney") {
          return "/bill/walletActive.svg";
        }
        return "/bill/wallet.svg";
      } else if (slug === "transfer-bank") {
        if (this.payment_method === "transfer-bank") {
          return "/bill/bankActive.svg";
        }
        return "/bill/bank.svg";
      } else if (slug === "va-bni") {
        if (this.payment_method === "va-bni") {
          return "/bill/bankActive.svg";
        }
        return "/bill/bank.svg";
      }
    },

    handleSubmit(payment_method) {
      if (payment_method === "emoney") {
        this.postBillEmoney(({ isSuccess, response }) => {
          if (isSuccess) {
            this.$router.push("/bill/success");
          } else {
            this.messageDialog = true;
          }
        });
        console.log("metode rekening transfer");
      } else if (payment_method === "transfer-bank") {
        this.postBillTransfer(({ isSuccess, response }) => {
          if (isSuccess) {
            this.$router.push("/bill/confirmation");
          } else {
            console.log(response);
          }
        });
        console.log("metode rekening transfer");
      } else if (payment_method === "va-bni") {
        this.postBillVa(({ isSuccess, response }) => {
          if (isSuccess) {
            this.$router.push("/bill/confirmation");
          } else {
            console.log(response);
          }
        });
        console.log("metode rekening transfer");
      }
    },

    choosePayment(slug) {
      this.set_payment_method(slug);
    },
  },
  created() {
    this.getDetailEmoney();
    this.getBillDetail();
    this.getPaymentMethods();
  },
  computed: {
    ...mapState("emoney", ["detail_emoney"]),
    ...mapState("bill", [
      "bill_detail",
      "payment_methods",
      "payment_method",
      "message",
    ]),
    ...mapState(["school"]),

    selectedPayment: {
      get() {
        return this.payment_method;
      },
      set(payload) {
        return this.set_payment_method(payload);
      },
    },
  },
};
</script>

<style>
.card-active {
  background: linear-gradient(white 0 0) padding-box,
    linear-gradient(to right, #9dbe16, #539401) border-box;
  border: 2px solid transparent;
  border-radius: 20px !important;
  display: inline-block;
}

.card-inactive {
  border: 5px solid white;
  border-radius: 20px;
}

.theme--light.v-sheet {
  border-color: transparent;
}
</style>
