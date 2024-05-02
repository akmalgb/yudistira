<template>
  <v-app>
    <v-navigation-drawer
      class="rounded-r-xl"
      v-model="drawer"
      :clipped="clipped"
      fixed
      app
    >
      <div class="logo py-4 d-flex justify-center">
        <v-img
          :src="school.photo"
          max-height="120px"
          max-width="120px"
          contain
        ></v-img>
      </div>
      <div class="text-center mb-4">
        <h3 class="text-secondary text-uppercase">{{ school.name }}</h3>
      </div>
      <v-list>
        <v-list-item-group class="ml-5">
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router>
            <v-list-item-action class="mr-3">
              <v-card
                class="rounded-lg d-flex justify-center align-center"
                height="32px"
                width="32px"
                append
              >
                <v-icon size="20">{{ item.icon }}</v-icon>
              </v-card>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title
                class="font-weight-regular"
                v-text="item.title"
              />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :class="`${$config.mainColor}`"
      flat
      dark
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <!-- <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn> -->

      <v-spacer></v-spacer>

      <v-btn
        color="white"
        class="black--text mr-4"
        depressed
        @click="openDialog"
      >
        <div class="font-weight-medium">Pilih Anak</div>
      </v-btn>
      <div style="border-left: 2px solid #ffffff; height: 35px"></div>
      <div
        class="text-subtitle font-weight-regular mx-4 overflow-x-hidden"
        style="max-height: 35px; white-space: nowrap"
      >
        Hi, {{ child_detail.name }}!
      </div>
      <v-menu bottom rounded offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on">
            <v-avatar>
              <img
                v-if="child_detail.photo"
                v-bind:src="child_detail.photo"
                alt="pp"
              />
              <v-icon v-else>mdi-account-circle</v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <v-card class="py-1 px-3">
          <div class="text-center">
            <v-btn
              text
              class="text-capitalize"
              style="color: gray"
              @click="$router.push('/profile')"
            >
              <v-icon>mdi-account</v-icon>
              Profile
            </v-btn>
          </div>
          <div class="text-center">
            <v-btn
              text
              class="text-capitalize"
              style="color: gray"
              @click="_handleLogoutClick"
            >
              <v-icon>mdi-key</v-icon>
              Log Out
            </v-btn>
          </div>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-dialog v-model="childDialog" max-width="450px">
      <v-card>
        <v-card-title> Pilih Anak </v-card-title>
        <v-container>
          <v-radio-group
            class="my-0"
            column
            v-model="selectedChild"
            @change="childDialog = false"
          >
            <v-radio
              v-for="child in childs"
              :key="child.id"
              :label="child.name"
              :value="child.id"
            ></v-radio>
          </v-radio-group>
        </v-container>
      </v-card>
    </v-dialog>

    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import auth from "~/middleware/auth";

export default {
  middleware: auth,
  name: "DefaultLayout",
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: "mdi-home-variant",
          title: "Beranda",
          to: "/",
        },
        {
          icon: "mdi-volume-high",
          title: "Pengumuman",
          to: "/announcement",
        },
        {
          icon: "mdi-clock",
          title: "Kehadiran",
          to: "/presence",
        },
        {
          icon: "mdi-book-open-page-variant",
          title: "Edutainment",
          to: "/edutainment",
        },
        {
          icon: "mdi-file-document",
          title: "Surat Izin",
          to: "/permission_letter",
        },
        {
          icon: "mdi-calendar-month",
          title: "Jadwal Pelajaran",
          to: "/schedule",
        },
        {
          icon: "mdi-chart-line-stacked",
          title: "Performa Murid",
          to: "/performance",
        },
        {
          icon: "mdi-chat-processing",
          title: "Chat",
          to: "/chat",
        },
        {
          icon: "mdi-wallet",
          title: "Keuangan",
          to: "/emoney",
        },
        {
          icon: "mdi-bookmark-minus",
          title: "Tagihan",
          to: "/bill",
        },
        {
          icon: "mdi-chart-box",
          title: "Rapor Murid",
          to: "/report",
        },
        {
          icon: "mdi-book-open-blank-variant",
          title: "Tahfidz",
          to: "/tahfidz",
        },
        {
          icon: "mdi mdi-map-marker",
          title: "Digital Pick Up",
          to: "/digital_pickup",
        },
        {
          icon: "mdi mdi-printer",
          title: "Cetak Kartu Ujian",
          to: "/print_exam_qr",
        },
      ],
      miniVariant: false,
      right: false,
      rightDrawer: false,
      childDialog: false,
    };
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    ...mapActions("report", ["getReports"]),
    ...mapActions(["getListChild", "getChildDetail", "getChildClass"]),

    ...mapMutations(["set_child_id"]),

    _handleLogoutClick() {
      this.logout();
      this.$router.push("/login");
      window.location.reload();
    },

    openDialog() {
      this.childDialog = true;
    },
  },

  created() {
    this.getListChild();
    setTimeout(() => {
      this.getChildDetail();
    }, 1500);
  },

  computed: {
    message() {
      return process.env.SIDIGS_PARENT_MAIN_COLOR;
    },
    ...mapState("auth", ["token"]),
    ...mapState(["childs", "child_id", "child_detail", "school"]),

    selectedChild: {
      get() {
        return this.child_id;
      },
      set(payload) {
        return this.set_child_id(payload);
      },
    },
  },
  watch: {
    "$store.state.child_id": function () {
      this.getChildDetail();
    },
  },
};
</script>
