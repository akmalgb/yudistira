<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <span class="mdi mdi-map-marker" style="color: rgb(82, 103, 137)">
              Digital Pick Up</span
            >
          </v-card-title>
          <v-card-text>
            <v-col>
              <center>
                <h4 class="text-center" style="color: rgb(82, 103, 137)">
                  Tentukan Batas Waktu Qr Code
                </h4>
              </center>
            </v-col>
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
                  <td>: {{ pickup_body ? pickup_body.pickup_by : "" }}</td>
                </tr>
                <tr>
                  <td>Catatan</td>
                  <td>: {{ pickup_body ? pickup_body.description : "" }}</td>
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
              <label for="">Tentukan Batas Waktu</label>
              <br />
              <date-picker
                class="mt-2"
                v-model="date_expired"
                type="datetime"
                value-type="YYYY-MM-DD HH:mm"
                format="YYYY-MM-DD HH:mm"
                style="width: 100%"
                @change="checkValidDate()"
              ></date-picker>
              <span v-if="!date_expired" style="color: red"
                >Batas Waktu tidak boleh kosong<br
              /></span>
              <span v-if="!valid_date" style="color: red"
                >Batas Waktu tidak boleh kurang dari hari ini</span
              >
            </v-col>
            <v-col>
              <label style="color: red">Catatan</label>
              <div class="mt-2">
                <span class="mt-2"
                  >Tentukan batas waktu QR Code, ketika batas waktu qr code
                  sudah berakhir maka anda harus membuat qr code lagi untuk
                  melaksanakan penjemputan</span
                >
              </div>
            </v-col>
            <v-col>
              <button class="continue-button" @click="next">
                Buat Qr code
              </button>
            </v-col>
          </v-card-text>
        </v-card>

        <v-card> </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import { mapState, mapActions, mapMutations } from "vuex";
import moment from "moment";

export default {
  head() {
    return {
      title: (this.school.name ?? "Wali Murid") + " - Digital Pick Up",
    };
  },
  data() {
    return {
      date_expired: moment().add(1, "days").format("YYYY-MM-DD HH:mm"),
      valid_date: true,
    };
  },
  components: {
    DatePicker,
  },
  computed: {
    ...mapState(["child_class", "child_detail"]),
    ...mapState("digital_pickup", ["pickup_body"]),
    ...mapState(["school"]),
  },
  created() {
    this.check();
  },
  methods: {
    ...mapActions("digital_pickup", ["postStoreQR"]),
    ...mapMutations("digital_pickup", [
      "set_pickup_by",
      "set_description",
      "set_date_expired",
    ]),
    moment: function () {
      return moment();
    },
    checkValidDate() {
      this.valid_date = moment(this.date_expired).isAfter(moment());
    },
    next() {
      if (this.date_expired && this.valid_date) {
        this.set_date_expired(this.date_expired);
        this.postStoreQR(({ isSuccess, response }) => {
          if (isSuccess) {
            this.set_pickup_by("");
            this.set_description("");
            this.$router.push("/digital_pickup/qr");
          } else {
            console.log(response);
          }
        });
      }
    },
    check() {
      if (this.pickup_body.pickup_by == "Orang Tua") {
        this.$router.push("/digital_pickup");
      }
    },
  },
};
</script>

<style>
td:first-child {
  width: fit-content;
  text-align: left;
  font-weight: bold;
}

.custom-date-input {
  padding: 8px;
  border: 1px solid #526789;
  border-radius: 4px;
  width: 100%;
  outline: none;
  transition: border-color 0.3s ease;
}

.custom-date-input:focus {
  border-color: rgb(0, 123, 255);
}

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
</style>
