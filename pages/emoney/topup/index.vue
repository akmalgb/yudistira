<template>
  <v-container class="pt-0 px-0" fluid>
    <TitleCard page-title="Keuangan/Topup E-Money" />

    <v-container>
      <v-card class="rounded-lg ma-3">
        <v-container class="pt-5 px-5">
          <v-form @submit.prevent="_handleTopupClick()">
            <div class="row">
              <div class="col-md">
                <label>Nama Murid</label>
                <div class="mt-1">
                  <input
                    type="text"
                    class="input"
                    v-model="child_detail.name"
                    disabled
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md">
                <label>Kelas</label>
                <div class="mt-1">
                  <input
                    type="text"
                    class="input"
                    v-model="child_class.name"
                    v-if="child_class !== null"
                    disabled
                  />
                  <input type="text" class="input" value="-" v-else disabled />
                </div>
              </div>
            </div>

            <div class="mt-2">
              <h4 style="color: #526789">Masukkan Nominal Topup</h4>
              <v-text-field
                v-model="amount"
                min="10000"
                type="number"
                :rules="rules"
                class="custom-prefix"
                prefix="Rp"
              ></v-text-field>
            </div>

            <div class="row">
              <div class="col-md">
                <label>Berita Transfer</label>
                <div class="mt-1">
                  <input type="text" class="input-news" v-model="notes" />
                </div>
              </div>
            </div>
            <v-flex class="mt-2" text-center align-center>
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
  </v-container>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  head() {
    return {
      title: (this.school.name ?? "Wali Murid") + " - Keuangan",
    };
  },
  data() {
    return {
      rules: [],
    };
  },
  methods: {
    ...mapActions("emoney", ["postTopupTransfer"]),
    ...mapMutations("emoney", [
      "set_topup_credentials",
      "set_amount",
      "set_notes",
      "set_topup_student_id",
    ]),

    _handleTopupClick() {
      if (this.topup_credentials.amount == 0) {
        this.rules = ["Harap Masukkan Nominal !"];
      } else if (this.topup_credentials.amount <= 10000) {
        this.rules = ["Minimal Nominal Adalah Rp 10.000 !"];
      } else {
        this.set_topup_credentials(this.topup_credentials);
        this.set_topup_student_id(this.child_detail.id);
        this.$router.push("/emoney/payment_method");
      }
    },
  },

  computed: {
    ...mapState("emoney", ["topup_credentials"]),
    ...mapState(["child_detail", "child_class"]),
    ...mapState(["school"]),

    amount: {
      get() {
        return this.topup_credentials.amount
          ? this.topup_credentials.amount.toString().replace("Rp ", "")
          : "";
      },
      set(value) {
        this.set_amount(parseInt(value));
      },
    },
    notes: {
      get() {
        return "";
      },
      set(value) {
        this.set_notes(value);
      },
    },
  },
  created() {
    this.set_amount(0);
    this.set_notes("");
  },
};
</script>

<style>
.input {
  font-weight: bold;
  padding: 15px;
  width: 100%;
  font-size: 18px;
  color: #858ba6;
  background: #f5f5f5;
  border-radius: 5px;
  height: 56px;
  border: 1px solid #526789;
}
.input-news {
  padding: 15px;
  width: 100%;
  font-size: 18px;
  border-radius: 5px;
  height: 56px;
  border: 1px solid #526789;
}
.custom-prefix {
  font-size: 24px; /* Atur ukuran sesuai keinginan Anda */
  line-height: 1.1876em; /* Sesuaikan dengan ukuran font */
}
</style>
