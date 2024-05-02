<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <span class="mdi mdi-printer" style="color: rgb(82, 103, 137)">
              Cetak Kartu Ujian</span
            >
          </v-card-title>
          <v-card-text>
            <v-col>
              <label for="">Kelas</label>
              <br />
              <input
                type="text"
                class="input-style mt-2"
                :value="child_class ? child_class.name : ''"
                disabled
              />
            </v-col>

            <v-col class="">
              <label for="">Nama</label>
              <br />
              <input
                type="text"
                class="input-style mt-2"
                :value="child_detail ? child_detail.name : ''"
                disabled
              />
            </v-col>
            <div v-if="exam_qr.length">
              <v-col class="d-flex justify-center">
                <qrcode
                  :value="exam_qr.secret_key"
                  :options="{ width: 300 }"
                ></qrcode>
              </v-col>
              <v-col>
                <button class="continue-button" @click="DownloadQr">
                  Cetak
                </button>
              </v-col>
            </div>
            <div v-if="exam_qr === false">
              <v-card style="border-radius: 40px; min-height: 474px">
                <v-card-text>
                  <v-col class="d-flex justify-center align-center mt-10">
                    <img src="/alert.svg" style="width: 190px" />
                  </v-col>
                  <v-col class="d-flex justify-center align-center mt-2">
                    <span
                      style="font-size: 34px; color: #00887a; font-weight: 500"
                      >Mohon Maaf</span
                    >
                  </v-col>
                  <v-container
                    style="width: 410px; text-align: center; color: #000"
                    class="d-flex justify-center"
                  >
                    <p>
                      Anda masih memiliki tagihan yang belum dibayar. Mohon
                      untuk menyelesaikan tagihan tersebut.
                    </p>
                  </v-container>
                </v-card-text>
              </v-card>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Vue from "vue";
import { mapState, mapActions, mapMutations } from "vuex";
import VueQrcode from "@chenfengyuan/vue-qrcode";

Vue.component(VueQrcode.name, VueQrcode);

export default {
  head() {
    return {
      title: (this.school.name ?? "Wali Murid") + " - Cetak Kartu Ujian",
    };
  },
  data() {
    return {
      showConfirmationDialog: false,
      pickup_by: "Orang Tua",
      description: "",
      placeholder: "",
    };
  },
  methods: {
    ...mapActions("print_exam_qr", ["getQRExam"]),
    checkQr() {
      //
    },
    DownloadQr() {
      var link = document.createElement("a");
      link.download = "barcode.png";
      link.href = document
        .getElementsByTagName("canvas")[0]
        .toDataURL("image/png");
      link.click();
    },
  },
  async created() {
    await this.getQRExam();
  },
  watch: {
    "$store.state.print_exam_qr.exam_qr": function () {
      this.checkQr();
    },
  },
  computed: {
    ...mapState(["child_class", "child_detail"]),
    ...mapState("print_exam_qr", ["exam_qr"]),
    ...mapState(["school"]),
  },
};
</script>

<style>
.continue-button {
  background-color: #5aaf55;
  width: 100%;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}

.input-style {
  border: 2px solid #ced4da;
  border-radius: 4px;
  padding: 8px;
  width: 100%;
  background-color: #e7e7e7;
  box-sizing: border-box;
}

.input-style:focus {
  border-color: #007bff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.25);
}

.continue-button {
  background-color: #5aaf55;
  width: 100%;
  color: #fff; /* White text */
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
