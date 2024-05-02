<template>
  <v-dialog v-model="show" max-width="37rem">
    <v-card>
      <div class="text-center pt-5">
        <div class="text-subtitle-1 mb-2">
          Invoice No : #{{ bill_detail.id }} ({{ bill_detail.bill ? bill_detail.bill.start_date : '' }})
        </div>
        <v-chip :class="getColor(bill_detail.status)" class="white--text">
          {{ getStatus(bill_detail.status) }}
        </v-chip>
      </div>
      <v-container class="px-5">
        <div class="mb-2">
          <div class="text-subtitle-2 text-secondary">
            Nama Murid
          </div>
          <div class="text-subtitle-2">
            {{ bill_detail.student ? bill_detail.student.name : '' }}
          </div>
        </div>

        <div>
          <div class="text-subtitle-2 text-secondary">
            NIS
          </div>
          <div class="text-subtitle-2">
            {{ bill_detail.student ? bill_detail.student.nis : '' }}
          </div>
        </div>

        <v-divider class="my-2"></v-divider>
        <div class="mb-2">
          <div class="text-subtitle-2 text-secondary">
            Jumlah Tagihan
          </div>
          <div class="text-subtitle-2">
            Rp. {{ (bill_detail.bill ? bill_detail.bill.amount : '').toLocaleString('id-ID') }}
          </div>
        </div>

        <div class="mb-2">
          <div class="text-subtitle-2 text-secondary">
            Sisa Tagihan
          </div>
          <div class="text-subtitle-2 red--text">
            Rp. {{ (bill_detail.bill ? bill_detail.bill.amount - bill_detail.pay_amount : '').toLocaleString('id-ID') }}
          </div>
        </div>

        <div class="mb-2">
          <div class="text-subtitle-2 text-secondary">
            Nama Tagihan
          </div>
          <div class="text-subtitle-2">
            {{ bill_detail.bill ? bill_detail.bill.name : '' }}
          </div>
        </div>

        <div class="mb-2">
          <div class="text-subtitle-2 text-secondary">
            Jatuh Tempo
          </div>
          <div class="text-subtitle-2">
            {{ bill_detail.bill ? bill_detail.bill.end_date : '' }}
          </div>
        </div>

        <div class="mb-2">
          <div class="text-subtitle-2 text-secondary">
            Keterangan
          </div>
          <div class="text-subtitle-2">
            <div v-if="bill_detail.bill ? bill_detail.bill.is_installment : ''">
              Bisa Diangsur
            </div>
            <div v-else>
              Tidak Bisa Diangsur
            </div>
          </div>
        </div>

        <div class="mb-2">
          <div class="text-subtitle-2 text-secondary">
            Catatan
          </div>
          <div class="text-subtitle-2">
            {{ bill_detail.bill ? bill_detail.bill.notes : '-' }}
          </div>
        </div>

        <div v-if="bill_detail.status == 'installment'" class="mb-8">
          <div class="text-subtitle-2 text-secondary">
            Riwayat Angsuran
          </div>
          <div>
            <v-simple-table dense>
              <thead>
                <tr>
                  <th>Angsuran</th>
                  <th>Nominal</th>
                  <th>Metode</th>
                  <th>Tanggal</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in bill_installments" :key="item.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.pay_amount.toLocaleString('id-ID') }}</td>
                  <td class="text-capitalize">{{ item.pay_method }}</td>
                  <td>{{ $moment(item.pay_date).format('D-M-Y') }}</td>
                  <td>
                    <v-chip :class="getColor(item.status)" class="white--text" small>
                      {{ getStatus(item.status) }}
                    </v-chip>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </div>
        </div>

        <div class="text-center">
          <v-btn v-if="bill_detail.status == 'unpaid' || 'installment'"
            class="white--text text-capitalize" :class="`${$config.mainColor}`" small depressed @click="handleUnpaid(bill_detail)">
            <div>
              Bayar Tagihan Sekarang
            </div>
          </v-btn>
        </div>

      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: ['bill_detail', 'visible', 'bill_installments'],
  computed: {
    show: {
      get() {
        return this.visible
      },
      set(value) {
        if (!value) {
          this.$emit('close')
        }
      }
    }
  },
  methods: {
    ...mapMutations("bill", [
      "set_bill_id",
      "set_bill_type",
      "set_bill_status",
      "set_bill_student_id",
      "set_bill_trx_id",
      "set_transfer_amount",
      "set_transfer_notes"]),

    getColor(status) {
      return status == 'confirmed' ? 'bg-green'
        : status == 'unpaid' ? 'bg-peach'
          : status == 'installment' ? 'bg-blue'
            : 'bg-orange'
    },

    getStatus(status) {
      if (status == 'paid') return 'Diproses'
      else if (status == 'unpaid') return 'Belum Dibayar'
      else if (status == 'pending') return 'Menunggu Konfirmasi'
      else if (status == 'confirmed') return 'Sudah Dibayar'
      else if (status == 'installment') return 'Sedang Diangsur'
    },

    handleUnpaid(item) {
      // const bill_data = this.$cookies.get('bill_data');
      this.set_bill_trx_id(item.id)
      this.set_bill_student_id(item.student_id)
      if (!item.bill.is_installment) {
        this.set_transfer_amount(item.bill.amount)
        this.set_transfer_notes(item.bill.notes)
        this.$router.push('/bill/payment_method');
      } else {
        if (item.installment_status == 'pending') {
          this.$router.push('/bill/confirmation');
        } else if (item.installment_status == 'paid') {
          this.$router.push('/bill/pending');
        } else {
          this.$router.push('/bill/transfer')
        }
      }
    },
  }

}
</script>

<style>

</style>
