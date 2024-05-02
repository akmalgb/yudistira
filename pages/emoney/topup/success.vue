<template>
  <v-container class="pt-0 px-0" fluid>
    <TitleCard page-title="Keuangan/Topup E-Money" />

    <v-container>
      <v-card class="rounded-lg">
        <v-container style="width: 50%">
          <v-row class="mt-5">
            <v-col cols="12" md="6">
              <h2 class="text-secondary">Transaksi Berhasil</h2>
            </v-col>
            <v-col cols="12" md="6" class="d-flex justify-end align">
              <h3 class="text-secondary">ID Transaksi #1056</h3>
            </v-col>
          </v-row>
          <hr class="my-5" />
          <v-row>
            <v-col cols="12" md="6" class="d-flex justify-center">
              <div>
                <div class="text-subtitle-2 text-secondary mb-1">
                  Jenis Transaksi :
                </div>
                <div class="text-subtitle-2">Top Up E-Money</div>
              </div>
            </v-col>
            <v-col cols="12" md="6" class="d-flex justify-center">
              <div>
                <div class="text-subtitle-2 text-secondary mb-1">
                  Waktu Transaksi:
                </div>
                <div class="text-subtitle-2">01 Maret 2022, 12.21 WIB</div>
              </div>
            </v-col>
          </v-row>
          <hr class="my-5 hr-dashed" />
          <div class="text-center">
            <h4 class="text-secondary">Transaksi Pembayaran</h4>
            <h1 class="font-weight-medium text-green">Rp 1.000.000</h1>
          </div>
          <hr class="my-5 hr-dashed" />
          <v-row>
            <v-col class="d-flex justify-center text-secondary" cols="6">
              <div>
                <div class="mb-3">Nama Murid</div>
                <div>Kelas</div>
              </div>
            </v-col>
            <v-col class="d-flex justify-center text-right" cols="6">
              <div>
                <div class="mb-3 text-body-1">M. Khaisar Zieldane</div>
                <div class="text-body-1">XI RPL 2</div>
              </div>
            </v-col>
          </v-row>
          <hr class="my-5 hr-dashed" />
          <v-row>
            <v-col
              cols="12"
              md="6"
              class="d-flex align-start justify-center text-left"
            >
              <div>
                <div class="text-subtitle text-secondary mb-1">Catatan:</div>
                <div class="text-body-1">Buat Jajan Setahun</div>
              </div>
            </v-col>
          </v-row>
          <v-row class="d-flex justify-md-end justify-sm-center mt-6 mb-8">
            <div class="mr-md-8 mx-md-0">
              <v-icon>mdi-download</v-icon>
              <a href="">Unduh E-Kwitansi</a>
            </div>
          </v-row>
          <v-flex text-center align-center>
            <v-btn
              :class="`${$config.mainColor}`"
              class="white--text rounded-lg py-2"
              style="width: 55%; text-transform: none !important"
            >
              Kembali
            </v-btn>
          </v-flex>
        </v-container>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  head() {
    return {
      title: (this.school.name ?? "Wali Murid") + " - Keuangan",
    };
  },
  ...mapState(["school"]),
};
</script>

<style>
.text-green {
  color: #5aaf55;
}
</style>
