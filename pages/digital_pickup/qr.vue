<template>
  <v-container>
    <v-card>
      <button
        v-if="showBelumDijemput"
        class="continue-button mt-2"
        style="background-color: #ff7171"
      >
        Siswa Belum Dijemput
      </button>
      <v-card-title>
        <span class="mdi mdi-map-marker" style="color: rgb(82, 103, 137)">
          Digital Pick Up</span
        >
      </v-card-title>
      <v-card-text>
        <div>
          <v-col class="d-flex justify-center">
            <qrcode
              :value="pickup_qr ? pickup_qr.secret_key : ''"
              :options="{ width: 300 }"
            ></qrcode>
          </v-col>
        </div>
        <div
          style="border-top: 1px dashed rgb(82, 103, 137); margin-top: 10px"
        ></div>
        <v-col class="mt-2 mb-2">
          <table class="table">
            <tr>
              <td>Nama Murid</td>
              <td>: {{ child_detail ? child_detail.name : "" }}</td>
            </tr>
            <tr>
              <td>Kelas</td>
              <td>: {{ child_class ? child_class.name : "" }}</td>
            </tr>
            <tr>
              <td>Dijemput Oleh</td>
              <td>: {{ pickup_qr ? pickup_qr.pickup_by : "" }}</td>
            </tr>
            <tr>
              <td>Catatan</td>
              <td>: {{ pickup_qr ? pickup_qr.description : "" }}</td>
            </tr>
          </table>
        </v-col>
        <div
          style="
            border-bottom: 1px dashed rgb(82, 103, 137);
            margin-bottom: 10px;
          "
        ></div>

        <v-col>
          <button class="continue-button" @click="DownloadQr">Download</button>
        </v-col>
        <v-col>
          <button
            class="continue-button"
            @click="ShowStatus"
            style="background-color: #009ade"
          >
            Lihat Status Siswa
          </button>
        </v-col>
        <v-col class="text-center">
          <button class="underline-text-button" @click="CreateNewQr">
            Buat QR Code Baru
          </button>
        </v-col>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import Vue from "vue";
import VueQrcode from "@chenfengyuan/vue-qrcode";
import { mapState, mapActions, mapMutations } from "vuex";

Vue.component(VueQrcode.name, VueQrcode);

export default {
  head() {
    return {
      title: (this.school.name ?? "Wali Murid") + " - Digital Pick Up",
    };
  },
  data() {
    return { showBelumDijemput: false };
  },
  computed: {
    ...mapState(["child_class", "child_detail"]),
    ...mapState("digital_pickup", [
      "pickup_body",
      "pickup_qr",
      "pickup_status",
    ]),
    ...mapState(["school"]),
  },
  created() {
    this.check();
  },
  methods: {
    ...mapActions("digital_pickup", ["getStatusPickup"]),
    ...mapMutations("digital_pickup", ["set_new_qr"]),
    check() {
      if (!Object.keys(this.pickup_qr).length) {
        this.$router.push("/digital_pickup");
      }
    },
    ShowStatus() {
      this.getStatusPickup();
    },
    checkStatus() {
      if (!Object.keys(this.pickup_status).length) {
        this.showBelumDijemput = true;
      } else {
        this.$router.push("/digital_pickup/status");
      }
    },
    CreateNewQr() {
      this.set_new_qr(true);
      this.$router.push("/digital_pickup");
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
  watch: {
    "$store.state.digital_pickup.pickup_status": function () {
      this.checkStatus();
    },
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

.text-center {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.underline-text-button {
  background-color: transparent;
  border: none;
  padding: 0;
  font-size: 16px;
  text-decoration: underline;
  cursor: pointer;
  color: #041735;
}
</style>
