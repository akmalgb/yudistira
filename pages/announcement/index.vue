<template>
  <v-container class="pt-0 px-0" fluid>
    <TitleCard page-title="Pengumuman" />
    <v-container>
      <MainCard class="ma-2">
        <template v-slot:cardIcon>
          <img src="/mainCardIcon/announcement.svg" alt="" />
        </template>
        <template v-slot:cardTitle>Pengumuman Terbaru</template>
        <template v-slot:cardContent>
          <v-container class="d-flex justify-center">
            <span
              class="text-secondary text-h6"
              v-if="announcements.length === 0"
              >Tidak ada Info Sekolah</span
            >
            <div v-else>
              <v-carousel
                style="width: 720px"
                v-model="model"
                cycle
                :show-arrows="false"
              >
                <v-carousel-item
                  v-for="(announcement, i) in announcements"
                  :key="i"
                  :src="announcement.photo"
                >
                </v-carousel-item>
              </v-carousel>

              <v-row class="my-5" justify="space-around">
                <v-btn
                  text
                  fab
                  small
                  outlined
                  style="color: #009ade"
                  class="mr-1 blue-outline"
                  @click="model--"
                >
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                {{ model }}
                <v-btn
                  text
                  fab
                  small
                  outlined
                  style="color: #009ade"
                  class="mr-1 blue-outline"
                  @click="model++"
                >
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </v-row>
            </div>
          </v-container>
        </template>
      </MainCard>

      <MainCard class="ma-2 mt-5">
        <template v-slot:cardIcon>
          <img src="/mainCardIcon/announcement.svg" alt="" />
        </template>
        <template v-slot:cardTitle>Daftar Pengumuman</template>
        <template v-slot:cardContent>
          <v-container>
            <v-data-iterator
              :items="announcements"
              :items-per-page.sync="itemsPerPage"
              :page="page"
              :search="search"
              hide-default-footer
            >
              <template v-slot:header>
                <v-toolbar flat>
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
                          <v-list-item-title>{{ number }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                    <span class="text-secondary ml-2">Entries</span>
                  </div>
                  <v-spacer></v-spacer>
                  <v-text-field
                    class="ml-auto rounded-lg"
                    style="max-width: 300px"
                    v-model="search"
                    outlined
                    single-line
                    hide-details
                    dense
                  >
                    <template v-slot:prepend>
                      <label class="font-weight-regular" for="">Search</label>
                    </template>
                  </v-text-field>
                </v-toolbar>
              </template>

              <template v-slot:default="props">
                <v-simple-table>
                  <thead>
                    <tr>
                      <th class="text-left">Judul Pengumuman</th>
                      <th class="text-left">Deskripsi</th>
                      <th class="text-left">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in props.items"
                      :key="item.name"
                      :id="item.id"
                    >
                      <td>{{ item.title }}</td>
                      <td>{{ item.description }}</td>
                      <td>
                        <v-btn
                          :class="`${$config.mainColor}`"
                          class="white--text text-capitalize"
                          small
                          text
                          :to="'announcement/' + item.id"
                        >
                          <div class="font-weight-regular">Lihat Detail</div>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </template>
              <template v-slot:footer="">
                <v-toolbar flat>
                  <v-row align="center" justify="center">
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
  </v-container>
</template>

<script>
import TitleCard from "~/components/TitleCard.vue";
import MainCard from "~/components/dashboard/MainCard.vue";
import { mapActions, mapState } from "vuex";
export default {
  head() {
    return {
      title: (this.school.name ?? "Wali Murid") + " - Pengumuman",
    };
  },
  components: { TitleCard, MainCard },
  data() {
    return {
      itemsPerPageArray: [5, 10, 15],
      itemsPerPage: 5,
      search: "",
      page: 1,

      model: 0,
    };
  },

  computed: {
    ...mapState(["school"]),
    ...mapState("announcement", ["announcements", "next_page"]),
    // numberOfPages() {
    //   return Math.ceil(this.announcements.length / this.itemsPerPage);
    // },
  },

  methods: {
    ...mapActions("announcement", [
      "getListAnnouncement",
      "getAnnouncementDetail",
    ]),
    nextPage() {
      if (this.next_page != null) {
        this.page += 1;
        this.getListAnnouncement(this.page);
      }
    },
    formerPage() {
      if (this.page - 1 >= 1) {
        this.page -= 1;
        this.getListAnnouncement(this.page);
      }
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    getDetail(item) {
      this.$store.commit("announcement/set_announcement_id", item.id);
      this.$router.push("/announcement/detail");
    },
  },

  created() {
    this.getListAnnouncement();
  },
};
</script>

<style></style>
