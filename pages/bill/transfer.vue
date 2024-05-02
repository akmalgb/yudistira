<template>
  <v-container class="pt-0 px-0" fluid>
    <TitleCard page-title="Tagihan" />

    <v-container>
      <v-card class="rounded-lg ma-3">
        <v-container class="pt-5 px-5">
          <v-form ref="form" @submit.prevent="_handleSubmitBill()">
            <label>Nama Murid</label>
            <v-text-field
              v-model="child_detail.name"
              outlined
              dense
              readonly
            ></v-text-field>

            <label>Kelas</label>
            <v-text-field
              v-model="child_class.name"
              outlined
              dense
              disabled
              v-if="child_class !== null"
            ></v-text-field>
            <v-text-field
              value="-"
              outlined
              dense
              disabled
              v-else
            ></v-text-field>

            <label>Nama Tagihan</label>
            <v-text-field
              :value="bill_detail.bill ? bill_detail.bill.name : ''"
              outlined
              dense
              disabled
            ></v-text-field>

            <label>Nominal yang harus dibayar</label>
            <v-text-field
              :value="
                parseInt(bill_detail.bill.amount) -
                parseInt(bill_detail.pay_amount)
              "
              outlined
              dense
              readonly
            ></v-text-field>

            <div class="mb-5">
              <label>Masukkan Nominal Pembayaran</label>
              <v-text-field
                v-model="amount"
                :rules="rules"
                min="10000"
                :max="bill_detail.bill.amount"
                type="number"
                dense
              ></v-text-field>
            </div>

            <label>Catatan</label>
            <v-text-field
              v-model="notes"
              outlined
              dense
              type="text"
            ></v-text-field>

            <v-flex text-right>
              <v-btn
                width="30%"
                :class="`${$config.mainColor}`"
                class="white--text"
                type="submit"
              >
                Lanjutkan
              </v-btn>
            </v-flex>
          </v-form>
        </v-container>
      </v-card>
    </v-container>

    <v-snackbar v-model="messageDialog" timeout="2000">
      {{ message ? message : "" }}

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="_closeMessageDialog()">
          Close
        </v-btn>
      </template>
    </v-snackbar>
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
    message: "",
    messageDialog: false,
    rules: [
      (value) => !!value || "Required.",
      (value) => (value && value >= 10000) || "Minimal transfer Rp. 10.000",
    ],
  }),
  methods: {
    ...mapActions("bill", ["getBillDetail"]),
    ...mapMutations("bill", ["set_transfer_amount", "set_transfer_notes"]),
    _handleSubmitBill() {
      if (this.transfer_credentials.amount < 10000) {
        this.message = "Minimal transfer Rp. 10.000";
        this.messageDialog = true;
      } else if (!this.transfer_credentials.notes) {
        this.message = "Catatan wajib diisi";
        this.messageDialog = true;
      } else if (
        this.transfer_credentials.amount >
        this.bill_detail.bill.amount - this.bill_detail.pay_amount
      ) {
        this.message = "Nominal transfer melebihi nominal tagihan";
        this.messageDialog = true;
      } else {
        this.$router.push("/bill/payment_method");
      }
    },
    _closeMessageDialog() {
      this.message = "";
      this.messageDialog = false;
    },
  },
  created() {
    this.getBillDetail();
  },
  computed: {
    ...mapState("bill", ["bill_detail", "transfer_credentials"]),
    ...mapState(["child_detail", "child_class"]),
    ...mapState(["school"]),

    amount: {
      get() {
        return "";
      },
      set(value) {
        this.set_transfer_amount(parseInt(value));
      },
    },

    notes: {
      get() {
        return "";
      },
      set(value) {
        this.set_transfer_notes(value);
      },
    },
  },
};
</script>

<style></style>
