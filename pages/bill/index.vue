<template>
  <v-container class="pt-0 px-0" fluid>
    <v-snackbar v-model="snackbar_status" timeout="3000">
      <div style="text-align: center">
        <span> Transaksi dibatalkan </span>
        <v-btn
          color="red"
          @click="set_snackbar(false)"
          style="margin-left: 10px"
        >
          Close
        </v-btn>
      </div>
    </v-snackbar>
    <TitleCard page-title="Tagihan" />

    <v-container>
      <MainCard class="mb-5">
        <template #cardIcon>
          <img src="/mainCardIcon/announcement.svg" alt="" />
        </template>
        <template #cardTitle> Ringkasan Tagihan </template>
        <template #cardContent>
          <v-container>
            <v-row
              :class="$vuetify.breakpoint.xs ? 'px-0' : 'px-15'"
              class="mt-1 mb-7"
              justify="center"
            >
              <v-col :cols="$vuetify.breakpoint.xs ? '6' : '12'" md="3" sm="6">
                <BillCard class="peach">
                  <template #billIcon>
                    <v-icon style="color: #ff7171"> mdi-note-text </v-icon>
                  </template>
                  <template #billType> Total Tagihan </template>
                  <template #billNominal>
                    Rp. {{ home_bill.unpaid_total | formatNumber }}
                  </template>
                </BillCard>
              </v-col>
              <v-col :cols="$vuetify.breakpoint.xs ? '6' : '12'" md="3" sm="6">
                <BillCard :class="`${$config.mainColor}`">
                  <template #billType> SPP </template>
                  <template #billNominal>
                    Rp. {{ home_bill.unpaid_spp | formatNumber }}
                  </template>
                </BillCard>
              </v-col>
              <v-col :cols="$vuetify.breakpoint.xs ? '6' : '12'" md="3" sm="6">
                <BillCard :class="`${$config.mainColor}`">
                  <template #billType> DPP </template>
                  <template #billNominal>
                    Rp. {{ home_bill.unpaid_dpp | formatNumber }}
                  </template>
                </BillCard>
              </v-col>
              <v-col :cols="$vuetify.breakpoint.xs ? '6' : '12'" md="3" sm="6">
                <BillCard :class="`${$config.mainColor}`">
                  <template #billType> Lainnya </template>
                  <template #billNominal>
                    Rp. {{ home_bill.unpaid_lainnya | formatNumber }}
                  </template>
                </BillCard>
              </v-col>
            </v-row>
          </v-container>
        </template>
      </MainCard>

      <MainCard>
        <template #cardIcon>
          <img src="/mainCardIcon/announcement.svg" alt="" />
        </template>
        <template #cardTitle> Riwayat Tagihan </template>
        <template #cardContent>
          <v-container>
            <v-data-iterator
              :items="bills"
              :items-per-page.sync="itemsPerPage"
              :page="page"
              :search="search"
              hide-default-footer
            >
              <template v-slot:header>
                <v-toolbar flat v-if="!$vuetify.breakpoint.xs">
                  <div>
                    <span class="text-secondary">Show</span>
                    <v-menu offset-y>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          style="color: #526789"
                          small
                          class="ml-2"
                          v-bind="attrs"
                          v-on="on"
                          elevation="0"
                        >
                          {{ itemsPerPage }}
                          <v-icon>mdi-chevron-down</v-icon>
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item
                          v-for="(number, index) in itemsPerPageArray"
                          :key="index"
                          @click="updateItemsPerPage(number)"
                        >
                          <v-list-item-title>
                            {{ number }}
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                    <span class="text-secondary ml-2">Entries</span>
                  </div>
                  <v-spacer></v-spacer>
                  <div class="d-flex align-center">
                    <v-subheader class="font-weight-regular" for="">
                      Status Tagihan
                    </v-subheader>
                    <v-select
                      :items="bill_statuses"
                      style="width: 200px"
                      single-line
                      hide-details
                      outlined
                      dense
                      v-model="selectedStatus"
                    >
                    </v-select>
                    <v-spacer></v-spacer>
                    <v-subheader class="font-weight-regular" for="">
                      Jenis Tagihan
                    </v-subheader>
                    <v-select
                      :items="bill_types"
                      style="width: 200px"
                      single-line
                      hide-details
                      outlined
                      dense
                      v-model="selectedType"
                    >
                    </v-select>
                  </div>
                </v-toolbar>
              </template>

              <template v-slot:default="props">
                <v-simple-table>
                  <thead>
                    <tr v-if="$vuetify.breakpoint.xs">
                      <th>NAMA & NOMINAL TAGIHAN</th>
                      <th>STATUS</th>
                      <th>AKSI</th>
                    </tr>
                    <tr v-else>
                      <th>TYPE</th>
                      <th>NAMA TAGIHAN</th>
                      <th>NOMINAL</th>
                      <th>TANGGAL</th>
                      <th>STATUS</th>
                      <th>AKSI</th>
                    </tr>
                  </thead>
                  <tbody v-if="$vuetify.breakpoint.xs">
                    <tr
                      v-for="item in props.items"
                      :key="item.name"
                      :id="item.id"
                    >
                      <td>
                        {{ item.bill.name }} <br />
                        Rp. {{ item.bill.amount.toLocaleString("id-ID") }}
                      </td>
                      <td>
                        <v-chip
                          :class="getColor(item.status)"
                          class="white--text"
                        >
                          {{ getStatus(item.status, item.evidence_path) }}
                        </v-chip>
                      </td>
                      <td>
                        <v-btn
                          :class="`${$config.mainColor}`"
                          class="white--text text-capitalize"
                          depressed
                          small
                          @click="checkStatus(item)"
                        >
                          Lihat Detail
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                  <tbody v-else>
                    <tr
                      v-for="item in props.items"
                      :key="item.name"
                      :id="item.id"
                    >
                      <td>{{ item.bill.type.toUpperCase() }}</td>
                      <td>{{ item.bill.name }}</td>
                      <td>
                        Rp. {{ item.bill.amount.toLocaleString("id-ID") }}
                      </td>
                      <td>{{ $moment(item.bill.start_date).format("LL") }}</td>
                      <td>
                        <v-chip
                          :class="getColor(item.status)"
                          class="white--text"
                        >
                          {{ getStatus(item.status, item.evidence_path) }}
                        </v-chip>
                      </td>
                      <td>
                        <v-btn
                          :class="`${$config.mainColor}`"
                          class="white--text text-capitalize"
                          depressed
                          small
                          @click="checkStatus(item)"
                        >
                          Lihat Detail
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </template>
              <template v-slot:footer="{ pagination }">
                <v-toolbar flat>
                  <v-row align="center" justify="center">
                    <span class="text-secondary font-weight-medium">
                      {{ pagination.pageStart + 1 }} -
                      {{ pagination.pageStop }} of {{ pagination.itemsLength }}
                    </span>

                    <v-spacer></v-spacer>

                    <v-btn
                      text
                      fab
                      small
                      outlined
                      style="color: #009ade"
                      class="mr-1 blue-outline"
                      @click="formerPage"
                    >
                      <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                    <span class="mx-2 text-secondary font-weight-medium">
                      Page {{ page }}
                    </span>
                    <v-btn
                      text
                      fab
                      small
                      outlined
                      style="color: #009ade"
                      class="ml-1 blue-outline"
                      @click="nextPage"
                    >
                      <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                  </v-row>
                </v-toolbar>
              </template>
            </v-data-iterator>
          </v-container>
        </template>
      </MainCard>
    </v-container>

    <BillDialog
      :visible="dialogDetail"
      @close="dialogDetail = false"
      :bill_detail="bill_detail ? bill_detail : ''"
      :bill_installments="bill_installments ? bill_installments : ''"
    />
  </v-container>
