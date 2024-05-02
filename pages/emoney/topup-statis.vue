<template>
  <v-container class="pt-0 px-0" fluid>
    <TitleCard page-title="Keuangan/Emoney/Topup" />

    <v-container>
      <v-card class="rounded-lg ma-3">
        <v-container>
          <v-row>
            <v-col cols="12" md="6" lg="6" sm="12" class="d-flex">
              <img src="/bni.svg" alt="" class="mr-3" />
            </v-col>
          </v-row>

          <v-form>
            <v-row>
              <v-col cols="12" md="6">
                <label>No. Virtual Account</label>
                <v-text-field
                  class="font-weight-bold text-green"
                  background-color="#F5F5F5"
                  :value="no_virtual_account_bni"
                  solo
                  readonly
                >
                  <template v-slot:append>
                    <v-btn color="#00887A" outlined>
                      <v-icon
                        color="#00887A"
                        @click="copyClipboard(no_virtual_account_bni)"
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
                  background-color="#F5F5F5"
                  hide-details="auto"
                  value="009"
                  solo
                  readonly
                >
                  <template v-slot:append>
                    <v-btn color="#00887A" outlined>
                      <v-icon color="#00887A" @click="copyClipboard('009')"
                        >mdi-content-copy</v-icon
                      >
                    </v-btn>
                  </template>
                </v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <label for=""> Catatan </label>
                <v-text-field
                  class="font-weight-bold"
                  background-color="#F5F5F5"
                  value="Tambahkan Rp 1.500 untuk biaya admin"
                  solo
                  readonly
                ></v-text-field>
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
import { mapActions, mapState } from "vuex";
import TitleCard from "~/components/TitleCard.vue";
import BniAccordion from "~/components/bill/BniAccordion.vue";
export default {
  head() {
    return {
      title: (this.school.name ?? "Wali Murid") + " - Keuangan",
    };
  },
  data: () => ({}),
  components: { TitleCard, BniAccordion },
  methods: {
    ...mapActions("emoney", ["getNoVirtualAccountBNI"]),

    copyClipboard(text) {
      navigator.clipboard.writeText(text);
    },
  },
  created() {
    // this.transfer_data = this.$cookies.get('topup_data_data');
    this.getNoVirtualAccountBNI();
  },

  computed: {
    ...mapState("emoney", ["no_virtual_account_bni"]),
    ...mapState(["school"]),
  },

  mounted() {},
};
</script>

<style>
.text-green input {
  color: #00887a !important;
}
</style>
