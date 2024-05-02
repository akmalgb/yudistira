<template>
  <v-container class="pt-0 px-0" fluid>
    <TitleCard page-title="Keuangan/Topup E-Money" />

    <v-container>
      <v-card class="rounded-lg ma-3 pt-5">
        <div class="text-center">
          <h2>Kami sedang memproses transaksi anda</h2>
          <img class="mt-5" src="/loading3d.svg" alt="" />
        </div>
        <v-container class="pa-15">
          <v-card>
            <v-container>
              <v-row class="d-flex align-center pa-3">
                <v-col>
                  <h5>Top Up E-Money</h5>
                </v-col>
                <v-col class="d-flex justify-end align-center">
                  <h5>ID Transaksi</h5>
                  <h2 class="font-weight-regular text-gradient">
                    &nbsp;#{{ topup_data.id }}
                  </h2>
                </v-col>
              </v-row>
              <hr class="my-2" />
              <v-row class="d-flex align-center mb-3">
                <v-col>
                  <v-row>
                    <v-col cols="12" md="3" sm="12">
                      <img :src="topup_data.bank.bank_logo" alt="" />
                    </v-col>
                    <v-col class="" cols="12" md="9" sm="12">
                      <div class="ml-2">
                        <h5>
                          {{ topup_data.bank.bank_name }}
                        </h5>
                        <h5>
                          {{ topup_data.bank.bank_number }}
                        </h5>
                      </div>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col class="d-flex align-md-center justify-md-end">
                  <h1 class="font-weight-regular">
                    Rp {{ topup_data.amount.toLocaleString("id-ID") }}
                  </h1>
                </v-col>
              </v-row>
              <v-flex text-center align-center>
                <v-btn
                  width="50%"
                  class="rounded-lg"
                  outlined
                  depressed
                  @click="_handleCancelClick"
                >
                  <div class="text-gradient">BATALKAN TRANSAKSI</div>
                </v-btn>
              </v-flex>
            </v-container>
          </v-card>
        </v-container>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  head() {
    return {
      title: (this.school.name ?? "Wali Murid") + " - Keuangan",
    };
  },
  methods: {
    ...mapActions("emoney", ["postCancelTopup"]),
    ...mapState(["school"]),
    _handleCancelClick() {
      this.postCancelTopup(({ isSuccess, response }) => {
        if (isSuccess) {
          // console.log(this.$store.state.auth.token);
          this.$router.push("/emoney");
        } else {
          console.log(response);
        }
      });
    },
  },
  computed: {
    ...mapState(["school"]),
    topup_data() {
      return this.$store.state.emoney.topup_data;
    },
  },
  mounted() {
    console.log(this.$store.state.emoney.topup_data.id);
  },
};
</script>

<style></style>
