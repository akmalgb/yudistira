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
            <div class="">
              <v-col class="d-flex flex-column">
                <span class="text-center">{{
                  pickup_status
                    ? $moment(pickup_status.created_at).format("dddd, LL")
                    : ""
                }}</span>
                <span class="mb-3 text-center headline font-weight-bold">{{
                  pickup_status
                    ? $moment(pickup_status.created_at).format("LT") + " WIB"
                    : ""
                }}</span>
              </v-col>
            </div>
            <v-col class="mt-2">
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
                  <td>: {{ pickup_status ? pickup_status.pickup_by : "" }}</td>
                </tr>
                <tr>
                  <td>Catatan</td>
                  <td>
                    : {{ pickup_status ? pickup_status.description : "" }}
                  </td>
                </tr>
              </table>
            </v-col>
            <v-col>
              <span>Status :</span>
              <br />
              <button :class="getClass(pickup_status.status)">
                {{ getStatus(pickup_status.status) }}
              </button>
            </v-col>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <button class="continue-button mt-2" @click="back()">Kembali</button>
  </v-container>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  head() {
    return {
      title: (this.school.name ?? "Wali Murid") + " - Digital Pick Up",
      timer: null,
    };
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("digital_pickup", ["pickup_status"]),
    ...mapState(["child_class", "child_detail"]),
    ...mapState(["school"]),
  },
  methods: {
    ...mapActions("digital_pickup", ["getStatusPickup"]),
    back() {
      this.$router.push("/digital_pickup");
    },
    checkStatus() {
      if (!Object.keys(this.pickup_status).length) {
        this.$router.push("/digital_pickup");
      }
    },
    getClass(status) {
      const name = {
        wait: "status-menunggu mt-2",
        hold: "status-hold mt-2",
        confirm: "status-dijemput mt-2",
      };
      return name[status] ?? status;
    },
    getStatus(status) {
      const name = {
        wait: "Menunggu",
        hold: "Mengerjakan Tugas",
        confirm: "Dijemput",
      };
      return name[status] ?? status;
    },
  },
  created() {
    this.getStatusPickup();
  },
  mounted: function () {
    this.timer = setInterval(() => {
      this.getStatusPickup();
    }, 5000);
  },
  watch: {
    "$store.state.digital_pickup.pickup_status": function () {
      this.checkStatus();
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
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

.status-menunggu {
  background-color: #fff;
  color: #ff7171;
  border: 2px solid #ff7171;
  padding: 10px 20px;
  width: 100%;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}

.status-hold {
  background-color: #fff;
  color: #f15a23;
  border: 2px solid #f15a23;
  padding: 10px 20px;
  width: 100%;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}

.status-dijemput {
  background-color: #fff;
  color: #5aaf55;
  border: 2px solid #5aaf55;
  padding: 10px 20px;
  width: 100%;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
