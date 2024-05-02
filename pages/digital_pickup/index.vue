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
              <label for="">Nama Murid</label>
              <br />
              <input
                type="text"
                class="input-style mt-2"
                :value="child_detail ? child_detail.name : ''"
                disabled
              />
            </v-col>

            <v-col class="">
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
              <label for="">Di jemput Oleh</label>
              <v-radio-group v-model="pickup_by" @change="changePlaceholder()">
                <v-radio
                  label="Dijemput sendiri (Orang Tua)"
                  class=""
                  value="Orang Tua"
                ></v-radio>
                <v-radio
                  label="Ojek Online"
                  class="mt-2"
                  value="Ojek Online"
                ></v-radio>
                <v-radio
                  label="Antar Jemput"
                  class="mt-2"
                  value="Antar Jemput"
                ></v-radio>
                <v-radio label="Lainnya" class="mt-2" value="Lainnya"></v-radio>
              </v-radio-group>
            </v-col>

            <v-col>
              <label for="">Catatan</label>
              <v-text-field
                v-model="description"
                outlined
                dense
                :placeholder="placeholder"
              ></v-text-field>
            </v-col>

            <v-col>
              <button class="continue-button" @click="confirmPickup">
                Lanjutkan
              </button>

              <v-dialog
                v-model="showConfirmationDialog"
                persistent
                max-width="500"
              >
                <v-card>
                  <div class="mt-3">
                    <v-col class="d-flex justify-center">
                      <v-img
                        src="/digital/mobil.svg"
                        class=""
                        max-width="250"
                        max-height="150"
                      />
                    </v-col>
                  </div>
                  <v-card-title class="headline justify-center">
                    Apakah anda yakin melakukan penjemputan?
                  </v-card-title>
                  <v-card-text class="text-center"
                    >Pastikan saat ini anda sudah berada di lokasi penjemputan
                    (berada di area sekolah)</v-card-text
                  >
                  <v-card-actions>
                    <v-col>
                      <button
                        class="continue-button"
                        @click="handleConfirmationContinue"
                      >
                        Lanjutkan
                      </button>
                      <button
                        class="continue-button mt-2"
                        style="
                          background-color: transparent;
                          color: #041735;
                          text-decoration: underline;
                        "
                        @click="showConfirmationDialog = false"
                      >
                        Batalkan
                      </button>
                    </v-col>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  head() {
    return {
      title: (this.school.name ?? "Wali Murid") + " - Digital Pick Up",
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
    ...mapActions("digital_pickup", [
      "postStoreSelfPickup",
      "getStatusPickup",
      "getQRPickup",
    ]),
    ...mapMutations("digital_pickup", [
      "set_pickup_by",
      "set_description",
      "set_new_qr",
    ]),
    changePlaceholder() {
      if (this.pickup_by == "Ojek Online") {
        this.placeholder = "Driver Akhmad Supandi Nopol N2313MM";
      } else {
        this.placeholder = "";
      }
    },
    confirmPickup() {
      this.set_pickup_by(this.pickup_by);
      this.set_description(this.description);
      if (this.pickup_by == "Orang Tua") {
        this.showConfirmationDialog = true;
      } else {
        this.next();
      }
    },
    handleConfirmationContinue() {
      this.postStoreSelfPickup(({ isSuccess, response }) => {
        if (isSuccess) {
          this.set_pickup_by("");
          this.set_description("");
          this.showConfirmationDialog = false;
          this.$router.push("/digital_pickup/status");
        } else {
          console.log(response);
        }
      });
    },
    next() {
      this.showConfirmationDialog = false;
      this.$router.push("/digital_pickup/limit");
    },
    checkStatus() {
      if (Object.keys(this.pickup_status).length) {
        this.$router.push("/digital_pickup/status");
      }
    },
    checkQr() {
      if (Object.keys(this.pickup_qr).length && !this.new_qr) {
        this.$router.push("/digital_pickup/qr");
      }
      this.set_new_qr(false);
    },
  },
  async created() {
    await this.getStatusPickup();
    await this.getQRPickup();
  },
  watch: {
    "$store.state.digital_pickup.pickup_status": function () {
      this.checkStatus();
    },
    "$store.state.digital_pickup.pickup_qr": function () {
      this.checkQr();
    },
  },
  computed: {
    ...mapState(["child_class", "child_detail"]),
    ...mapState("digital_pickup", ["pickup_status", "pickup_qr", "new_qr"]),
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