</template>

<script>
import MainCard from "~/components/dashboard/MainCard.vue";
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  head() {
    return {
      title: (this.school.name ?? "Wali Murid") + " - Keuangan",
    };
  },
  data() {
    return {
      dialogDetail: false,
      itemsPerPageArray: [5, 10, 15],
      itemsPerPage: 5,
      search: "",
      page: 1,

      bill_types: ["Semua Tagihan", "SPP", "DPP", "lainnya"],
      bill_statuses: [
        "Semua",
        "Belum Dibayar",
        "Menunggu Konfirmasi",
        "Sudah Dibayar",
        "Diproses",
        "Sedang Diangsur",
      ],
    };
  },
  components: {
    MainCard,
  },

  methods: {
    ...mapActions("bill", ["getHomeBill", "getListBills", "getBillDetail"]),
    ...mapMutations("bill", [
      "set_bill_id",
      "set_bill_type",
      "set_bill_status",
      "set_bill_trx_id",
      "set_transfer_amount",
      "set_transfer_notes",
      "set_snackbar",
    ]),

    openModal(item) {
      this.set_bill_id(item.id);
      this.getBillDetail();
      this.$nextTick(() => {
        this.$nuxt.$loading.start();
        setTimeout(() => (this.dialogDetail = true), 500);
      });
    },

    checkStatus(item) {
      this.set_bill_id(item.id);
      const status = item.status;
      if (status == "unpaid" || status == "installment") {
        this.openModal(item);
      } else if (status == "pending") {
        this.$nextTick(() => {
          this.$nuxt.$loading.start();
          setTimeout(() => this.$router.push("/bill/confirmation"), 1500);
        });
      } else if (status == "paid") {
        this.$router.push("/bill/pending");
      } else if (status == "confirmed") {
        this.$router.push("/bill/success");
      }
    },

    getColor(status) {
      return status == "confirmed"
        ? "bg-green"
        : status == "unpaid"
        ? "bg-peach"
        : status == "installment"
        ? "bg-blue"
        : "bg-orange";
    },

    getStatus(status, evidence) {
      if (status == "paid") return "Diproses";
      else if (status == "unpaid") return "Belum Dibayar";
      else if (status == "pending" && evidence == null)
        return "Menunggu Pembayaran";
      else if (status == "pending" && evidence != null)
        return "Menunggu Konfirmasi";
      else if (status == "confirmed") return "Sudah Dibayar";
      else if (status == "installment") return "Sedang Diangsur";
    },

    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
  },

  created() {
    this.getHomeBill();
    this.getListBills();
  },

  computed: {
    ...mapState("bill", [
      "bill_type",
      "bill_status",
      "home_bill",
      "bills",
      "bill_detail",
      "bill_installments",
      "snackbar_status",
    ]),
    ...mapState(["school"]),

    numberOfPages() {
      return Math.ceil(this.bills.length / this.itemsPerPage);
    },

    selectedType: {
      get() {
        const bill_type = this.bill_type;
        if (bill_type == "lainnya") {
          return bill_type;
        } else if (bill_type == "") {
          return "Semua Tagihan";
        }
        return bill_type.toUpperCase();
      },
      set(payload) {
        if (payload == "Semua Tagihan") {
          return this.set_bill_type("");
        }
        return this.set_bill_type(payload.toLowerCase());
      },
    },

    selectedStatus: {
      get() {
        const bill_status = this.$store.state.bill.bill_status;
        return bill_status == ""
          ? "Semua"
          : bill_status == "unpaid"
          ? "Belum Dibayar"
          : bill_status == "pending"
          ? "Menunggu Konfirmasi"
          : bill_status == "paid"
          ? "Diproses"
          : bill_status == "confirmed"
          ? "Sudah Dibayar"
          : "Sedang Diangsur";
      },
      set(payload) {
        return payload == "Semua"
          ? this.set_bill_status("")
          : payload == "Belum Dibayar"
          ? this.set_bill_status("unpaid")
          : payload == "Menunggu Konfirmasi"
          ? this.set_bill_status("pending")
          : payload == "Sudah Dibayar"
          ? this.set_bill_status("confirmed")
          : payload == "Diproses"
          ? this.set_bill_status("paid")
          : this.set_bill_status("installment");
      },
    },
  },

  watch: {
    "$store.state.child_id": function () {
      this.getHomeBill();
      this.getListBills();
    },
    "$store.state.bill.bill_type": function () {
      this.getListBills();
    },
    "$store.state.bill.bill_status": function () {
      this.getListBills();
    },
  },
};
</script>

<style></style>
