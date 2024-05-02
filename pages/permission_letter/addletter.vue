<template>
  <v-container class="pt-0 px-0" fluid>
    <TitleCard page-title="Surat Izin" />
    <v-container>
      <v-row>
        <v-col cols="12">
          <MainCard class="ma-2 mt-5">
            <template v-slot:cardTitle>Surat Izin</template>
            <template v-slot:cardContent>
              <v-row class="col-style mt-3 justify-center" cols="12">
                <v-col v-if="$vuetify.breakpoint.smAndDown" cols="12">
                  <!-- Nama Murid -->
                  <v-container>
                    <v-col class="">
                      <label>Nama Murid</label>
                      <br />
                      <input
                        type="text"
                        :value="child_detail.name"
                        class="input-style mt-1"
                        disabled
                      />
                    </v-col>
                  </v-container>
                  <!-- Kelas -->
                  <v-container>
                    <v-col class="">
                      <label>Kelas</label>
                      <br />
                      <input
                        type="text"
                        :value="child_class ? child_class.name : ''"
                        class="input-style mt-1"
                        disabled
                      />
                    </v-col>
                  </v-container>
                  <!-- Alasan Tidak Hadir -->
                  <v-container>
                    <v-col class="">
                      <label>Alasan Tidak Hadir</label>
                      <v-radio-group
                        v-model="permission_credentials.status"
                        row
                        mandatory
                        required
                      >
                        <v-radio label="Sakit" value="sick"></v-radio>
                        <v-radio label="Izin" value="permit"></v-radio>
                      </v-radio-group>
                    </v-col>
                  </v-container>
                  <!-- Tanggal Mulai -->
                  <v-container>
                    <v-col class="m">
                      <label>Tanggal Mulai</label>
                      <br />
                      <input
                        type="date"
                        v-model="permission_credentials.start_date"
                        class="input-style-date mt-1"
                        required
                      />
                    </v-col>
                  </v-container>
                  <!-- Tanggal Selesai -->
                  <v-container>
                    <v-col class="">
                      <label>Tanggal Selesai</label>
                      <br />
                      <input
                        type="date"
                        v-model="permission_credentials.end_date"
                        class="input-style-date mt-1"
                        required
                      />
                    </v-col>
                  </v-container>
                  <!-- Lampirkan dokumen pendukung -->
                  <v-container>
                    <v-col class="">
                      <label>Lampirkan dokumen pendukung</label>
                      <br />
                      <input
                        type="file"
                        class="input-style-file mt-1"
                        @change="onFileChange"
                        required
                      />
                    </v-col>
                  </v-container>
                  <!-- Catatan -->
                  <v-container>
                    <v-col class="">
                      <label>Catatan</label>
                      <br />
                      <textarea
                        class="textarea-style mt-1"
                        v-model="permission_credentials.notes"
                        rows="5"
                        cols="50"
                      ></textarea>
                    </v-col>
                  </v-container>
                </v-col>

                <!-- mobile -->
                <v-row v-else>
                  <v-col cols="6">
                    <v-container>
                      <v-col class="mt-2">
                        <label>Nama Murid</label>
                        <br />
                        <input
                          type="text"
                          :value="child_detail.name"
                          class="input-style mt-2"
                          disabled
                        />
                      </v-col>
                      <v-col class="mt-2">
                        <label>Kelas</label>
                        <br />
                        <input
                          type="text"
                          :value="child_class ? child_class.name : ''"
                          class="input-style mt-2"
                          disabled
                        />
                      </v-col>
                      <v-col class="mt-2">
                        <label>Alasan Tidak Hadir</label>
                        <v-radio-group
                          v-model="permission_credentials.status"
                          row
                          mandatory
                          required
                        >
                          <v-radio label="Sakit" value="sick"></v-radio>
                          <v-radio label="Izin" value="permit"></v-radio>
                        </v-radio-group>
                      </v-col>

                      <v-col class="mt-2">
                        <label>Catatan</label>
                        <br />
                        <textarea
                          class="textarea-style mt-2"
                          v-model="permission_credentials.notes"
                          rows="5"
                          cols="50"
                        ></textarea>
                      </v-col>
                    </v-container>
                  </v-col>
                  <v-col cols="6">
                    <v-container>
                      <v-col class="mt-2">
                        <label>Tanggal Mulai</label>
                        <br />
                        <input
                          type="date"
                          v-model="permission_credentials.start_date"
                          class="input-style-date mt-1"
                          required
                        />
                      </v-col>
                      <v-col class="mt-2">
                        <label>Tanggal Selesai</label>
                        <br />
                        <input
                          type="date"
                          v-model="permission_credentials.end_date"
                          class="input-style-date mt-1"
                          required
                        />
                      </v-col>

                      <v-col class="mt-1">
                        <label>Lampirkan dokumen pendukung</label>
                        <br />
                        <input
                          type="file"
                          class="input-style-file mt-1"
                          @change="onFileChange"
                          required
                        />
                      </v-col>
                    </v-container>
                  </v-col>
                </v-row>
                <!-- {{ permission_credentials.notes }} -->
                <button
                  :class="`${$config.mainColor}`"
                  class="white--text button-style"
                  @click="createPermission"
                >
                  Ajukan Surat Izin
                </button>
              </v-row>
            </template>
          </MainCard>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import MainCard from "~/components/dashboard/MainCard.vue";
import TitleCard from "~/components/TitleCard.vue";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  head() {
    return {
      title: (this.school.name ?? "Wali Murid") + " - Surat Izin",
    };
  },
  data() {
    return {
      permission_credentials: {
        student_id: "",
        status: "",
        evidence: "",
        notes: "",
        start_date: "",
        end_date: "",
      },
    };
  },
  components: {
    MainCard,
    TitleCard,
  },
  methods: {
    ...mapActions("permission_letter", ["postPermissionLetter"]),
    ...mapMutations("permission_letter", ["set_student_id"]),

    onFileChange(e) {
      const file = e.target.files[0];
      this.permission_credentials.evidence = file;
    },

    createPermission() {
      this.postPermissionLetter(this.permission_credentials);
      this.$router.push("/permission_letter");
    },
  },
  created() {
    this.permission_credentials.student_id = this.child_id;
  },
  computed: {
    ...mapState(["child_id", "child_detail", "child_class"]),
    ...mapState(["school"]),
  },
  watch: {
    "$store.state.child_id": function () {
      this.permission_credentials.student_id = this.child_id;
    },
  },
};
</script>
<style>
.button-style {
  margin: 20px;
  min-width: 400px;
  min-height: 50px;
  border-radius: 10px;
}
.textarea-style {
  padding: 10px;
  width: 100%;
  min-height: 50px;
  border: 1px solid #526789;
  border-radius: 5px;
  resize: none;
  max-height: 200px;
}

.input-style {
  padding: 10px;
  width: 100%;
  min-height: 40px;
  background-color: #e7e7e7;
  border: 1px solid #526789;
  border-radius: 5px;
}
.input-style-date {
  padding: 10px;
  width: 100%;
  border: 1px solid #526789;
  border-radius: 5px;
}

.input-style-file {
  padding: 10px;
  width: 100%;
  min-height: 40px;
  border: 1px solid #526789;
  border-radius: 5px;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  opacity: 0;
}

.input-style,
.input-style-date,
.input-style-file,
.textarea-style {
  margin-bottom: 10px;
}

.v-application--is-ltr
  .v-data-table
  > .v-data-table__wrapper
  > table
  > thead
  > tr
  > th {
  color: black;
  font-size: 14px;
}
</style>
